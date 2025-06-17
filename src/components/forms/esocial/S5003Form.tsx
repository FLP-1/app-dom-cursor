/**
 * Arquivo: S5003Form.tsx
 * Caminho: src/components/forms/esocial/S5003Form.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Formulário de evento S-5003 do eSocial.
 */

import React from 'react';
import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { useNotification } from '@/hooks/useNotification';
import { S5003FormFields } from './S5003FormFields';
import { S5003FormProps, S5003FormData, s5003FormSchema } from './S5003FormTypes';
import { getS5003DefaultValues } from './S5003FormUtils';

export function S5003Form({ initialData, onSubmit }: S5003FormProps) {
  const { t } = useTranslation();
  const { showNotification } = useNotification();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<S5003FormData>({
    resolver: zodResolver(s5003FormSchema),
    defaultValues: initialData || getS5003DefaultValues(),
  });

  const handleFormSubmit = async (data: S5003FormData) => {
    try {
      await onSubmit(data);
      showNotification(t('notifications.success'), 'success');
    } catch (error) {
      showNotification(t('notifications.error'), 'error');
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {t('forms.s5003.title')}
        </Typography>

        <Box component="form" onSubmit={handleSubmit(handleFormSubmit)} noValidate>
          <S5003FormFields control={control} />

          <Box sx={{ mt: 2 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              fullWidth
            >
              {t('forms.actions.submit')}
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
} 
