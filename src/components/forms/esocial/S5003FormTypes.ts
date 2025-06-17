/**
 * Arquivo: S5003FormTypes.ts
 * Caminho: src/components/forms/esocial/S5003FormTypes.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Tipos e interfaces para o formulário de evento S-5003 do eSocial.
 */

import { z } from 'zod';

export const s5003FormSchema = z.object({
  campoExemplo: z.string().min(1, 'Campo exemplo é obrigatório'),
  // Adicione outros campos conforme necessário
});

export type S5003FormData = z.infer<typeof s5003FormSchema>;

export interface S5003FormProps {
  initialData?: Partial<S5003FormData>;
  onSubmit: (data: S5003FormData) => Promise<void>;
} 