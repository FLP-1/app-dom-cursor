/**
 * Arquivo: S5002Schema.ts
 * Caminho: src/schemas/esocial/S5002Schema.ts
 * Criado em: 2025-06-05
 * Última atualização: 2025-06-13
 * Descrição: Schema para o evento S-5002
 */

import { z } from 'zod';

// TODO: Adicionar todos os campos obrigatórios do evento S-5002 conforme layout oficial do eSocial
export const S5002Schema = z.object({
  campoExemplo: z.string().min(1, 'Campo obrigatório'),
}); 
