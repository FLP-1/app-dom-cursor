/**
 * Arquivo: S2205Schema.ts
 * Caminho: src/schemas/esocial/S2205Schema.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Schema para o evento S-2205
 */

import { z } from 'zod';

export const S2205Schema = z.object({
  cpf: z
    .string()
    .min(11, 'CPF deve ter 11 dígitos')
    .max(14, 'CPF deve ter no máximo 14 caracteres')
    .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF deve estar no formato 000.000.000-00'),
  nome: z
    .string()
    .min(3, 'Nome deve ter no mínimo 3 caracteres')
    .max(100, 'Nome deve ter no máximo 100 caracteres'),
  dataNascimento: z.date()
    .max(new Date(), 'Data de nascimento não pode ser futura'),
  categoriaTrabalhador: z.string()
    .min(1, 'Categoria do trabalhador é obrigatória'),
  pis: z
    .string()
    .regex(/^\d{3}\.\d{5}\.\d{2}-\d{1}$/, 'PIS deve estar no formato 000.00000.00-0'),
  carteiraTrabalho: z
    .string()
    .min(1, 'Carteira de trabalho é obrigatória')
    .max(20, 'Carteira de trabalho deve ter no máximo 20 caracteres'),
  serieCarteiraTrabalho: z
    .string()
    .min(1, 'Série da carteira de trabalho é obrigatória')
    .max(10, 'Série da carteira de trabalho deve ter no máximo 10 caracteres'),
  ufCarteiraTrabalho: z
    .string()
    .min(1, 'UF da carteira de trabalho é obrigatória'),
  tipoInscricao: z.string()
    .min(1, 'Tipo de inscrição é obrigatório'),
  cargo: z
    .string()
    .min(1, 'Cargo é obrigatório')
    .max(100, 'Cargo deve ter no máximo 100 caracteres'),
  salario: z.number()
    .min(0, 'Salário não pode ser negativo')
    .max(999999.99, 'Salário deve ser menor que 1.000.000,00'),
  dataAlteracao: z.date()
    .max(new Date(), 'Data de alteração não pode ser futura'),
  motivoAlteracao: z.string()
    .min(1, 'Motivo da alteração é obrigatório')
    .max(200, 'Motivo da alteração deve ter no máximo 200 caracteres'),
  alteracoes: z.array(z.object({
    campo: z.string(),
    valorAntigo: z.string(),
    valorNovo: z.string()
  }))
  .min(1, 'Pelo menos uma alteração deve ser informada'),
}); 
