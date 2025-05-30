import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { EmailVerification } from '../components/EmailVerification';
import { PhoneVerification } from '../components/PhoneVerification';
import { FormInput } from '../components/form/FormInput';
import { FormCEP } from '../components/form/FormCEP';
import { Box, Typography, Paper, Grid, Button, Alert } from '@mui/material';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { messages } from '../utils/messages';

const perfilSchema = z.object({
  name: z.string().min(3, messages.perfil.validacao.nome),
  email: z.string().email(messages.perfil.validacao.email),
  phone: z.string().min(10, messages.perfil.validacao.telefone),
  cep: z.string().min(8, messages.perfil.validacao.cep),
  logradouro: z.string().min(3, messages.perfil.validacao.logradouro),
  numero: z.string().min(1, messages.perfil.validacao.numero),
  complemento: z.string().optional(),
  bairro: z.string().min(2, messages.perfil.validacao.bairro),
  cidade: z.string().min(2, messages.perfil.validacao.cidade),
  estado: z.string().length(2, messages.perfil.validacao.estado),
});

type PerfilFormData = z.infer<typeof perfilSchema>;

export default function PerfilPage() {
  const { user, loading } = useAuth();
  const [showEmailVerification, setShowEmailVerification] = useState(false);
  const [showPhoneVerification, setShowPhoneVerification] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const methods = useForm<PerfilFormData>({
    resolver: zodResolver(perfilSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      cep: user?.cep || '',
      logradouro: user?.logradouro || '',
      numero: user?.numero || '',
      complemento: user?.complemento || '',
      bairro: user?.bairro || '',
      cidade: user?.cidade || '',
      estado: user?.estado || '',
    },
  });

  const onSubmit = async (data: PerfilFormData) => {
    try {
      const response = await fetch('/api/perfil', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(messages.perfil.erro.atualizacao);
      }

      setSuccessMessage(messages.perfil.sucesso.atualizado);
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage(messages.perfil.erro.atualizacao);
      setSuccessMessage(null);
    }
  };

  if (loading) {
    return <Typography>Carregando...</Typography>;
  }

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4, p: 2 }}>
      <Typography variant="h4" color="primary" gutterBottom>
        Meu Perfil
      </Typography>

      {successMessage && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {successMessage}
        </Alert>
      )}

      {errorMessage && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {errorMessage}
        </Alert>
      )}

      <Paper sx={{ p: 3 }}>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormInput
                  name="name"
                  control={methods.control}
                  label="Nome"
                />
              </Grid>

              <Grid item xs={12}>
                <FormInput
                  name="email"
                  control={methods.control}
                  label="Email"
                  disabled={showEmailVerification}
                />
                {!showEmailVerification && (
                  <Button
                    variant="outlined"
                    onClick={() => setShowEmailVerification(true)}
                    sx={{ mt: 1 }}
                  >
                    Verificar Email
                  </Button>
                )}
              </Grid>

              <Grid item xs={12}>
                <FormInput
                  name="phone"
                  control={methods.control}
                  label="Telefone"
                  disabled={showPhoneVerification}
                />
                {!showPhoneVerification && (
                  <Button
                    variant="outlined"
                    onClick={() => setShowPhoneVerification(true)}
                    sx={{ mt: 1 }}
                  >
                    Verificar Celular
                  </Button>
                )}
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Endereço
                </Typography>
              </Grid>

              <Grid item xs={12} sm={4}>
                <FormCEP
                  name="cep"
                  control={methods.control}
                  label="CEP"
                />
              </Grid>

              <Grid item xs={12} sm={8}>
                <FormInput
                  name="logradouro"
                  control={methods.control}
                  label="Logradouro"
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <FormInput
                  name="numero"
                  control={methods.control}
                  label="Número"
                />
              </Grid>

              <Grid item xs={12} sm={8}>
                <FormInput
                  name="complemento"
                  control={methods.control}
                  label="Complemento"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormInput
                  name="bairro"
                  control={methods.control}
                  label="Bairro"
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <FormInput
                  name="cidade"
                  control={methods.control}
                  label="Cidade"
                />
              </Grid>

              <Grid item xs={12} sm={2}>
                <FormInput
                  name="estado"
                  control={methods.control}
                  label="Estado"
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={methods.formState.isSubmitting}
                  fullWidth
                >
                  {methods.formState.isSubmitting ? 'Salvando...' : 'Salvar Alterações'}
                </Button>
              </Grid>
            </Grid>
          </form>
        </FormProvider>
      </Paper>

      {showEmailVerification && (
        <Paper sx={{ p: 3, mt: 3 }}>
          <EmailVerification
            onVerified={() => {
              setShowEmailVerification(false);
              setSuccessMessage(messages.perfil.sucesso.emailVerificado);
            }}
          />
        </Paper>
      )}

      {showPhoneVerification && (
        <Paper sx={{ p: 3, mt: 3 }}>
          <PhoneVerification
            onVerified={() => {
              setShowPhoneVerification(false);
              setSuccessMessage(messages.perfil.sucesso.celularVerificado);
            }}
          />
        </Paper>
      )}
    </Box>
  );
} 