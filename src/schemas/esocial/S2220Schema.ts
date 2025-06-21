/**
 * Arquivo: S2220Schema.ts
 * Caminho: src/schemas/esocial/S2220Schema.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Schema para o evento S-2220
 */

import { z } from 'zod';

export const S2220Schema = z.object({
  payload: z.object({
    cpf: z.string()
      .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF deve estar no formato 000.000.000-00')
      .min(14, 'CPF deve ter 14 caracteres')
      .max(14, 'CPF deve ter 14 caracteres'),
    
    dataExame: z.date()
      .refine((date) => date <= new Date(), {
        message: 'Data do exame não pode ser futura'
      }),
    
    tipoExame: z.string()
      .min(1, 'Tipo de exame é obrigatório'),
    
    resultadoExame: z.enum(['A', 'I', 'R'], {
      errorMap: () => ({ message: 'Resultado deve ser A (apto), I (inapto) ou R (restrito)' })
    }),
    
    medico: z.object({
      nome: z.string()
        .min(1, 'Nome do médico é obrigatório')
        .max(100, 'Nome do médico deve ter no máximo 100 caracteres'),
      crm: z.string()
        .min(1, 'CRM é obrigatório')
        .max(20, 'CRM deve ter no máximo 20 caracteres'),
      uf: z.string()
        .min(1, 'UF do CRM é obrigatória')
        .max(2, 'UF do CRM deve ter 2 caracteres')
    }),
    
    localExame: z.object({
      tipo: z.string()
        .min(1, 'Tipo de local é obrigatório'),
      nome: z.string()
        .min(1, 'Nome do local é obrigatório')
        .max(100, 'Nome do local deve ter no máximo 100 caracteres'),
      endereco: z.string()
        .min(1, 'Endereço é obrigatório')
        .max(200, 'Endereço deve ter no máximo 200 caracteres'),
      cep: z.string()
        .regex(/^\d{5}-\d{3}$/, 'CEP deve estar no formato 00000-000'),
      municipio: z.string()
        .min(1, 'Município é obrigatório')
        .max(100, 'Município deve ter no máximo 100 caracteres'),
      uf: z.string()
        .min(1, 'UF é obrigatória')
        .max(2, 'UF deve ter 2 caracteres')
    }),
    
    aso: z.object({
      numero: z.string()
        .min(1, 'Número do ASO é obrigatório')
        .max(50, 'Número do ASO deve ter no máximo 50 caracteres'),
      dataEmissao: z.date()
        .refine((date) => date <= new Date(), {
          message: 'Data de emissão não pode ser futura'
        })
    }),
    
    restricoes: z.array(z.object({
      codigo: z.string()
        .min(1, 'Código da restrição é obrigatório'),
      descricao: z.string()
        .min(1, 'Descrição da restrição é obrigatória')
        .max(200, 'Descrição da restrição deve ter no máximo 200 caracteres')
    })).optional(),
    
    observacao: z.string()
      .max(1000, 'Observação deve ter no máximo 1000 caracteres')
      .optional()
  })
}); 
