import { z } from 'zod';

export const S2300Schema = z.object({
  cpf: z.string().length(11).regex(/^\d+$/),
  nome: z.string().min(1).max(100),
  dataNascimento: z.date(),
  sexo: z.enum(['M', 'F']),
  pis: z.string().length(11).regex(/^\d+$/),
  dataInicio: z.date(),
  dataFim: z.date().optional(),
  tipoTrabalhador: z.enum([
    'AVULSO',
    'TEMPORARIO',
    'ESTAGIARIO',
    'APRENDIZ',
    'OUTROS'
  ]),
  cargo: z.string().min(1).max(100),
  valorHora: z.number().min(0),
  cargaHoraria: z.number().min(0).max(40),
  observacao: z.string().max(1000).optional()
}); 