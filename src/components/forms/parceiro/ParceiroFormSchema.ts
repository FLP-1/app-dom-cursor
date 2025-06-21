/**
 * Arquivo: ParceiroFormSchema.ts
 * Caminho: src/components/forms/parceiro/ParceiroFormSchema.ts
 * Criado em: 2025-06-07
 * Última atualização: 2025-06-07
 * Descrição: Schema de validação zod para o formulário de cadastro de parceiro.
 */

import { z } from 'zod';

export const parceiroFormSchema = z.object({
  nome: z.string().min(3, 'Nome obrigatório'),
  cnpj: z.string().min(14, 'CNPJ obrigatório'),
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
