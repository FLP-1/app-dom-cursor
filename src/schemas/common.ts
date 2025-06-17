/**
 * Arquivo: common.ts
 * Caminho: src/schemas/common.ts
 * Criado em: 2025-06-02
 * Última atualização: 2025-06-13
 * Descrição: Schemas comuns para validações globais
 */

import { z } from 'zod';

export const cpfSchema = z.string().length(11, 'CPF inválido');
export const cnpjSchema = z.string().length(14, 'CNPJ inválido'); 
