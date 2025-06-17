/**
 * Arquivo: types.ts
 * Caminho: src/components/common/types.ts
 * Criado em: 2025-06-07
 * Última atualização: 2025-06-07
 * Descrição: Tipos e interfaces comuns para componentes reutilizáveis
 */

import { ReactNode } from 'react';
import { SxProps, Theme } from '@mui/material';

// Layout
export interface BoxProps {
  children: ReactNode;
  margin?: string;
  padding?: string;
  display?: string;
  alignItems?: string;
  justifyContent?: string;
  flex?: number;
  width?: string | number;
  height?: string | number;
  style?: React.CSSProperties;
}

export interface ContainerProps {
  children: ReactNode;
  maxWidth?: string | number;
  fluid?: boolean;
  sx?: SxProps<Theme>;
}

export interface RowProps {
  children: ReactNode;
  gap?: number;
  alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
  justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
  wrap?: boolean;
  sx?: SxProps<Theme>;
}

export interface ColProps {
  children: ReactNode;
  flex?: number;
  maxWidth?: string | number;
  sx?: SxProps<Theme>;
}

// Form
export interface FormInputProps {
  name: string;
  label: string;
  type?: string;
  mask?: string;
  validation?: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: {
      value: RegExp;
      message: string;
    };
    validate?: (value: unknown) => boolean | string;
  };
  fullWidth?: boolean;
  autoComplete?: string;
  style?: React.CSSProperties;
}

export interface CheckboxProps {
  name: string;
  label?: string;
  checked?: boolean;
  renderLabel?: (label: string) => ReactNode;
  style?: React.CSSProperties;
}

// UI
export interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: () => void;
  sx?: SxProps<Theme>;
}

export interface LinkProps {
  href: string;
  variant?: 'default' | 'primary' | 'secondary';
  underline?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  children: ReactNode;
  style?: React.CSSProperties;
}

export interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  variant?: 'default' | 'white';
  showText?: boolean;
  className?: string;
}

export interface TooltipProps {
  text: string;
  icon?: ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  maxWidth?: number;
}

// Data Display
export interface DataTableProps {
  columns: Array<{
    key: string;
    title: string;
    render?: (value: unknown) => ReactNode;
  }>;
  data: unknown[];
  pagination?: boolean;
  sorting?: boolean;
  style?: React.CSSProperties;
}

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  color?: string;
}

export interface CalendarProps {
  events: CalendarEvent[];
  onEventClick?: (event: CalendarEvent) => void;
  style?: React.CSSProperties;
}

// Feedback
export enum NotificationPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high'
}

export enum NotificationChannel {
  EMAIL = 'email',
  SMS = 'sms',
  PUSH = 'push'
}

export interface NotificationCardProps {
  title: string;
  message: string;
  priority: NotificationPriority;
  channel?: NotificationChannel;
  onClose?: () => void;
  style?: React.CSSProperties;
}

export interface NotificationContainerProps {
  children: ReactNode;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  sx?: SxProps<Theme>;
} 
