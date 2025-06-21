/**
 * Arquivo: FamiliarFormSchema.ts
 * Caminho: src/components/forms/familiar/FamiliarFormSchema.ts
 * Criado em: 2025-06-07
 * Última atualização: 2025-06-07
 * Descrição: Schema de validação Zod para cadastro simplificado de familiar (PF).
 */
import * as z from 'zod';

export const familiarSchema = z.object({
  nome: z.string().min(3, 'Nome obrigatório'),
  apelido: z.string().min(2, 'Nome abreviado obrigatório'),
  parentesco: z.string().min(2, 'Parentesco obrigatório'),
  email: z.string().email('E-mail inválido').optional(),
  celular: z.string().min(10, 'Celular obrigatório').optional(),
  cpf: z.string().length(11, 'CPF inválido').optional(),
}); 
