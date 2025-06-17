/**
 * Arquivo: useEmpregadoForm.ts
 * Caminho: src/hooks/forms/useEmpregadoForm.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Hook customizado para lógica, validação e submit do formulário de empregado, com validações de CPF, PIS, CEP, telefone e integração com API.
 */

import { useForm, SubmitHandler, Control } from 'react-hook-form';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Empregado } from '@/types/empregado';
import { empregadoService } from '@/services/empregado.service';
import { useTranslation } from 'react-i18next';
import { empregadoMessages } from '@/i18n/messages';

// Funções auxiliares de validação
const validarCPF = (cpf: string) => {
  cpf = cpf.replace(/[^\d]/g, '');
  if (cpf.length !== 11) return false;
  
  // Validação do primeiro dígito verificador
  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += Number(cpf.charAt(i)) * (10 - i);
  }
  const resto = 11 - (soma % 11);
  const digitoVerificador1 = resto > 9 ? 0 : resto;
  if (digitoVerificador1 !== Number(cpf.charAt(9))) return false;

  // Validação do segundo dígito verificador
  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += Number(cpf.charAt(i)) * (11 - i);
  }
  const digitoVerificador2 = resto > 9 ? 0 : resto;
  if (digitoVerificador2 !== Number(cpf.charAt(10))) return false;

  return true;
};

const validarCEP = (cep: string) => {
  cep = cep.replace(/[^\d]/g, '');
  return cep.length === 8;
};

const validarPIS = (pis: string) => {
  pis = pis.replace(/[^\d]/g, '');
  if (pis.length !== 11) return false;

  // Validação do dígito verificador do PIS
  const multiplicadores = [3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  let soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += Number(pis.charAt(i)) * multiplicadores[i];
  }
  const resto = 11 - (soma % 11);
  const digitoVerificador = resto > 9 ? 0 : resto;
  return digitoVerificador === Number(pis.charAt(10));
};

const validarTelefone = (telefone: string) => {
  telefone = telefone.replace(/[^\d]/g, '');
  return telefone.length === 11;
};

const validarUF = (uf: string) => {
  const ufs = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];
  return ufs.includes(uf.toUpperCase());
};

export interface EmpregadoFormValues extends Omit<Empregado, 'id' | 'createdAt' | 'updatedAt' | 'user' | 'alertas' | 'compras' | 'documentos' | 'cargo'> {
  cargoId: string;
}

export function useEmpregadoForm(initialValues?: Partial<EmpregadoFormValues>) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as 'pt' | 'en';
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const schema = yup.object().shape({
    cpf: yup.string()
      .required(t(empregadoMessages[lang].required))
      .test('cpf', t(empregadoMessages[lang].invalidCPF), validarCPF),
    nomeCompleto: yup.string()
      .required(t(empregadoMessages[lang].required))
      .min(3, t('Nome deve ter no mínimo 3 caracteres')),
    dataNascimento: yup.date()
      .required(t(empregadoMessages[lang].required))
      .max(new Date(), t(empregadoMessages[lang].dateInFuture)),
    sexo: yup.string()
      .required(t(empregadoMessages[lang].required))
      .oneOf(['M', 'F'], t('Sexo inválido')),
    nacionalidade: yup.string()
      .required(t(empregadoMessages[lang].required)),
    grauInstrucao: yup.string()
      .required(t(empregadoMessages[lang].required)),
    nomeMae: yup.string()
      .required(t(empregadoMessages[lang].required)),
    endereco: yup.string()
      .required(t(empregadoMessages[lang].required)),
    numero: yup.string()
      .required(t(empregadoMessages[lang].required)),
    bairro: yup.string()
      .required(t(empregadoMessages[lang].required)),
    cep: yup.string()
      .required(t(empregadoMessages[lang].required))
      .test('cep', t(empregadoMessages[lang].invalidCEP), validarCEP),
    municipio: yup.string()
      .required(t(empregadoMessages[lang].required)),
    uf: yup.string()
      .required(t(empregadoMessages[lang].required))
      .length(2, t(empregadoMessages[lang].invalidUF))
      .test('uf', t('UF inválida'), validarUF),
    telefone: yup.string()
      .required(t(empregadoMessages[lang].required))
      .test('telefone', t('Telefone inválido'), validarTelefone),
    telefoneAlternativo: yup.string()
      .test('telefone', t('Telefone inválido'), (value) => !value || validarTelefone(value)),
    email: yup.string()
      .email(t(empregadoMessages[lang].invalidEmail))
      .required(t(empregadoMessages[lang].required)),
    emailAlternativo: yup.string()
      .email(t(empregadoMessages[lang].invalidEmail)),
    dataAdmissao: yup.date()
      .required(t(empregadoMessages[lang].required))
      .max(new Date(), t(empregadoMessages[lang].dateInFuture)),
    matricula: yup.string()
      .required(t(empregadoMessages[lang].required)),
    categoria: yup.string()
      .required(t(empregadoMessages[lang].required)),
    remuneracao: yup.number()
      .required(t(empregadoMessages[lang].required))
      .min(0, t(empregadoMessages[lang].negativeSalary)),
    cargoId: yup.string()
      .required(t(empregadoMessages[lang].required)),
    jornadaTrabalho: yup.string()
      .required(t(empregadoMessages[lang].required)),
    ctpsNumero: yup.string()
      .required(t(empregadoMessages[lang].required))
      .matches(/^\d+$/, t(empregadoMessages[lang].invalidCTPSNumber)),
    ctpsSerie: yup.string()
      .required(t(empregadoMessages[lang].required))
      .matches(/^\d+$/, t(empregadoMessages[lang].invalidCTPSSeries)),
    ctpsUf: yup.string()
      .required(t(empregadoMessages[lang].required))
      .length(2, t(empregadoMessages[lang].invalidUF))
      .test('uf', t('UF inválida'), validarUF),
    pisPasep: yup.string()
      .required(t(empregadoMessages[lang].required))
      .test('pis', t(empregadoMessages[lang].invalidPIS), validarPIS),
    empregadorId: yup.string()
      .required(t(empregadoMessages[lang].required)),
    dependentes: yup.array().of(
      yup.object().shape({
        nome: yup.string().required(t('Nome é obrigatório')),
        parentesco: yup.string().required(t('Parentesco é obrigatório')),
        dataNascimento: yup.date().required(t('Data de nascimento é obrigatória')),
        cpf: yup.string().test('cpf', t(empregadoMessages[lang].invalidCPF), (value) => !value || validarCPF(value))
      })
    )
  });

  const { control, handleSubmit, reset } = useForm<EmpregadoFormValues>({
    resolver: yupResolver(schema),
    defaultValues: initialValues
  });

  const onSubmit: SubmitHandler<EmpregadoFormValues> = async (data) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      if (initialValues?.id) {
        await empregadoService.update(initialValues.id, data);
        setSuccess(t(empregadoMessages[lang].updateSuccess));
      } else {
        await empregadoService.create(data);
        setSuccess(t(empregadoMessages[lang].createSuccess));
        reset();
      }
    } catch (err) {
      setError(t(empregadoMessages[lang].genericError));
    } finally {
      setLoading(false);
    }
  };

  return {
    control,
    handleSubmit,
    onSubmit,
    loading,
    error,
    success
  };
} 
