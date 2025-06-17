/**
 * Arquivo: EmpregadoDomesticoFormTypes.ts
 * Caminho: src/components/forms/empregado-domestico/EmpregadoDomesticoFormTypes.ts
 * Criado em: 2025-06-13
 * Última atualização: 2025-06-13
 * Descrição: Tipos e schema de validação para o formulário de empregado doméstico.
 */

import { z } from 'zod';

export const empregadoDomesticoFormSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  cpf: z.string().min(11, 'CPF inválido'),
  dataNascimento: z.date({
    required_error: 'Data de nascimento é obrigatória'
  }),
  dataInicio: z.date({
    required_error: 'Data de início é obrigatória'
  }),
  dataFim: z.date().optional(),
  endereco: z.object({
    cep: z.string().min(8, 'CEP inválido'),
    logradouro: z.string().min(1, 'Logradouro é obrigatório'),
    numero: z.string().min(1, 'Número é obrigatório'),
    complemento: z.string().optional(),
    bairro: z.string().min(1, 'Bairro é obrigatório'),
    cidade: z.string().min(1, 'Cidade é obrigatória'),
    estado: z.string().min(2, 'Estado é obrigatório')
  }),
  salario: z.number().min(0, 'Salário deve ser maior que zero'),
  cargaHoraria: z.number().min(0, 'Carga horária deve ser maior que zero'),
  funcao: z.string().min(1, 'Função é obrigatória'),
  observacoes: z.string().optional()
});

export type EmpregadoDomesticoFormData = z.infer<typeof empregadoDomesticoFormSchema>;

export interface EmpregadoDomesticoFormProps {
  initialValues?: Partial<EmpregadoDomesticoFormData>;
  onSubmit?: (data: EmpregadoDomesticoFormData) => void;
  onCancel?: () => void;
  loading?: boolean;
} 