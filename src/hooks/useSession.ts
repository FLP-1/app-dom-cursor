/**
 * Arquivo: useSession.ts
 * Caminho: src/hooks/useSession.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

export const useSession = () => {
  return {
    data: {
      user: {
        id: '1',
        name: 'Usuário Teste',
        email: 'teste@exemplo.com',
      },
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    },
    status: 'authenticated',
  };
}; 
