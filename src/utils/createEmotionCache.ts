/**
 * Arquivo: createEmotionCache.ts
 * Caminho: src/utils/createEmotionCache.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Função para criar cache do Emotion
 */

import createCache from '@emotion/cache';

export default function createEmotionCache() {
  return createCache({ key: 'css', prepend: true });
} 
