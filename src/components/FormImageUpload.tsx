/**
 * Arquivo: FormImageUpload.tsx
 * Caminho: src/components/FormImageUpload.tsx
 * Criado em: 2025-06-07
 * Última atualização: 2025-06-07
 * Descrição: Componente de upload de imagem com preview, validação e suporte a drag and drop
 */

import { useForm, Control, FieldValues } from 'react-hook-form';
import { Box, Typography, IconButton, CircularProgress } from '@mui/material';
import { Image as ImageIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useTranslation } from 'next-i18next';
import { useNotification } from '@/hooks/useNotification';
import { useState, useRef } from 'react';
import Image from 'next/image';

interface FormImageUploadProps<T extends FieldValues> {
  name: string;
  label: string;
  control: Control<T>;
  aspectRatio?: number;
  maxSize?: number;
  onUpload?: (file: File) => Promise<void>;
  disabled?: boolean;
  required?: boolean;
  helperText?: string;
  error?: string;
}

export function FormImageUpload<T extends FieldValues>({
  name,
  label,
  control,
  aspectRatio,
  maxSize = 5 * 1024 * 1024, // 5MB default
  onUpload,
  disabled = false,
  required = false,
  helperText,
  error
}: FormImageUploadProps<T>) {
  const { t } = useTranslation();
  const { showNotification } = useNotification();
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > maxSize) {
      showNotification({
        type: 'error',
        message: t('imageUpload.errors.maxSize', { size: formatFileSize(maxSize) })
      });
      return;
    }

    if (!file.type.startsWith('image/')) {
      showNotification({
        type: 'error',
        message: t('imageUpload.errors.invalidType')
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    if (onUpload) {
      try {
        setLoading(true);
        await onUpload(file);
        showNotification({
          type: 'success',
          message: t('imageUpload.messages.uploadSuccess')
        });
      } catch (error) {
        console.error('Erro ao fazer upload:', error);
        showNotification({
          type: 'error',
          message: t('imageUpload.messages.uploadError')
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleRemove = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
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
    <Box sx={{ position: 'relative' }}>
      <input
        type="file"
        id={name}
        accept="image/*"
        onChange={handleFileChange}
        disabled={disabled || loading}
        style={{ display: 'none' }}
        ref={fileInputRef}
        aria-label={label}
      />

      {!preview ? (
        <Box
          sx={{
            border: '2px dashed',
            borderColor: 'divider',
            borderRadius: 1,
            p: 3,
            textAlign: 'center',
            cursor: disabled || loading ? 'not-allowed' : 'pointer',
            opacity: disabled || loading ? 0.5 : 1,
            '&:hover': {
              borderColor: 'primary.main',
              bgcolor: 'action.hover'
            }
          }}
          onClick={() => !disabled && !loading && fileInputRef.current?.click()}
        >
          <ImageIcon sx={{ fontSize: 40, color: 'text.secondary', mb: 1 }} />
          <Typography variant="body2" color="text.secondary">
            {label}
          </Typography>
          <Typography variant="caption" color="text.secondary" display="block">
            {t('imageUpload.dragAndDrop')}
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            paddingTop: aspectRatio ? `${(1 / aspectRatio) * 100}%` : 'auto',
            borderRadius: 1,
            overflow: 'hidden'
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'background.paper'
            }}
          >
            <Box
              component={Image}
              src={preview}
              alt={label}
              fill
              sx={{
                objectFit: 'contain'
              }}
              sizes="100vw"
              priority
            />
            <IconButton
              onClick={handleRemove}
              disabled={disabled || loading}
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                bgcolor: 'background.paper',
                '&:hover': { bgcolor: 'background.paper' }
              }}
              aria-label="Remover imagem"
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
      )}

      {loading && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'rgba(255, 255, 255, 0.8)',
            borderRadius: 1
          }}
        >
          <CircularProgress />
        </Box>
      )}

      {helperText && (
        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
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
