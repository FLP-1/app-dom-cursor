/**
 * Arquivo: S5011Form.tsx
 * Caminho: src/components/forms/esocial/S5011Form.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Formulário de evento S-5011 do eSocial.
 */

import React from 'react';
import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { useNotification } from '@/hooks/useNotification';
import { S5011FormFields } from './S5011FormFields';
import { S5011FormProps, S5011FormData, s5011FormSchema } from './S5011FormTypes';
import { getS5011DefaultValues } from './S5011FormUtils';

export function S5011Form({ initialData, onSubmit }: S5011FormProps) {
  const { t } = useTranslation();
  const { showNotification } = useNotification();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<S5011FormData>({
    resolver: zodResolver(s5011FormSchema),
    defaultValues: initialData || getS5011DefaultValues(),
  });

  const handleFormSubmit = async (data: S5011FormData) => {
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
          {t('forms.s5011.title')}
        </Typography>

        <Box component="form" onSubmit={handleSubmit(handleFormSubmit)} noValidate>
          <S5011FormFields control={control} />

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
