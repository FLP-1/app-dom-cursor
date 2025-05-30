import { z } from 'zod';

export const S2250Schema = z.object({
  payload: z.object({
    cpf: z.string()
      .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF deve estar no formato 000.000.000-00')
      .min(14, 'CPF deve ter 14 caracteres')
      .max(14, 'CPF deve ter 14 caracteres'),
    
    dataAviso: z.date()
      .refine((data) => data <= new Date(), {
        message: 'Data do aviso não pode ser futura'
      }),
    
    dataInicioAviso: z.date()
      .refine((data) => data <= new Date(), {
        message: 'Data de início do aviso não pode ser futura'
      }),
    
    dataFimAviso: z.date()
      .refine((data) => data <= new Date(), {
        message: 'Data de fim do aviso não pode ser futura'
      })
      .refine((data, ctx) => {
        const dataInicio = ctx.parent.dataInicioAviso;
        return data >= dataInicio;
      }, {
        message: 'Data de fim do aviso deve ser maior ou igual à data de início'
      }),
    
    tipoAviso: z.enum(['1', '2'], {
      errorMap: () => ({ message: 'Tipo de aviso deve ser 1 (Trabalhador) ou 2 (Empregador)' })
    }),
    
    codigoMotivoAviso: z.string()
      .min(1, 'Código do motivo do aviso é obrigatório'),
    
    motivoAviso: z.string()
      .min(1, 'Motivo do aviso é obrigatório')
      .max(200, 'Motivo do aviso deve ter no máximo 200 caracteres'),
    
    dataDesligamento: z.date()
      .refine((data) => data > new Date(), {
        message: 'Data do desligamento deve ser futura'
      })
      .refine((data, ctx) => {
        const dataFimAviso = ctx.parent.dataFimAviso;
        return data >= dataFimAviso;
      }, {
        message: 'Data do desligamento deve ser maior ou igual à data de fim do aviso'
      }),
    
    indenizacao: z.object({
      valor: z.number()
        .min(0, 'Valor da indenização não pode ser negativo')
        .max(999999.99, 'Valor da indenização deve ser menor que 1.000.000,00'),
      
      dataPagamento: z.date()
        .refine((data) => data > new Date(), {
          message: 'Data do pagamento deve ser futura'
        })
    }).optional(),
    
    observacao: z.string()
      .max(1000, 'Observação deve ter no máximo 1000 caracteres')
      .optional()
  })
}); 