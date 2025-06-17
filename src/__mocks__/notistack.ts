/**
 * Arquivo: notistack.ts
 * Caminho: src/__mocks__/notistack.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

import React from 'react';

// Mock do useSnackbar
export const useSnackbar = () => ({
  enqueueSnackbar: jest.fn(),
  closeSnackbar: jest.fn(),
});

// Mock do SnackbarProvider
export const SnackbarProvider = ({ children }: { children: React.ReactNode }) => React.createElement(React.Fragment, null, children);

const notistackMock = {
  useSnackbar,
  SnackbarProvider,
};

export default notistackMock; 
