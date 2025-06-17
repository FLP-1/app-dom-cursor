/**
 * Arquivo: S5013FormTypes.ts
 * Caminho: src/components/forms/esocial/S5013FormTypes.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Tipos e interfaces para o formulário de evento S-5013 do eSocial.
 */

import { z } from 'zod';

export const s5013FormSchema = z.object({
  campoExemplo: z.string().min(1, 'Campo exemplo é obrigatório'),
  // Adicione outros campos conforme necessário
});

export type S5013FormData = z.infer<typeof s5013FormSchema>;

export interface S5013FormProps {
  initialData?: Partial<S5013FormData>;
  onSubmit: (data: S5013FormData) => Promise<void>;
} 