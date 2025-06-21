/**
 * Arquivo: [id].tsx
 * Caminho: src/pages/empregados/[id].tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Página de edição de empregado
 */

import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Card, CardContent, Typography, Grid, TextField, MenuItem } from '@mui/material';
import { useEmpregados } from '@/hooks/useEmpregados';
import { useAuth } from '@/hooks/useAuth';
import { useNotification } from '@/hooks/useNotification';
import { useTranslation } from 'next-i18next';
import { empregadoFormSchema } from '@/components/forms/empregado/EmpregadoFormTypes';
import { EmpregadoFormData } from '@/types/empregado';

export default function EditarEmpregadoPage() {
  const router = useRouter();
  const { id } = router.query;
  const { t } = useTranslation();
  const { user } = useAuth();
  const { showNotification } = useNotification();
  const { data: empregado, isLoading } = useEmpregados(id as string);

  const { register, handleSubmit, formState: { errors } } = useForm<EmpregadoFormData>({
    resolver: zodResolver(empregadoFormSchema),
    defaultValues: empregado
  });

  const onSubmit = async (data: EmpregadoFormData) => {
    try {
      // Aqui você pode chamar a função de update do empregado
      showNotification({
        type: 'success',
        message: t('empregados.atualizar.sucesso'),
      });
      router.push('/empregados');
    } catch (error) {
      showNotification({
        type: 'error',
        message: t('empregados.atualizar.erro'),
      });
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography>Carregando...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4" component="h1" gutterBottom>
            {t('empregados.editar.titulo')}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label={t('empregados.nome')}
                      {...register('nomeCompleto')}
                      error={!!errors.nomeCompleto}
                      helperText={errors.nomeCompleto?.message}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label={t('empregados.cpf')}
                      {...register('cpf')}
                      error={!!errors.cpf}
                      helperText={errors.cpf?.message}
                    />
                  </Grid>
                  {/* Adicione outros campos conforme necessário */}
                  <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary">
                      {t('empregados.editar.salvar')}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
} 