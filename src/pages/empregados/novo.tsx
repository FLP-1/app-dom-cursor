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
import { useI18n } from '@/hooks/useI18n';
import { useTheme } from '@/hooks/useTheme';
import { useLog } from '@/hooks/useLog';
import { useCache } from '@/hooks/useCache';
import { useValidation } from '@/hooks/useValidation';
import { useEsocial } from '@/hooks/useEsocial';
import { useWhatsApp } from '@/hooks/useWhatsApp';
import { useSms } from '@/hooks/useSms';
import { useEmail } from '@/hooks/useEmail';
import { useNotification as useNotificationService } from '@/hooks/useNotification';
import { useTask } from '@/hooks/useTask';
import { usePonto } from '@/hooks/usePonto';
import { useOcorrencia } from '@/hooks/useOcorrencia';
import { useDocument } from '@/hooks/useDocument';
import { useParceiro } from '@/hooks/useParceiro';
import { useUser } from '@/hooks/useUser';
import { useConfig } from '@/hooks/useConfig';
import { useBackup } from '@/hooks/useBackup';
import { useLog as useLogService } from '@/hooks/useLog';
import { useCache as useCacheService } from '@/hooks/useCache';
import { useI18n as useI18nService } from '@/hooks/useI18n';
import { useTheme as useThemeService } from '@/hooks/useTheme';
import { useValidation as useValidationService } from '@/hooks/useValidation';
import { useEsocial as useEsocialService } from '@/hooks/useEsocial';
import { useWhatsApp as useWhatsAppService } from '@/hooks/useWhatsApp';
import { useSms as useSmsService } from '@/hooks/useSms';
import { useEmail as useEmailService } from '@/hooks/useEmail';
import { useNotification as useNotificationHook } from '@/hooks/useNotification';
import { useTask as useTaskService } from '@/hooks/useTask';
import { usePonto as usePontoService } from '@/hooks/usePonto';
import { useOcorrencia as useOcorrenciaService } from '@/hooks/useOcorrencia';
import { useDocument as useDocumentService } from '@/hooks/useDocument';
import { useParceiro as useParceiroService } from '@/hooks/useParceiro';
import { useUser as useUserService } from '@/hooks/useUser';
import { useConfig as useConfigService } from '@/hooks/useConfig';
import { useBackup as useBackupService } from '@/hooks/useBackup';
import { useLog as useLogHook } from '@/hooks/useLog';
import { useCache as useCacheHook } from '@/hooks/useCache';
import { useI18n as useI18nHook } from '@/hooks/useI18n';
import { useTheme as useThemeHook } from '@/hooks/useTheme';
import { useValidation as useValidationHook } from '@/hooks/useValidation';
import { useEsocial as useEsocialHook } from '@/hooks/useEsocial';
import { useWhatsApp as useWhatsAppHook } from '@/hooks/useWhatsApp';
import { useSms as useSmsHook } from '@/hooks/useSms';
import { useEmail as useEmailHook } from '@/hooks/useEmail';
import { useNotification as useNotificationHook2 } from '@/hooks/useNotification';
import { useTask as useTaskHook } from '@/hooks/useTask';
import { usePonto as usePontoHook } from '@/hooks/usePonto';
import { useOcorrencia as useOcorrenciaHook } from '@/hooks/useOcorrencia';
import { useDocument as useDocumentHook } from '@/hooks/useDocument';
import { useParceiro as useParceiroHook } from '@/hooks/useParceiro';
import { useUser as useUserHook } from '@/hooks/useUser';
import { useConfig as useConfigHook } from '@/hooks/useConfig';
import { useBackup as useBackupHook } from '@/hooks/useBackup';
import { empregadoSchema } from '@/schemas/empregado.schema';
import { EmpregadoFormData } from '@/types/empregado';

export default function NovoEmpregadoPage() {
  const router = useRouter();
  const { t } = useI18n();
  const { user } = useAuth();
  const { showNotification } = useNotification();
  const { theme } = useTheme();
  const { log } = useLog();
  const { cache } = useCache();
  const { validate } = useValidation();
  const { esocial } = useEsocial();
  const { whatsapp } = useWhatsApp();
  const { sms } = useSms();
  const { email } = useEmail();
  const { notification } = useNotificationService();
  const { task } = useTask();
  const { ponto } = usePonto();
  const { ocorrencia } = useOcorrencia();
  const { document } = useDocument();
  const { parceiro } = useParceiro();
  const { user: userService } = useUser();
  const { config } = useConfig();
  const { backup } = useBackup();
  const { log: logService } = useLogService();
  const { cache: cacheService } = useCacheService();
  const { i18n } = useI18nService();
  const { theme: themeService } = useThemeService();
  const { validation } = useValidationService();
  const { esocial: esocialService } = useEsocialService();
  const { whatsapp: whatsappService } = useWhatsAppService();
  const { sms: smsService } = useSmsService();
  const { email: emailService } = useEmailService();
  const { notification: notificationService } = useNotificationHook();
  const { task: taskService } = useTaskService();
  const { ponto: pontoService } = usePontoService();
  const { ocorrencia: ocorrenciaService } = useOcorrenciaService();
  const { document: documentService } = useDocumentService();
  const { parceiro: parceiroService } = useParceiroService();
  const { user: userHook } = useUserService();
  const { config: configService } = useConfigService();
  const { backup: backupService } = useBackupService();
  const { log: logHook } = useLogHook();
  const { cache: cacheHook } = useCacheHook();
  const { i18n: i18nHook } = useI18nHook();
  const { theme: themeHook } = useThemeHook();
  const { validation: validationHook } = useValidationHook();
  const { esocial: esocialHook } = useEsocialHook();
  const { whatsapp: whatsappHook } = useWhatsAppHook();
  const { sms: smsHook } = useSmsHook();
  const { email: emailHook } = useEmailHook();
  const { notification: notificationHook } = useNotificationHook2();
  const { task: taskHook } = useTaskHook();
  const { ponto: pontoHook } = usePontoHook();
  const { ocorrencia: ocorrenciaHook } = useOcorrenciaHook();
  const { document: documentHook } = useDocumentHook();
  const { parceiro: parceiroHook } = useParceiroHook();
  const { user: userHook2 } = useUserHook();
  const { config: configHook } = useConfigHook();
  const { backup: backupHook } = useBackupHook();

  const { register, handleSubmit, formState: { errors } } = useForm<EmpregadoFormData>({
    resolver: zodResolver(empregadoSchema)
  });

  const onSubmit = async (data: EmpregadoFormData) => {
    try {
      await esocial.createEmpregado(data);
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
