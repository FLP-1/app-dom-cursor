/**
 * Arquivo: S5011FormTypes.ts
 * Caminho: src/components/forms/esocial/S5011FormTypes.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Tipos e interfaces para o formulário de evento S-5011 do eSocial.
 */

import { z } from 'zod';

export const s5011FormSchema = z.object({
  campoExemplo: z.string().min(1, 'Campo exemplo é obrigatório'),
  // Adicione outros campos conforme necessário
});

export type S5011FormData = z.infer<typeof s5011FormSchema>;

export interface S5011FormProps {
  initialData?: Partial<S5011FormData>;
  onSubmit: (data: S5011FormData) => Promise<void>;
} 