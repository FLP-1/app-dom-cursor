/**
 * Arquivo: EmpregadoFormTypes.ts
 * Caminho: src/components/forms/empregado/EmpregadoFormTypes.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Tipos e interfaces para o formulário de cadastro de empregado.
 */
import * as z from 'zod';

export const empregadoFormSchema = z.object({
  nome: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  cpf: z.string().length(11, 'CPF deve ter 11 dígitos'),
  dataNascimento: z.string().min(1, 'Data de nascimento é obrigatória'),
  cargo: z.string().min(1, 'Cargo é obrigatório'),
  salario: z.string().min(1, 'Salário é obrigatório'),
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

export type EmpregadoFormData = z.infer<typeof empregadoFormSchema>;

export interface EmpregadoFormProps {
  initialData?: Partial<EmpregadoFormData>;
  onSubmit: (data: EmpregadoFormData) => void;
} 
