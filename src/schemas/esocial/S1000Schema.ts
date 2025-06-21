/**
 * Arquivo: S1000Schema.ts
 * Caminho: src/schemas/esocial/S1000Schema.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Schema para o evento S-1000
 */

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
