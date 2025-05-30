import { TextField, TextFieldProps } from '@mui/material';
import { Control, Controller, FieldValues, Path, useFormContext } from 'react-hook-form';
import { useCEP } from '../../hooks/useCEP';

interface FormCEPProps<T extends FieldValues> extends Omit<TextFieldProps, 'name'> {
  name: Path<T>;
  control: Control<T>;
  onSuccess?: (endereco: {
    logradouro: string;
    bairro: string;
    cidade: string;
    estado: string;
  }) => void;
}

export function FormCEP<T extends FieldValues>({
  name,
  control,
  onSuccess,
  ...props
}: FormCEPProps<T>) {
  const { setValue } = useFormContext();
  const { loading, error, buscarEndereco } = useCEP({
    onSuccess: (endereco) => {
      setValue('logradouro', endereco.logradouro);
      setValue('bairro', endereco.bairro);
      setValue('cidade', endereco.cidade);
      setValue('estado', endereco.estado);
      onSuccess?.(endereco);
    },
  });

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error: fieldError } }) => (
        <TextField
          {...field}
          {...props}
          error={!!fieldError || !!error}
          helperText={fieldError?.message || error}
          disabled={loading}
          onChange={(e) => {
            const cep = e.target.value.replace(/\D/g, '');
            field.onChange(e);
            if (cep.length === 8) {
              buscarEndereco(cep);
            }
          }}
          fullWidth
        />
      )}
    />
  );
} 