/**
 * Arquivo: index.tsx
 * Caminho: src/pages/recuperar-senha/index.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-25
 * Descrição: Página de recuperação de senha com layout padronizado igual ao login.
 */

import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, Button, CircularProgress, Link as MuiLink } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { useSenhaForm } from '@/hooks/forms/useSenhaForm';
import { useNotification } from '@/hooks/useNotification';
import FormCPFInput from '@/components/forms/inputs/FormCPFInput';

export default function RecuperarSenhaPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const { showNotification } = useNotification();
  const { control, handleSubmit, formState: { errors, isValid } } = useSenhaForm();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: { cpf: string }) => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/recuperar-senha', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Erro ao enviar e-mail de recuperação');
      showNotification({ type: 'success', message: t('recuperarSenha.messages.emailEnviado', 'E-mail enviado com sucesso!') });
      router.push('/auth/login');
    } catch (error) {
      showNotification({ type: 'error', message: t('recuperarSenha.messages.erroEnviarEmail', 'Erro ao enviar e-mail de recuperação') });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2, fontFamily: 'Roboto, Arial, sans-serif' }}>
      <Card sx={{ maxWidth: 400, width: '100%', borderRadius: 3, boxShadow: '0 20px 40px rgba(0,0,0,0.1)', backdropFilter: 'blur(10px)', background: 'rgba(255,255,255,0.95)' }}>
        <CardContent sx={{ p: 4 }}>
          <Box textAlign="center" mb={3}>
            <img src="/logo.png" alt="Logo DOM" style={{ width: 80, height: 80, margin: '0 auto 16px', display: 'block' }} />
            <Typography variant="h4" fontWeight="bold" color="primary">DOM</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ minHeight: 24 }}>
              {t('recuperarSenha.titulo', 'Recupere o acesso à sua conta')}
            </Typography>
          </Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormCPFInput
              name="cpf"
              control={control}
              required
              label={t('recuperarSenha.cpf.label', 'CPF')}
              error={!!errors.cpf}
              helperText={errors.cpf?.message}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={isLoading || !isValid}
              sx={{ borderRadius: 2, py: 1.5, background: 'linear-gradient(45deg, #667eea, #764ba2)', '&:hover': { background: 'linear-gradient(45deg, #5a6fd8, #6b42a0)' }, mb: 2 }}
            >
              {isLoading ? <CircularProgress size={24} color="inherit" /> : t('recuperarSenha.enviar', 'Enviar')}
            </Button>
            <Box display="flex" justifyContent="center" alignItems="center" mb={1}>
              <MuiLink href="/auth/login" underline="hover" fontSize={16} sx={{ fontWeight: 600, fontSize: '1.05rem' }}>
                {t('recuperarSenha.voltar', 'Voltar para o login')}
              </MuiLink>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
} 
