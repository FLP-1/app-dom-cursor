/**
 * Arquivo: @emotion.d.ts
 * Caminho: src/@emotion.d.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Declaração do tipo do tema do Material-UI
 */

import '@emotion/react';
import type { Theme as MuiTheme } from './styles/theme';

declare module '@emotion/react' {
  export interface Theme extends MuiTheme {}
} 
