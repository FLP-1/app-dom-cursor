/**
 * Arquivo: index.tsx
 * Caminho: src/pages/cadastro/index.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Página de cadastro
 */

import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, TextField, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { useCadastroForm } from '@/hooks/useCadastroForm';
import { useNotification } from '@/hooks/useNotification';
import { PageHeader } from '@/components/common/PageHeader';
import { FormData } from '@/types/forms';
import { Layout } from '@/components/layout/Layout';
import { Controller } from 'react-hook-form';

interface CadastroData extends FormData {
  nome: string;
  email: string;
  senha: string;
  confirmarSenha: string;
}

export default function CadastroPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const { showNotification } = useNotification();
  const { control, handleSubmit, formState: { errors } } = useCadastroForm();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: CadastroData) => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/cadastro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Erro ao realizar cadastro');
      }

      showNotification({
        type: 'success',
        message: t('cadastro.messages.cadastroRealizado')
      });
      router.push('/auth/login');
    } catch (error) {
      showNotification({
        type: 'error',
        message: t('cadastro.messages.erroCadastro')
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <Box sx={{ p: 3 }}>
        <PageHeader
          title={t('Cadastro')}
        />

        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
          <Card sx={{ maxWidth: 400, width: '100%' }}>
            <CardContent>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                {t('cadastro.titulo')}
              </Typography>

              <Typography variant="body2" color="text.secondary" paragraph>
                {t('cadastro.descricao')}
              </Typography>

              <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                  name="nome"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label={t('cadastro.nome.label')}
                      margin="normal"
                      error={!!errors.nome}
                      helperText={errors.nome?.message}
                    />
                  )}
                />

                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label={t('cadastro.email.label')}
                      type="email"
                      margin="normal"
                      error={!!errors.email}
                      helperText={errors.email?.message}
                    />
                  )}
                />

                <Controller
                  name="senha"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label={t('cadastro.senha.label')}
                      type="password"
                      margin="normal"
                      error={!!errors.senha}
                      helperText={errors.senha?.message}
                    />
                  )}
                />

                <Controller
                  name="confirmarSenha"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label={t('cadastro.confirmarSenha.label')}
                      type="password"
                      margin="normal"
                      error={!!errors.confirmarSenha}
                      helperText={errors.confirmarSenha?.message}
                    />
                  )}
                />

                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={isLoading}
                  sx={{ mt: 3 }}
                >
                  {t('cadastro.cadastrar')}
                </Button>

                <Button
                  fullWidth
                  variant="text"
                  color="primary"
                  onClick={() => router.push('/auth/login')}
                  sx={{ mt: 1 }}
                >
                  {t('cadastro.voltar')}
                </Button>
              </form>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Layout>
  );
} 
