import React from 'react';

export const IMaskInput = React.forwardRef(({ inputRef, ...props }: any, ref) => {
  return <input ref={ref} {...props} />;
});

IMaskInput.displayName = 'IMaskInput';

export default {
  IMaskInput,
}; 