import { z } from 'zod';

export const S2210Schema = z.object({
  payload: z.object({
    cpf: z.string()
      .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF deve estar no formato 000.000.000-00')
      .min(14, 'CPF deve ter 14 caracteres')
      .max(14, 'CPF deve ter 14 caracteres'),
    
    dataAcidente: z.date()
      .refine((date) => date <= new Date(), {
        message: 'Data do acidente não pode ser futura'
      }),
    
    horaAcidente: z.string()
      .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Hora deve estar no formato HH:mm'),
    
    tipoAcidente: z.string()
      .min(1, 'Tipo de acidente é obrigatório'),
    
    localAcidente: z.object({
      tipo: z.string()
        .min(1, 'Tipo de local é obrigatório'),
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
    
    parteAtingida: z.array(z.object({
      codigo: z.string()
        .min(1, 'Código da parte atingida é obrigatório'),
      lateralidade: z.enum(['E', 'D', 'A'], {
        errorMap: () => ({ message: 'Lateralidade deve ser E (esquerda), D (direita) ou A (ambos)' })
      })
    })).min(1, 'Pelo menos uma parte atingida deve ser informada'),
    
    agenteCausador: z.array(z.object({
      codigo: z.string()
        .min(1, 'Código do agente causador é obrigatório')
    })).min(1, 'Pelo menos um agente causador deve ser informado'),
    
    atestadoMedico: z.object({
      numero: z.string()
        .min(1, 'Número do atestado é obrigatório')
        .max(50, 'Número do atestado deve ter no máximo 50 caracteres'),
      dataEmissao: z.date()
        .refine((date) => date <= new Date(), {
          message: 'Data de emissão não pode ser futura'
        }),
      dataAfastamento: z.date()
        .refine((date) => date <= new Date(), {
          message: 'Data de afastamento não pode ser futura'
        }),
      diasAfastamento: z.number()
        .min(1, 'Dias de afastamento deve ser maior que zero')
        .max(999, 'Dias de afastamento deve ser menor que 999')
    }),
    
    observacao: z.string()
      .max(1000, 'Observação deve ter no máximo 1000 caracteres')
      .optional()
  })
}); 