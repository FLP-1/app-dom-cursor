/**
 * Arquivo: S5012FormTypes.ts
 * Caminho: src/components/forms/esocial/S5012FormTypes.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Tipos e interfaces para o formulário de evento S-5012 do eSocial.
 */

import { z } from 'zod';

export const s5012FormSchema = z.object({
  campoExemplo: z.string().min(1, 'Campo exemplo é obrigatório'),
  // Adicione outros campos conforme necessário
});

export type S5012FormData = z.infer<typeof s5012FormSchema>;

export interface S5012FormProps {
  initialData?: Partial<S5012FormData>;
  onSubmit: (data: S5012FormData) => Promise<void>;
} 