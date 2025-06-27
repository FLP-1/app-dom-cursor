import React from 'react';
import { IMaskInput, IMaskInputProps } from 'react-imask';

export const CPFMask = React.forwardRef<HTMLInputElement, IMaskInputProps>(
  (props, ref) => (
    <IMaskInput
      {...props}
      mask="000.000.000-00"
      inputRef={ref}
      overwrite
    />
  )
);

export default CPFMask; 