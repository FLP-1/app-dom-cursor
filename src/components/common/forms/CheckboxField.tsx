/**
 * Arquivo: CheckboxField.tsx
 * Caminho: src/components/common/forms/CheckboxField.tsx
 * Criado em: 2025-06-13
 * Última atualização: 2025-06-13
 * Descrição: Componente de checkbox integrado ao React Hook Form, tipado genericamente para uso em qualquer formulário.
 */

import React, { ReactNode } from 'react';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import Checkbox from '@/components/common/Checkbox';

interface CheckboxFieldProps<T extends FieldValues = FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  renderLabel?: (label: string) => ReactNode;
  inputRef?: React.Ref<HTMLInputElement>;
  [key: string]: any;
}

export function CheckboxField<T extends FieldValues = FieldValues>({
  name,
  control,
  label,
  renderLabel,
  inputRef,
  ...props
}: CheckboxFieldProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Checkbox
          {...field}
          checked={!!field.value}
          label={label}
          renderLabel={renderLabel}
          inputRef={inputRef}
          {...props}
        />
      )}
    />
  );
} 
