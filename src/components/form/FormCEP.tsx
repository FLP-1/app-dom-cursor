/**
 * Arquivo: FormCEP.tsx
 * Caminho: src/components/form/FormCEP.tsx
 * Criado em: 2025-06-07
 * Última atualização: 2025-06-07
 * Descrição: Componente de formulário para busca de CEP com integração à API ViaCEP.
 * Permite busca automática de endereço ao digitar um CEP válido.
 */

import { TextField, TextFieldProps, FormControl, FormHelperText } from '@mui/material';
import { Control, Controller, FieldValues, Path, useFormContext } from 'react-hook-form';
import { useCEP } from '@/hooks/useCEP';

interface Endereco {
  logradouro: string;
  bairro: string;
  cidade: string;
  estado: string;
}

interface FormCEPProps<T extends FieldValues> extends Omit<TextFieldProps, 'name'> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  onSuccess?: (endereco: Endereco) => void;
}

export const FormCEP = <T extends FieldValues>({
  name,
  control,
  label,
  onSuccess,
  ...props
}: FormCEPProps<T>) => {
  const { setValue } = useFormContext();
  const { loading, error, buscarEndereco } = useCEP({
    onSuccess: (endereco: Endereco) => {
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
        <FormControl 
          fullWidth 
          error={!!fieldError || !!error}
          aria-describedby={`${name}-error`}
        >
          <TextField
            {...field}
            {...props}
            label={label}
            aria-labelledby={`${name}-label`}
            id={`${name}-input`}
            disabled={loading}
            inputProps={{
              'aria-label': `Campo de ${label}`,
              'aria-invalid': !!(fieldError || error),
              'aria-describedby': `${name}-error`,
              maxLength: 9,
              pattern: '[0-9]{5}-[0-9]{3}',
            }}
            onChange={(e) => {
              const cep = e.target.value.replace(/\D/g, '');
              field.onChange(e);
              if (cep.length === 8) {
                buscarEndereco(cep);
              }
            }}
          />
          {(fieldError || error) && (
            <FormHelperText id={`${name}-error`}>
              {fieldError?.message || error}
            </FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
}; 
