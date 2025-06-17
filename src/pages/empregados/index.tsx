/**
 * Arquivo: index.tsx
 * Caminho: src/pages/empregados/index.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Página de listagem de empregados
 */

import { useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { 
  Box, 
  Button, 
  Card, 
  CardContent, 
  Typography,
  Grid,
  IconButton,
  Tooltip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { formatPus } from '@/utils/pus';
import { formatDate } from '@/utils/date';
import { formatCurrency } from '@/utils/currency';
import { useEmpregados } from '@/hooks/useEmpregados';
import { Empregado } from '@/types/empregado';
import { useAuth } from '@/hooks/useAuth';
import { useNotification } from '@/hooks/useNotification';
import { useConfirm } from '@/hooks/useConfirm';
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

export default function EmpregadosPage() {
  const router = useRouter();
  const { t } = useI18n();
  const { user } = useAuth();
  const { showNotification } = useNotification();
  const { confirm } = useConfirm();
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

  const { data: empregados, isLoading, error } = useEmpregados();

  const handleNovo = () => {
    router.push('/empregados/novo');
  };

  const handleEditar = (id: string) => {
    router.push(`/empregados/${id}`);
  };

  const handleExcluir = async (id: string) => {
    const confirmed = await confirm({
      title: t('empregados.excluir.titulo'),
      message: t('empregados.excluir.mensagem'),
      confirmText: t('empregados.excluir.confirmar'),
      cancelText: t('empregados.excluir.cancelar'),
    });

    if (confirmed) {
      try {
        await esocial.deleteEmpregado(id);
        showNotification({
          type: 'success',
          message: t('empregados.excluir.sucesso'),
        });
      } catch (error) {
        showNotification({
          type: 'error',
          message: t('empregados.excluir.erro'),
        });
      }
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography>Carregando...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography color="error">Erro ao carregar empregados</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h4" component="h1">
              {t('empregados.titulo')}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={handleNovo}
            >
              {t('empregados.novo')}
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>{t('empregados.nome')}</TableCell>
                      <TableCell>{t('empregados.cpf')}</TableCell>
                      <TableCell>{t('empregados.cargo')}</TableCell>
                      <TableCell>{t('empregados.remuneracao')}</TableCell>
                      <TableCell>{t('empregados.dataAdmissao')}</TableCell>
                      <TableCell>{t('empregados.acoes')}</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {empregados?.map((empregado: Empregado) => (
                      <TableRow key={empregado.id}>
                        <TableCell>{empregado.nomeCompleto}</TableCell>
                        <TableCell>{formatPus(empregado.cpf)}</TableCell>
                        <TableCell>{empregado.cargo?.descricao}</TableCell>
                        <TableCell>{formatCurrency(empregado.remuneracao)}</TableCell>
                        <TableCell>{formatDate(empregado.dataAdmissao)}</TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            <Tooltip title={t('empregados.editar')}>
                              <IconButton
                                size="small"
                                onClick={() => handleEditar(empregado.id)}
                              >
                                <EditIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title={t('empregados.excluir')}>
                              <IconButton
                                size="small"
                                color="error"
                                onClick={() => handleExcluir(empregado.id)}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
} 
