/**
 * Arquivo: useTranslation.ts
 * Caminho: src/hooks/useTranslation.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

export const useTranslation = () => {
  const t = (key: string) => key;
  const i18n = {
    language: 'pt-BR',
    changeLanguage: jest.fn(),
  };

  return {
    t,
    i18n,
  };
}; 
