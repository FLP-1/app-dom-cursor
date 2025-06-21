/**
 * Arquivo: Container.tsx
 * Caminho: src/components/Container.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default Container; 
