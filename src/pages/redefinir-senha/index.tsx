/**
 * Arquivo: index.tsx
 * Caminho: src/pages/redefinir-senha/index.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Página de redefinição de senha
 */

import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, TextField, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { useSenhaForm } from '@/hooks/useSenhaForm';
import { useNotification } from '@/hooks/useNotification';
import { PageHeader } from '@/components/common/PageHeader';
import { FormData } from '@/types/forms';
import Layout from '@/components/layout/Layout';

interface RedefinirSenhaData extends FormData {
  senha: string;
  confirmarSenha: string;
  token: string;
}

export default function RedefinirSenhaPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const { token } = router.query;
  const { showNotification } = useNotification();
  const { control, handleSubmit, formState: { errors } } = useSenhaForm();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: RedefinirSenhaData) => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/redefinir-senha', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...data, token }),
      });

      if (!response.ok) {
        throw new Error('Erro ao redefinir senha');
      }

      showNotification({
        type: 'success',
        message: t('redefinirSenha.messages.senhaAlterada')
      });
      router.push('/auth/login');
    } catch (error) {
      showNotification({
        type: 'error',
        message: t('redefinirSenha.messages.erroAlterarSenha')
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <Box sx={{ p: 3 }}>
        <PageHeader
          title={t('Redefinir Senha')}
        />

        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
          <Card sx={{ maxWidth: 400, width: '100%' }}>
            <CardContent>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                {t('redefinirSenha.titulo')}
              </Typography>

              <Typography variant="body2" color="text.secondary" paragraph>
                {t('redefinirSenha.descricao')}
              </Typography>

              <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                  fullWidth
                  label={t('redefinirSenha.senha.label')}
                  type="password"
                  margin="normal"
                  error={!!errors.senha}
                  helperText={errors.senha?.message}
                  {...control('senha')}
                />

                <TextField
                  fullWidth
                  label={t('redefinirSenha.confirmarSenha.label')}
                  type="password"
                  margin="normal"
                  error={!!errors.confirmarSenha}
                  helperText={errors.confirmarSenha?.message}
                  {...control('confirmarSenha')}
                />

                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={isLoading}
                  sx={{ mt: 3 }}
                >
                  {t('redefinirSenha.salvar')}
                </Button>

                <Button
                  fullWidth
                  variant="text"
                  color="primary"
                  onClick={() => router.push('/auth/login')}
                  sx={{ mt: 1 }}
                >
                  {t('redefinirSenha.voltar')}
                </Button>
              </form>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Layout>
  );
} 
