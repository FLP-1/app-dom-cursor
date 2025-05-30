import { z } from 'zod';

export const S1210Schema = z.object({
  cpf: z.string().length(11).regex(/^\d+$/),
  dataPagamento: z.date(),
  tipoRendimento: z.enum([
    '13_SALARIO',
    'FERIAS',
    'FERIAS_PROPORCIONAIS',
    'FERIAS_13_SALARIO',
    'RESCISAO',
    'OUTROS'
  ]),
  valorBruto: z.number().min(0),
  valorINSS: z.number().min(0),
  valorIRRF: z.number().min(0),
  valorFGTS: z.number().min(0),
  valorLiquido: z.number().min(0),
  observacao: z.string().max(1000).optional(),
  itensRendimento: z.array(z.object({
    codigo: z.string().min(1).max(30),
    descricao: z.string().min(1).max(100),
    valor: z.number().min(0)
  })).optional()
}); 