/**
 * Arquivo: EmpregadorFormTypes.ts
 * Caminho: src/components/forms/empregador/EmpregadorFormTypes.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Tipos e interfaces para o formulário de cadastro de empregador.
 */
import * as z from 'zod';

export const empregadorFormSchema = z.object({
  nome: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  cnpj: z.string().length(14, 'CNPJ deve ter 14 dígitos'),
  email: z.string().email('E-mail inválido').optional(),
  telefone: z.string().min(10, 'Telefone deve ter no mínimo 10 dígitos').optional(),
  endereco: z.object({
    cep: z.string().length(8, 'CEP deve ter 8 dígitos'),
    logradouro: z.string().min(1, 'Logradouro é obrigatório'),
    numero: z.string().min(1, 'Número é obrigatório'),
    complemento: z.string().optional(),
    bairro: z.string().min(1, 'Bairro é obrigatório'),
    cidade: z.string().min(1, 'Cidade é obrigatória'),
    uf: z.string().length(2, 'UF deve ter 2 caracteres')
  })
});

export type EmpregadorFormData = z.infer<typeof empregadorFormSchema>;

export interface EmpregadorFormProps {
  initialData?: Partial<EmpregadorFormData>;
  onSubmit: (data: EmpregadorFormData) => void;
} 
