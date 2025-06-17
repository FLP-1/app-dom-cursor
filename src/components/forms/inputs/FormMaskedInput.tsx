/**
 * Arquivo: FormMaskedInput.tsx
 * Caminho: src/components/forms/inputs/FormMaskedInput.tsx
 * Criado em: 2024-06-07
 * Última atualização: 2024-06-07
 * Descrição: Componente de input com máscara usando react-imask.
 */

import { IMaskInput } from 'react-imask';
import { forwardRef } from 'react';
import { TextField, TextFieldProps } from '@mui/material';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import HelperText from '@/components/common/HelperText';

interface MaskedInputProps<T extends FieldValues> extends Omit<TextFieldProps, 'name'> {
  name: Path<T>;
  control: Control<T>;
  mask: string;
  label: string;
  required?: boolean;
}

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const MaskedInput = forwardRef<HTMLInputElement, CustomProps>((props, ref) => {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask={props.mask}
      inputRef={ref}
      onAccept={(value: string) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});

MaskedInput.displayName = 'MaskedInput';

export function FormMaskedInput<T extends FieldValues>({
  name,
  control,
  mask,
  label,
  required,
  ...props
}: MaskedInputProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <>
          <TextField
            {...props}
            label={label}
            value={value}
            onChange={onChange}
            error={!!error}
            helperText={error?.message}
            required={required}
            InputProps={{
              inputComponent: MaskedInput as any,
              inputProps: {
                mask,
              },
            }}
          />
          <HelperText
            text={error?.message}
            error={!!error}
          />
        </>
      )}
    />
  );
}

export default FormMaskedInput; 
