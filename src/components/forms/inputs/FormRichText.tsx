/**
 * Arquivo: FormRichText.tsx
 * Caminho: src/components/forms/inputs/FormRichText.tsx
 * Criado em: 2024-06-07
 * Última atualização: 2025-01-27
 * Descrição: Componente de editor de texto rico com Material UI.
 */

import { TextField, TextFieldProps, Typography } from '@mui/material';
import { Controller, FieldValues, Path } from 'react-hook-form';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { authMessages } from '@/i18n/messages/auth.messages';

// Importação dinâmica do ReactQuill para evitar problemas de SSR
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <Typography>{authMessages.pt.mensagens.carregandoEditor}</Typography>,
});

interface FormRichTextProps<T extends FieldValues> extends Omit<TextFieldProps, 'name'> {
  name: Path<T>;
  control: any;
  label: string;
}

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ indent: '-1' }, { indent: '+1' }],
    [{ align: [] }],
    ['link', 'image'],
    ['clean'],
  ],
};

const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'list',
  'bullet',
  'indent',
  'align',
  'link',
  'image',
];

export function FormRichText<T extends FieldValues>({
  name,
  control,
  label,
  ...props
}: FormRichTextProps<T>) {
  // Usar mensagens em português por padrão
  const messages = authMessages.pt;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          {...props}
          label={label}
          value={value || ''}
          onChange={onChange}
          error={!!error}
          helperText={error?.message}
          multiline
          aria-label={messages.tooltips.editorTexto}
          InputProps={{
            inputComponent: ReactQuill as any,
          }}
        />
      )}
    />
  );
} 
