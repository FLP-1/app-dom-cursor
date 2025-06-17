/**
 * Arquivo: next-i18next.ts
 * Caminho: src/__mocks__/next-i18next.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

import React, { ReactNode } from 'react';

// Mock do useTranslation
export const useTranslation = () => ({
  t: (key: string) => key,
  i18n: {
    language: 'pt-BR',
    changeLanguage: jest.fn(),
  },
});

// Mock do initReactI18next
export const initReactI18next = {
  type: '3rdParty',
  init: jest.fn(),
};

// Mock do I18nextProvider
export const I18nextProvider = ({ children }: { children: ReactNode }) => React.createElement(React.Fragment, null, children);

// Exportar os mocks
const nextI18nextMock = {
  useTranslation,
  initReactI18next,
  I18nextProvider,
};

export default nextI18nextMock; 
