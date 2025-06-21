/**
 * Arquivo: ConfiguracoesAdminUtils.ts
 * Caminho: src/components/configuracoes/ConfiguracoesAdminUtils.ts
 * Criado em: 2025-06-12
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

import { z } from 'zod';

export const configuracaoGlobalSchema = z.object({
  chave: z.string().min(1, 'Chave obrigatória'),
  valor: z.string().min(1, 'Valor obrigatório'),
  descricao: z.string().optional(),
}); 
