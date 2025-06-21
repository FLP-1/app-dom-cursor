/**
 * Arquivo: FormFileUpload.tsx
 * Caminho: src/components/FormFileUpload.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

import { useForm, Control } from 'react-hook-form';
import { Button, Typography, Box, CircularProgress } from '@mui/material';
import { CloudUpload as CloudUploadIcon } from '@mui/icons-material';
import { useTranslation } from 'next-i18next';
import { useNotification } from '@/hooks/useNotification';

interface FormFileUploadProps {
  name: string;
  label: string;
  control: Control;
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // em bytes
  onUpload?: (files: File[]) => Promise<void>;
  disabled?: boolean;
  required?: boolean;
  helperText?: string;
  error?: string;
}

export function FormFileUpload({
  name,
  label,
  control,
  accept,
  multiple = false,
  maxSize,
  onUpload,
  disabled = false,
  required = false,
  helperText,
  error
}: FormFileUploadProps) {
  const { t } = useTranslation();
  const { showNotification } = useNotification();
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    
    if (maxSize) {
      const invalidFiles = selectedFiles.filter(file => file.size > maxSize);
      if (invalidFiles.length > 0) {
        showNotification({
          type: 'error',
          message: t('fileUpload.errors.maxSize', { size: formatFileSize(maxSize) })
        });
        return;
      }
    }

    setFiles(selectedFiles);
    
    if (onUpload) {
      try {
        setLoading(true);
        await onUpload(selectedFiles);
        showNotification({
          type: 'success',
          message: t('fileUpload.messages.uploadSuccess')
        });
      } catch (error) {
        console.error('Erro ao fazer upload:', error);
        showNotification({
          type: 'error',
          message: t('fileUpload.messages.uploadError')
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Box>
      <input
        type="file"
        id={name}
        accept={accept}
        multiple={multiple}
        onChange={handleFileChange}
        disabled={disabled || loading}
        sx={{ display: 'none' }}
      />
      <label htmlFor={name}>
        <Button
          component="span"
          variant="outlined"
          startIcon={loading ? <CircularProgress size={20} /> : <CloudUploadIcon />}
          disabled={disabled || loading}
          fullWidth
        >
          {label}
        </Button>
      </label>
      
      {files.length > 0 && (
        <Box mt={1}>
          <Typography variant="body2">
            {t('fileUpload.selectedFiles', { count: files.length })}
          </Typography>
          {files.map((file, index) => (
            <Typography key={index} variant="caption" display="block">
              {file.name} ({formatFileSize(file.size)})
            </Typography>
          ))}
        </Box>
      )}

      {helperText && !error && (
        <Typography variant="caption" color="textSecondary">
          {helperText}
        </Typography>
      )}

      {error && (
        <Typography variant="caption" color="error">
          {error}
        </Typography>
      )}
    </Box>
  );
} 
