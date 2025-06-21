/**
 * Arquivo: index.tsx
 * Caminho: src/pages/recuperar-senha/index.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Página de recuperação de senha
 */

import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, TextField, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { useRecuperarSenhaForm } from '@/hooks/useRecuperarSenhaForm';
import { useNotification } from '@/hooks/useNotification';
import { PageHeader } from '@/components/common/PageHeader';
import { FormData } from '@/types/forms';
import { Layout } from '@/components/layout/Layout';

interface RecuperarSenhaData extends FormData {
  email: string;
}

export default function RecuperarSenhaPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const { showNotification } = useNotification();
  const { control, handleSubmit, formState: { errors } } = useRecuperarSenhaForm();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: RecuperarSenhaData) => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/recuperar-senha', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Erro ao enviar e-mail de recuperação');
      }

      showNotification({
        type: 'success',
        message: t('recuperarSenha.messages.emailEnviado')
      });
      router.push('/auth/login');
    } catch (error) {
      showNotification({
        type: 'error',
        message: t('recuperarSenha.messages.erroEnviarEmail')
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <Box sx={{ p: 3 }}>
        <PageHeader
          title={t('Recuperar Senha')}
        />

        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
          <Card sx={{ maxWidth: 400, width: '100%' }}>
            <CardContent>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                {t('recuperarSenha.titulo')}
              </Typography>

              <Typography variant="body2" color="text.secondary" paragraph>
                {t('recuperarSenha.descricao')}
              </Typography>

              <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                  fullWidth
                  label={t('recuperarSenha.email.label')}
                  type="email"
                  margin="normal"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  {...control('email')}
                />

                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={isLoading}
                  sx={{ mt: 3 }}
                >
                  {t('recuperarSenha.enviar')}
                </Button>

                <Button
                  fullWidth
                  variant="text"
                  color="primary"
                  onClick={() => router.push('/auth/login')}
                  sx={{ mt: 1 }}
                >
                  {t('recuperarSenha.voltar')}
                </Button>
              </form>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Layout>
  );
} 
