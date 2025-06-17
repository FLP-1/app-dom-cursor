/**
 * Arquivo: Checkbox.tsx
 * Caminho: src/components/common/Checkbox.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

import React, { ReactNode } from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  renderLabel?: (label: string) => ReactNode;
  inputRef?: React.Ref<HTMLInputElement>;
}

const CheckboxContainer = styled.label(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  gap: theme.spacing ? theme.spacing(1) : 8,
  userSelect: 'none',
}));

const HiddenCheckbox = styled.input({
  border: 0,
  clip: 'rect(0 0 0 0)',
  clippath: 'inset(50%)',
  height: 1,
  margin: -1,
  overflow: 'hidden',
  padding: 0,
  position: 'absolute',
  whiteSpace: 'nowrap',
  width: 1,
});

const StyledCheckbox = styled.span<{ checked: boolean }>(({ theme, checked }) => ({
  display: 'inline-block',
  width: 20,
  height: 20,
  background: checked ? theme.palette.primary.main : theme.palette.background.default,
  border: `2px solid ${checked ? theme.palette.primary.main : theme.palette.text.primary}`,
  borderRadius: theme.shape.borderRadius,
  transition: 'all 0.2s',
  position: 'relative',
  boxSizing: 'border-box',
  '&:after': checked
    ? {
        content: '""',
        position: 'absolute',
        left: 5,
        top: 1,
        width: 6,
        height: 12,
        border: `solid ${theme.palette.background.default}`,
        borderWidth: '0 3px 3px 0',
        transform: 'rotate(45deg)',
      }
    : {},
}));

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, renderLabel, checked, onChange, onBlur, name, inputRef, ...props }, ref) => {
    const theme = useTheme();
    return (
      <CheckboxContainer theme={theme}>
        <HiddenCheckbox
          type="checkbox"
          checked={!!checked}
          onChange={onChange}
          onBlur={onBlur}
          name={name}
          ref={ref || inputRef}
          {...props}
        />
        <StyledCheckbox checked={!!checked} theme={theme} />
        {label && (renderLabel ? renderLabel(label) : <span>{label}</span>)}
      </CheckboxContainer>
    );
  }
);
Checkbox.displayName = 'Checkbox';
export default Checkbox; 
