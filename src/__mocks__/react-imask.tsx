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