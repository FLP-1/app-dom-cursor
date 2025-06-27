/**
 * Arquivo: login.tsx
 * Caminho: src/pages/auth/login.tsx
 * Criado em: 2025-01-27
 * Última atualização: 2025-01-27
 * Descrição: Página de login do sistema DOM, conectada ao hook useLoginForm.
 */

import React, { useState } from 'react';
import { Card, CardContent, Button, Typography, Box, IconButton, InputAdornment, CircularProgress, TextField, Checkbox, FormControlLabel, Link as MuiLink } from '@mui/material';
import { Visibility, VisibilityOff, Lock, Person } from '@mui/icons-material';
import { useLoginForm } from '@/hooks/forms/useLoginForm';
import { Controller } from 'react-hook-form';
import { useLanguage } from '@/contexts/LanguageContext';
import { authMessages } from '@/i18n/messages/auth.messages';
import { useRouter } from 'next/router';
import FormCPFInput from '@/components/forms/inputs/FormCPFInput';

const carouselTexts = [
  'O DOM da gestão doméstica.',
  'Seu lar, sua gestão, nosso DOM.',
  'Nosso DOM ajudando o seu dom.'
];

const LoginScreen = () => {
  const { t } = useLanguage();
  const { form, onSubmit, isLoading } = useLoginForm({ mode: 'onChange' });
  const { control, formState: { errors, isValid } } = form;
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [termsChecked, setTermsChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  // Carrossel simples
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % carouselTexts.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  // Função para obter mensagens traduzidas
  const getMessage = (key: string) => t(key, authMessages);

  const isFormValid = isValid && termsChecked;

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2, fontFamily: 'Roboto, Arial, sans-serif' }}>
      <Card sx={{ maxWidth: 400, width: '100%', borderRadius: 3, boxShadow: '0 20px 40px rgba(0,0,0,0.1)', backdropFilter: 'blur(10px)', background: 'rgba(255,255,255,0.95)' }}>
        <CardContent sx={{ p: 4 }}>
          {/* Logo */}
          <Box textAlign="center" mb={3}>
            <img src="/logo.png" alt="Logo DOM" style={{ width: 90, height: 90, margin: '0 auto 1px', display: 'block' }} />
            <Typography variant="h4" fontWeight="bold" color="primary">DOM</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ minHeight: 24 }}>{carouselTexts[carouselIndex]}</Typography>
          </Box>

          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Box>
              <FormCPFInput
                name="cpf"
                control={control}
                required
                label={getMessage('labels.cpf')}
                error={!!errors.cpf}
                helperText={errors.cpf?.message}
              />
              <Box display="flex" justifyContent="flex-end" mb={2}>
                <MuiLink href="/recuperar-senha" underline="hover" fontSize={14} sx={{ fontSize: '0.95rem' }}>
                  {getMessage('labels.esqueciSenha')}
                </MuiLink>
              </Box>

              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label={getMessage('labels.senha')}
                    type={showPassword ? 'text' : 'password'}
                    variant="outlined"
                    sx={{ mb: 2 }}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock color="primary" />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            tabIndex={-1}
                            edge="end"
                            onClick={() => setShowPassword((v) => !v)}
                            aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                      sx: { borderRadius: 2 }
                    }}
                  />
                )}
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={termsChecked}
                    onChange={e => setTermsChecked(e.target.checked)}
                    required
                    color="primary"
                  />
                }
                label={<span style={{ fontSize: '0.95rem' }}>Li e concordo com os <MuiLink href="/termos-de-uso" target="_blank" rel="noopener" underline="always" sx={{ fontSize: '0.95rem' }}>Termos de Uso</MuiLink> e <MuiLink href="/politica-de-privacidade" target="_blank" rel="noopener" underline="always" sx={{ fontSize: '0.95rem' }}>Políticas de Privacidade</MuiLink></span>}
                sx={{ mb: 2, alignItems: 'flex-start' }}
              />

              <Button type="submit" fullWidth variant="contained" size="large" disabled={isLoading || !isFormValid} sx={{ borderRadius: 2, py: 1.5, background: 'linear-gradient(45deg, #667eea, #764ba2)', '&:hover': { background: 'linear-gradient(45deg, #5a6fd8, #6b42a0)' }, mb: 3 }}>
                {isLoading ? <CircularProgress size={24} color="inherit" /> : getMessage('labels.entrar')}
              </Button>

              <Box display="flex" justifyContent="center" alignItems="center" mb={1}>
                <MuiLink href="/cadastro" underline="hover" fontSize={18} sx={{ fontWeight: 600, fontSize: '1.1rem' }}>
                  Cadastre-se! Desbloqueie seu DOM
                </MuiLink>
              </Box>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default LoginScreen;
