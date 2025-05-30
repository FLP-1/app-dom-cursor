import React, { useId } from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

const TextAreaContainer = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
  width: '100%',
}));

const StyledLabel = styled.label(({ theme }) => ({
  fontWeight: theme.typography.fontWeightMedium,
  marginBottom: theme.spacing(1),
}));

const StyledTextArea = styled.textarea(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.text.primary}`,
  fontSize: theme.typography.fontSize.medium,
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.default,
  width: '100%',
  minHeight: '80px',
  boxSizing: 'border-box',
  resize: 'vertical',
  '&:focus': {
    outline: 'none',
    borderColor: theme.palette.primary.main,
    boxShadow: `0 0 0 0.2rem ${theme.palette.primary.main}40`,
  },
  '&::placeholder': {
    color: theme.palette.text.primary,
    opacity: 0.7,
  },
}));

const TextArea: React.FC<TextAreaProps> = ({ label, ...props }) => {
  const theme = useTheme();
  const id = useId();
  return (
    <TextAreaContainer>
      {label && <StyledLabel htmlFor={id}>{label}</StyledLabel>}
      <StyledTextArea id={id} aria-label={label} title={label} {...props} />
    </TextAreaContainer>
  );
};

export default TextArea; 