/**
 * Arquivo: login.tsx
 * Caminho: src/pages/auth/login.tsx
 * Criado em: 2025-01-27
 * Última atualização: 2025-01-27
 * Descrição: Página de login do sistema DOM, conectada ao hook useLoginForm.
 */

import { Card, CardContent, Button, Typography, Box, IconButton, InputAdornment, Avatar, Chip, CircularProgress, TextField } from '@mui/material';
import { Visibility, VisibilityOff, Email, Lock, Home, Business, Person, FamilyRestroom } from '@mui/icons-material';
import { useLoginForm } from '@/hooks/forms/useLoginForm';
import { Controller } from 'react-hook-form';
import { useMessages } from '@/hooks/useMessages';
import { authMessages } from '@/i18n/messages/auth.messages';

const LoginScreen = () => {
  const { messages } = useMessages(authMessages);
  const { form, onSubmit, isLoading } = useLoginForm();
  const { control, formState: { errors } } = form;

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}>
      <Card sx={{ maxWidth: 400, width: '100%', borderRadius: 3, boxShadow: '0 20px 40px rgba(0,0,0,0.1)', backdropFilter: 'blur(10px)', background: 'rgba(255,255,255,0.95)' }}>
        <CardContent sx={{ p: 4 }}>
          {/* Logo */}
          <Box textAlign="center" mb={3}>
            <Avatar sx={{ width: 80, height: 80, mx: 'auto', mb: 2, background: 'linear-gradient(45deg, #667eea, #764ba2)' }}>
              <Home sx={{ fontSize: 40, color: 'white' }} />
            </Avatar>
            <Typography variant="h4" fontWeight="bold" color="primary">{messages.login.title}</Typography>
            <Typography variant="body2" color="text.secondary">{messages.login.subtitle}</Typography>
          </Box>

          <form onSubmit={onSubmit}>
            {/* Seletor de Perfil */}
            <Box mb={3}>
              <Typography variant="subtitle2" mb={1}>{messages.login.profileSelector.label}</Typography>
              <Controller
                name="profile"
                control={control}
                render={({ field }) => (
                  <Box display="flex" gap={1} flexWrap="wrap">
                    <Chip icon={<Business />} label={messages.login.profileSelector.employer} clickable onClick={() => field.onChange('empregador')} variant={field.value === 'empregador' ? 'filled' : 'outlined'} color={field.value === 'empregador' ? 'primary' : 'default'} sx={{ borderRadius: 2 }} />
                    <Chip icon={<Person />} label={messages.login.profileSelector.employee} clickable onClick={() => field.onChange('empregado')} variant={field.value === 'empregado' ? 'filled' : 'outlined'} color={field.value === 'empregado' ? 'primary' : 'default'} sx={{ borderRadius: 2 }} />
                    <Chip icon={<FamilyRestroom />} label={messages.login.profileSelector.family} clickable onClick={() => field.onChange('familiar')} variant={field.value === 'familiar' ? 'filled' : 'outlined'} color={field.value === 'familiar' ? 'primary' : 'default'} sx={{ borderRadius: 2 }} />
                  </Box>
                )}
              />
            </Box>

            {/* Formulário */}
            <Box>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField {...field} fullWidth label={messages.login.fields.email} variant="outlined" sx={{ mb: 2 }} error={!!errors.email} helperText={errors.email?.message} InputProps={{ startAdornment: (<InputAdornment position="start"><Email color="primary" /></InputAdornment>), sx: { borderRadius: 2 } }} />
                )}
              />
              
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <TextField {...field} fullWidth label={messages.login.fields.password} type="password" variant="outlined" sx={{ mb: 3 }} error={!!errors.password} helperText={errors.password?.message} InputProps={{ startAdornment: (<InputAdornment position="start"><Lock color="primary" /></InputAdornment>), endAdornment: (<InputAdornment position="end"><IconButton><Visibility /></IconButton></InputAdornment>), sx: { borderRadius: 2 } }} />
                )}
              />

              <Button type="submit" fullWidth variant="contained" size="large" disabled={isLoading} sx={{ borderRadius: 2, py: 1.5, background: 'linear-gradient(45deg, #667eea, #764ba2)', '&:hover': { background: 'linear-gradient(45deg, #5a6fd8, #6b42a0)' } }}>
                {isLoading ? <CircularProgress size={24} color="inherit" /> : messages.login.submit}
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default LoginScreen;
