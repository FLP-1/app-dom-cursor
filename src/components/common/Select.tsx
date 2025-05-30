import React from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { value: string; label: string }[];
  id?: string;
  'aria-labelledby'?: string;
}

const StyledLabel = styled.label(({ theme }) => ({
  fontWeight: theme.typography.fontWeightMedium,
  fontSize: theme.typography.fontSize.medium,
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(1),
  display: 'inline-block',
}));

const StyledSelect = styled.select(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.text.primary}`,
  fontSize: theme.typography.fontSize.medium,
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.default,
  width: '100%',
  boxSizing: 'border-box',
  appearance: 'none',
  '&:focus': {
    outline: 'none',
    borderColor: theme.palette.primary.main,
    boxShadow: `0 0 0 0.2rem ${theme.palette.primary.main}40`,
  },
}));

const Select: React.FC<SelectProps> = ({ label, options, id, 'aria-labelledby': ariaLabelledby, ...props }) => {
  const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <>
      <StyledLabel htmlFor={selectId}>{label}</StyledLabel>
      <StyledSelect
        id={selectId}
        name={props.name || selectId}
        aria-label={label}
        aria-labelledby={ariaLabelledby}
        {...props}
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </StyledSelect>
    </>
  );
};

export default Select; 