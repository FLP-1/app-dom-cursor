import { z } from 'zod';

export const S2206Schema = z.object({
  cpf: z
    .string()
    .min(11, 'CPF deve ter 11 dígitos')
    .max(14, 'CPF deve ter no máximo 14 caracteres')
    .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF deve estar no formato 000.000.000-00'),
  dataAlteracao: z.date()
    .max(new Date(), 'Data de alteração não pode ser futura'),
  tipoAlteracao: z.string()
    .min(1, 'Tipo de alteração é obrigatório'),
  motivoAlteracao: z.string()
    .min(1, 'Motivo da alteração é obrigatório')
    .max(200, 'Motivo da alteração deve ter no máximo 200 caracteres'),
  cargo: z.string()
    .min(1, 'Cargo é obrigatório')
    .max(100, 'Cargo deve ter no máximo 100 caracteres'),
  salario: z.number()
    .min(0, 'Salário não pode ser negativo')
    .max(999999.99, 'Salário deve ser menor que 1.000.000,00'),
  jornadaTrabalho: z.object({
    tipo: z.string()
      .min(1, 'Tipo de jornada é obrigatório'),
    cargaHoraria: z.number()
      .min(0, 'Carga horária não pode ser negativa')
      .max(168, 'Carga horária deve ser menor que 168 horas'),
    horarioInicio: z.string()
      .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Horário de início deve estar no formato HH:mm'),
    horarioFim: z.string()
      .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Horário de fim deve estar no formato HH:mm')
  }),
  localTrabalho: z.object({
    tipo: z.string()
      .min(1, 'Tipo de local de trabalho é obrigatório'),
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
  })
}); 