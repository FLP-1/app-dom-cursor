/**
 * Arquivo: react-imask.tsx
 * Caminho: src/__mocks__/react-imask.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

import React from 'react';

interface IMaskInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  inputRef?: React.Ref<HTMLInputElement>;
  mask?: string;
}

const IMaskInput = React.forwardRef<HTMLInputElement, IMaskInputProps>(
  (props, ref) => {
    const { inputRef, mask, ...rest } = props;
    return <input ref={ref} {...rest} />;
  }
);

IMaskInput.displayName = 'IMaskInput';

export { IMaskInput };
export type { IMaskInputProps }; 
