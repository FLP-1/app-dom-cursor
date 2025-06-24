/**
 * Arquivo: Button.tsx
 * Caminho: src/components/common/Button.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-01-27
 * Descrição: Componente Button customizado baseado no Material UI
 */

import React from "react";
import { Button as MuiButton, SxProps, Theme } from "@mui/material";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
  sx?: SxProps<Theme>;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = "primary", 
  sx,
  ...props 
}) => {
  return (
    <MuiButton
      {...props}
      variant="contained"
      color={variant === "primary" ? "primary" : "secondary"}
      fullWidth
      sx={sx}
    >
      {children}
    </MuiButton>
  );
};

export { Button };
export default Button;
