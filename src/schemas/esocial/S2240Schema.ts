/**
 * Arquivo: S2240Schema.ts
 * Caminho: src/schemas/esocial/S2240Schema.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Schema para o evento S-2240
 */

import { z } from 'zod';

export const S2240Schema = z.object({
  payload: z.object({
    cpf: z.string()
      .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF deve estar no formato 000.000.000-00')
      .min(14, 'CPF deve ter 14 caracteres')
      .max(14, 'CPF deve ter 14 caracteres'),
    
    dataInicioCondicao: z.date()
      .refine((date) => date <= new Date(), {
        message: 'Data de início da condição não pode ser futura'
      }),
    
    dataFimCondicao: z.date()
      .refine((date) => date <= new Date(), {
        message: 'Data de fim da condição não pode ser futura'
      })
      .refine((date, ctx) => {
        const dataInicio = ctx.parent.dataInicioCondicao;
        return date >= dataInicio;
      }, {
        message: 'Data de fim da condição deve ser maior ou igual à data de início'
      }),
    
    tipoCondicao: z.string()
      .min(1, 'Tipo de condição é obrigatório'),
    
    codigoCondicao: z.string()
      .min(1, 'Código da condição é obrigatório'),
    
    localCondicao: z.object({
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
    
    agenteRisco: z.array(z.object({
      codigo: z.string()
        .min(1, 'Código do agente de risco é obrigatório'),
      descricao: z.string()
        .min(1, 'Descrição do agente de risco é obrigatória')
        .max(200, 'Descrição do agente de risco deve ter no máximo 200 caracteres'),
      intensidade: z.string()
        .min(1, 'Intensidade é obrigatória'),
      unidade: z.string()
        .min(1, 'Unidade é obrigatória'),
      tecnicaUtilizada: z.string()
        .min(1, 'Técnica utilizada é obrigatória')
        .max(100, 'Técnica utilizada deve ter no máximo 100 caracteres'),
      dataMedicao: z.date()
        .refine((date) => date <= new Date(), {
          message: 'Data da medição não pode ser futura'
        })
    })).min(1, 'Pelo menos um agente de risco deve ser informado'),
    
    epi: z.array(z.object({
      codigo: z.string()
        .min(1, 'Código do EPI é obrigatório'),
      descricao: z.string()
        .min(1, 'Descrição do EPI é obrigatória')
        .max(200, 'Descrição do EPI deve ter no máximo 200 caracteres'),
      ca: z.string()
        .min(1, 'CA é obrigatório')
        .max(20, 'CA deve ter no máximo 20 caracteres'),
      dataValidade: z.date()
        .refine((date) => date >= new Date(), {
          message: 'Data de validade deve ser futura'
        })
    })).optional(),
    
    observacao: z.string()
      .max(1000, 'Observação deve ter no máximo 1000 caracteres')
      .optional()
  })
}); 
