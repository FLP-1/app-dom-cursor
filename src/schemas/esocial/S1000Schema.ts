import { z } from 'zod';
import {
  ideEmpregadorSchema,
  infoCadastroSchema,
  dadosIsencaoSchema,
  infoOPSchema,
  infoOrgInternacionalSchema
} from './validation/S1000Validation';

export const s1000Schema = z.object({
  ideEmpregador: ideEmpregadorSchema,
  infoCadastro: infoCadastroSchema,
  dadosIsencao: dadosIsencaoSchema.optional(),
  infoOP: infoOPSchema.optional(),
  infoOrgInternacional: infoOrgInternacionalSchema.optional(),
});

export type { S1000Schema } from './types/S1000Types'; 