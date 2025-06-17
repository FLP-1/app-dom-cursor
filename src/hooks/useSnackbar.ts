/**
 * Arquivo: useSnackbar.ts
 * Caminho: src/hooks/useSnackbar.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

export const useSnackbar = () => {
  return {
    enqueueSnackbar: jest.fn(),
    closeSnackbar: jest.fn(),
  };
}; 
