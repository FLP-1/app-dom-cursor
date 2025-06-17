/**
 * Arquivo: useEmpregadorForm.ts
 * Caminho: src/hooks/useEmpregadorForm.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { api } from '@/services/api';
import { consultarCPF, DadosCPF } from '@/services/receitaFederal';
import { validarEmail, validarTelefone, ValidacaoResponse } from '@/services/validacao';
import { useState } from 'react';

interface EmpregadorFormData {
  // Dados Básicos (somente leitura)
  cpf: string;
  nomeCompleto: string;
  dataNascimento: Date;
  sexo: 'M' | 'F';

  // Dados Complementares
  tipoEmpregador: '1' | '22'; // 1 = Empregador Doméstico, 22 = Segurado Especial
  caepf?: string;
  telefone?: string;
  email?: string;

  // Dados para Marketing/SEO
  aceitaComunicacoes: boolean;
  aceitaTermos: boolean;
}

interface ValidacaoCampos {
  email?: ValidacaoResponse;
  telefone?: ValidacaoResponse;
}

const schema = yup.object().shape({
  // Dados Básicos
  cpf: yup.string()
    .required('CPF é obrigatório')
    .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF inválido'),
  nomeCompleto: yup.string().required('Nome completo é obrigatório'),
  dataNascimento: yup.date().required('Data de nascimento é obrigatória'),
  sexo: yup.string().oneOf(['M', 'F']).required('Sexo é obrigatório'),

  // Dados Complementares
  tipoEmpregador: yup.string().oneOf(['1', '22']).required('Tipo de empregador é obrigatório'),
  caepf: yup.string().when('tipoEmpregador', {
    is: '22',
    then: (schema) => schema
      .required('CAEPF é obrigatório para Segurado Especial')
      .matches(/^\d{14}$/, 'CAEPF deve conter 14 dígitos'),
    otherwise: (schema) => schema.notRequired(),
  }),
  telefone: yup.string()
    .matches(/^\(\d{2}\) \d{5}-\d{4}$/, 'Telefone inválido'),
  email: yup.string()
    .email('Email inválido')
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Email inválido'),

  // Dados para Marketing/SEO
  aceitaComunicacoes: yup.boolean(),
  aceitaTermos: yup.boolean().oneOf([true], 'Você precisa aceitar os termos'),
});

export function useEmpregadorForm() {
  const [dadosCPF, setDadosCPF] = useState<DadosCPF | null>(null);
  const [previewESocial, setPreviewESocial] = useState<Record<string, unknown> | null>(null);
  const [validacaoCampos, setValidacaoCampos] = useState<ValidacaoCampos>({});

  const form = useForm<EmpregadorFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      tipoEmpregador: '1',
      aceitaComunicacoes: false,
      aceitaTermos: false,
    },
  });

  const consultarDadosCPF = async (cpf: string) => {
    try {
      const dados = await consultarCPF(cpf);
      setDadosCPF(dados);
      
      // Preencher formulário com dados do CPF
      form.setValue('nomeCompleto', dados.nome);
      form.setValue('dataNascimento', new Date(dados.dataNascimento));
      form.setValue('sexo', dados.sexo);
    } catch (error) {
      console.error('Erro ao consultar CPF:', error);
      throw error;
    }
  };

  const validarCampoEmail = async (email: string) => {
    try {
      const resultado = await validarEmail(email);
      setValidacaoCampos(prev => ({
        ...prev,
        email: resultado
      }));
      return resultado;
    } catch (error) {
      console.error('Erro ao validar email:', error);
      throw error;
    }
  };

  const validarCampoTelefone = async (telefone: string) => {
    try {
      const resultado = await validarTelefone(telefone);
      setValidacaoCampos(prev => ({
        ...prev,
        telefone: resultado
      }));
      return resultado;
    } catch (error) {
      console.error('Erro ao validar telefone:', error);
      throw error;
    }
  };

  const gerarPreviewESocial = (data: EmpregadorFormData) => {
    // Mapear dados para o formato do evento S-1000 do eSocial
    const preview = {
      ideEmpregador: {
        tpInsc: 1, // 1 = CPF
        nrInsc: data.cpf.replace(/\D/g, ''),
        tpInscEstab: 1,
        nrInscEstab: data.cpf.replace(/\D/g, ''),
      },
      dadosEmpregador: {
        cpf: data.cpf.replace(/\D/g, ''),
        nome: data.nomeCompleto,
        dataNascimento: data.dataNascimento.toISOString().split('T')[0],
        sexo: data.sexo,
        tipoEmpregador: data.tipoEmpregador,
        caepf: data.caepf,
        telefone: data.telefone?.replace(/\D/g, ''),
        email: data.email,
      },
    };

    setPreviewESocial(preview);
    return preview;
  };

  const onSubmit = async (data: EmpregadorFormData) => {
    try {
      // Verificar se os campos foram validados
      if (data.email && !validacaoCampos.email?.validado) {
        throw new Error('Email precisa ser validado');
      }
      if (data.telefone && !validacaoCampos.telefone?.validado) {
        throw new Error('Telefone precisa ser validado');
      }

      // Gerar preview do eSocial
      const preview = gerarPreviewESocial(data);
      
      // Enviar para a API
      await api.post('/empregadores', {
        ...data,
        esocialPreview: preview,
        validacaoCampos,
      });
    } catch (error) {
      console.error('Erro ao cadastrar empregador:', error);
      throw error;
    }
  };

  return {
    form,
    onSubmit,
    consultarDadosCPF,
    dadosCPF,
    previewESocial,
    validarCampoEmail,
    validarCampoTelefone,
    validacaoCampos,
  };
} 
