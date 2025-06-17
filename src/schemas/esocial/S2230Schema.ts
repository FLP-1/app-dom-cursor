/**
 * Arquivo: S2230Schema.ts
 * Caminho: src/schemas/esocial/S2230Schema.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Schema para o evento S-2230
 */

import { z } from 'zod';

export const S2230Schema = z.object({
  payload: z.object({
    cpf: z.string()
      .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF deve estar no formato 000.000.000-00')
      .min(14, 'CPF deve ter 14 caracteres')
      .max(14, 'CPF deve ter 14 caracteres'),
    
    dataInicioAfastamento: z.date()
      .refine((date) => date <= new Date(), {
        message: 'Data de início do afastamento não pode ser futura'
      }),
    
    dataFimAfastamento: z.date()
      .refine((date) => date <= new Date(), {
        message: 'Data de fim do afastamento não pode ser futura'
      })
      .refine((date, ctx) => {
        const dataInicio = ctx.parent.dataInicioAfastamento;
        return date >= dataInicio;
      }, {
        message: 'Data de fim do afastamento deve ser maior ou igual à data de início'
      }),
    
    motivoAfastamento: z.string()
      .min(1, 'Motivo do afastamento é obrigatório'),
    
    codigoMotivoAfastamento: z.string()
      .min(1, 'Código do motivo do afastamento é obrigatório'),
    
    cid: z.object({
      codigo: z.string()
        .min(1, 'Código do CID é obrigatório')
        .max(10, 'Código do CID deve ter no máximo 10 caracteres'),
      descricao: z.string()
        .min(1, 'Descrição do CID é obrigatória')
        .max(200, 'Descrição do CID deve ter no máximo 200 caracteres')
    }),
    
    atestadoMedico: z.object({
      numero: z.string()
        .min(1, 'Número do atestado é obrigatório')
        .max(50, 'Número do atestado deve ter no máximo 50 caracteres'),
      dataEmissao: z.date()
        .refine((date) => date <= new Date(), {
          message: 'Data de emissão não pode ser futura'
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
      })
    }),
    
    acidenteTrabalho: z.object({
      ocorreu: z.boolean(),
      numeroCat: z.string()
        .max(50, 'Número da CAT deve ter no máximo 50 caracteres')
        .optional(),
      dataAcidente: z.date()
        .refine((date) => date <= new Date(), {
          message: 'Data do acidente não pode ser futura'
        })
        .optional(),
      dataEmissaoCat: z.date()
        .refine((date) => date <= new Date(), {
          message: 'Data de emissão da CAT não pode ser futura'
        })
        .optional()
    }).optional(),
    
    observacao: z.string()
      .max(1000, 'Observação deve ter no máximo 1000 caracteres')
      .optional()
  })
}); 
