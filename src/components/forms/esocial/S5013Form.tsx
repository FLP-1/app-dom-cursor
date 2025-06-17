/**
 * Arquivo: S5013Form.tsx
 * Caminho: src/components/forms/esocial/S5013Form.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Formulário de evento S-5013 do eSocial.
 */

import React from 'react';
import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { useNotification } from '@/hooks/useNotification';
import { S5013FormFields } from './S5013FormFields';
import { S5013FormProps, S5013FormData, s5013FormSchema } from './S5013FormTypes';
import { getS5013DefaultValues } from './S5013FormUtils';

export function S5013Form({ initialData, onSubmit }: S5013FormProps) {
  const { t } = useTranslation();
  const { showNotification } = useNotification();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<S5013FormData>({
    resolver: zodResolver(s5013FormSchema),
    defaultValues: initialData || getS5013DefaultValues(),
  });

  const handleFormSubmit = async (data: S5013FormData) => {
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
          {t('forms.s5013.title')}
        </Typography>

        <Box component="form" onSubmit={handleSubmit(handleFormSubmit)} noValidate>
          <S5013FormFields control={control} />

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
