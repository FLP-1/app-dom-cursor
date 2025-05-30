import { Control } from 'react-hook-form';
import { Box, Typography } from '@mui/material';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

// Importação dinâmica do ReactQuill para evitar problemas de SSR
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <Typography>Carregando editor...</Typography>,
});

interface FormRichTextProps {
  name: string;
  label: string;
  control: Control;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  required?: boolean;
  helperText?: string;
  error?: string;
  minHeight?: number;
  placeholder?: string;
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

export function FormRichText({
  name,
  label,
  control,
  value,
  onChange,
  disabled = false,
  required = false,
  helperText,
  error,
  minHeight = 200,
  placeholder,
}: FormRichTextProps) {
  return (
    <Box>
      <Typography
        component="label"
        htmlFor={name}
        variant="body2"
        color="textPrimary"
        sx={{ mb: 1, display: 'block' }}
      >
        {label}
        {required && <span style={{ color: 'red' }}> *</span>}
      </Typography>

      <Box
        sx={{
          '& .ql-container': {
            minHeight: minHeight,
            fontSize: '1rem',
            fontFamily: 'inherit',
          },
          '& .ql-editor': {
            minHeight: minHeight,
          },
          '& .ql-toolbar': {
            borderTopLeftRadius: 4,
            borderTopRightRadius: 4,
          },
          '& .ql-container': {
            borderBottomLeftRadius: 4,
            borderBottomRightRadius: 4,
          },
        }}
      >
        <ReactQuill
          id={name}
          value={value}
          onChange={onChange}
          modules={modules}
          formats={formats}
          readOnly={disabled}
          placeholder={placeholder}
          theme="snow"
        />
      </Box>

      {helperText && !error && (
        <Typography variant="caption" color="textSecondary" sx={{ mt: 1, display: 'block' }}>
          {helperText}
        </Typography>
      )}

      {error && (
        <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block' }}>
          {error}
        </Typography>
      )}
    </Box>
  );
} 