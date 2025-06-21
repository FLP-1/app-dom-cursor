/**
 * Arquivo: EmpregadoFormSchema.ts
 * Caminho: src/components/forms/empregado/EmpregadoFormSchema.ts
 * Criado em: 2025-06-07
 * Última atualização: 2025-06-07
 * Descrição: Schema de validação zod para o formulário de cadastro de empregado.
 */

import { z } from 'zod';

export const empregadoFormSchema = z.object({
  nome: z.string().min(3, 'Nome obrigatório'),
  cpf: z.string().min(11, 'CPF obrigatório'),
  dataNascimento: z.string().min(8, 'Data de nascimento obrigatória'),
  cargo: z.string().min(2, 'Cargo obrigatório'),
  salario: z.string().min(1, 'Salário obrigatório'),
  email: z.string().email('E-mail inválido'),
  telefone: z.string().min(8, 'Telefone obrigatório'),
  cep: z.string().min(8, 'CEP obrigatório'),
  endereco: z.string().min(3, 'Endereço obrigatório'),
  numero: z.string().min(1, 'Número obrigatório'),
  complemento: z.string().optional(),
  bairro: z.string().min(2, 'Bairro obrigatório'),
  cidade: z.string().min(2, 'Cidade obrigatória'),
  estado: z.string().min(2, 'Estado obrigatório'),
}); 
