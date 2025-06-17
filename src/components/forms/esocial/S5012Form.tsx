/**
 * Arquivo: S5012Form.tsx
 * Caminho: src/components/forms/esocial/S5012Form.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Formulário de evento S-5012 do eSocial.
 */

import React from 'react';
import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { useNotification } from '@/hooks/useNotification';
import { S5012FormFields } from './S5012FormFields';
import { S5012FormProps, S5012FormData, s5012FormSchema } from './S5012FormTypes';
import { getS5012DefaultValues } from './S5012FormUtils';

export function S5012Form({ initialData, onSubmit }: S5012FormProps) {
  const { t } = useTranslation();
  const { showNotification } = useNotification();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<S5012FormData>({
    resolver: zodResolver(s5012FormSchema),
    defaultValues: initialData || getS5012DefaultValues(),
  });

  const handleFormSubmit = async (data: S5012FormData) => {
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
          {t('forms.s5012.title')}
        </Typography>

        <Box component="form" onSubmit={handleSubmit(handleFormSubmit)} noValidate>
          <S5012FormFields control={control} />

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
