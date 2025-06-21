/**
 * Arquivo: novo.tsx
 * Caminho: src/pages/empregados/novo.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Página de cadastro de novo empregado
 */

import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  Box, 
  Button, 
  Card, 
  CardContent, 
  Typography,
  Grid,
  TextField,
  MenuItem
} from '@mui/material';
import { useEmpregados } from '@/hooks/useEmpregados';
import { useAuth } from '@/hooks/useAuth';
import { useNotification } from '@/hooks/useNotification';
import { useTranslation } from 'next-i18next';
import { empregadoFormSchema } from '@/components/forms/empregado/EmpregadoFormTypes';
import { EmpregadoFormData } from '@/types/empregado';

export default function NovoEmpregadoPage() {
  const router = useRouter();
  const { t } = useTranslation();
  const { user } = useAuth();
  const { showNotification } = useNotification();

  const { register, handleSubmit, formState: { errors } } = useForm<EmpregadoFormData>({
    resolver: zodResolver(empregadoFormSchema)
  });

  const onSubmit = async (data: EmpregadoFormData) => {
    try {
      // Implemente a lógica para criar um novo empregado
      showNotification({
        type: 'success',
        message: t('empregados.criar.sucesso'),
      });
      router.push('/empregados');
    } catch (error) {
      showNotification({
        type: 'error',
        message: t('empregados.criar.erro'),
      });
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4" component="h1" gutterBottom>
            {t('empregados.novo.titulo')}
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

                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label={t('empregados.cargo')}
                      select
                      {...register('cargoId')}
                      error={!!errors.cargoId}
                      helperText={errors.cargoId?.message}
                    >
                      <MenuItem value="1">Doméstico</MenuItem>
                      <MenuItem value="2">Cozinheira</MenuItem>
                      <MenuItem value="3">Babá</MenuItem>
                      <MenuItem value="4">Motorista</MenuItem>
                      <MenuItem value="5">Jardineiro</MenuItem>
                    </TextField>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label={t('empregados.remuneracao')}
                      type="number"
                      {...register('remuneracao')}
                      error={!!errors.remuneracao}
                      helperText={errors.remuneracao?.message}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label={t('empregados.dataAdmissao')}
                      type="date"
                      InputLabelProps={{ shrink: true }}
                      {...register('dataAdmissao')}
                      error={!!errors.dataAdmissao}
                      helperText={errors.dataAdmissao?.message}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                      <Button
                        variant="outlined"
                        onClick={() => router.push('/empregados')}
                      >
                        {t('empregados.cancelar')}
                      </Button>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                      >
                        {t('empregados.salvar')}
                      </Button>
                    </Box>
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
