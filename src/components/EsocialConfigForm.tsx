/**
 * Arquivo: EsocialConfigForm.tsx
 * Caminho: src/components/EsocialConfigForm.tsx
 * Criado em: 2025-06-13
 * Última atualização: 2025-06-13
 * Descrição: Formulário de configuração do eSocial, incluindo dados do empregador, certificado digital e alertas.
 */

import React from 'react';
import { Box, Button, Grid, TextField, MenuItem, InputLabel, FormControl, FormHelperText, Chip, Typography, Alert, Tooltip } from '@mui/material';
import { Controller, useFieldArray, Control, SubmitHandler, UseFormHandleSubmit } from 'react-hook-form';
import { EsocialConfigFormValues, CertificadoAtual, LogAlteracao } from '@/hooks/useEsocialConfig';
import { tooltips } from '@/i18n/tooltips';

interface EsocialConfigFormProps {
  control: Control<EsocialConfigFormValues>;
  handleSubmit: UseFormHandleSubmit<EsocialConfigFormValues>;
  onSubmit: (data: EsocialConfigFormValues) => void;
  loading: boolean;
  initialValues: EsocialConfigFormValues;
  certificadoAtual: CertificadoAtual | null;
  statusCertificado: string;
  alertasRecentes: { tipo: string; mensagem: string; data: string }[];
  permissoes: { podeEditar: boolean };
  historicoAlteracoes: LogAlteracao[];
}

const EsocialConfigForm: React.FC<EsocialConfigFormProps> = ({
  control,
  handleSubmit,
  onSubmit,
  loading,
  initialValues,
  certificadoAtual,
  statusCertificado,
  alertasRecentes,
  permissoes,
  historicoAlteracoes,
}) => {
  const { fields, append, remove } = useFieldArray({ control, name: 'emailsNotificacao' });
  const disabled = !permissoes.podeEditar || loading;

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <Grid container spacing={2} columns={12}>
        <Grid gridColumn="span 12">
          <Controller
            name="cnpj"
            control={control}
            render={({ field, fieldState }) => (
              <TextField {...field} label="CNPJ" fullWidth required error={!!fieldState.error} helperText={fieldState.error?.message} />
            )}
          />
        </Grid>
        <Grid gridColumn="span 12">
          <Controller
            name="razaoSocial"
            control={control}
            render={({ field, fieldState }) => (
              <TextField {...field} label="Razão Social" fullWidth required error={!!fieldState.error} helperText={fieldState.error?.message} />
            )}
          />
        </Grid>
        <Grid gridColumn="span 12">
          <Controller
            name="endereco"
            control={control}
            render={({ field, fieldState }) => (
              <TextField {...field} label="Endereço" fullWidth required error={!!fieldState.error} helperText={fieldState.error?.message} />
            )}
          />
        </Grid>
        <Grid gridColumn="span 12">
          <Controller
            name="emailContato"
            control={control}
            render={({ field, fieldState }) => (
              <TextField {...field} label="E-mail de Contato" type="email" fullWidth required error={!!fieldState.error} helperText={fieldState.error?.message} />
            )}
          />
        </Grid>
        <Grid gridColumn="span 12">
          <Controller
            name="ambiente"
            control={control}
            render={({ field }) => (
              <TextField {...field} select label="Ambiente" fullWidth required>
                <MenuItem value="homologacao">Homologação</MenuItem>
                <MenuItem value="producao">Produção</MenuItem>
              </TextField>
            )}
          />
        </Grid>
        <Grid gridColumn="span 12">
          <Controller
            name="certificado"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth>
                <InputLabel shrink htmlFor="certificado-upload">Certificado Digital</InputLabel>
                <Tooltip title={tooltips.certificadoDigital?.pt || 'Selecione o arquivo do certificado digital'} arrow>
                  <span>
                    <input
                      id="certificado-upload"
                      type="file"
                      accept=".pfx,.pem,.crt"
                      onChange={e => field.onChange(e.target.files ? e.target.files[0] : null)}
                      sx={{ mt: 1 }}
                      placeholder="Selecione o arquivo do certificado digital"
                    />
                  </span>
                </Tooltip>
                <FormHelperText>{field.value ? (typeof field.value === 'string' ? field.value : field.value.name) : 'Selecione o arquivo do certificado digital'}</FormHelperText>
              </FormControl>
            )}
          />
        </Grid>
        <Grid gridColumn="span 12">
          <Controller
            name="urlWebservice"
            control={control}
            render={({ field, fieldState }) => (
              <TextField {...field} label="URL do Webservice" fullWidth required error={!!fieldState.error} helperText={fieldState.error?.message} />
            )}
          />
        </Grid>
        <Grid gridColumn="span 12">
          <Controller
            name="timeout"
            control={control}
            render={({ field, fieldState }) => (
              <TextField {...field} label="Timeout (segundos)" type="number" fullWidth required error={!!fieldState.error} helperText={fieldState.error?.message} />
            )}
          />
        </Grid>
        <Grid gridColumn="span 12">
          <Controller
            name="emailsNotificacao"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth>
                <InputLabel shrink htmlFor="emails-notificacao">E-mails para Notificação de Alertas</InputLabel>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                  {field.value && field.value.map((email: string, idx: number) => (
                    <Chip
                      key={idx}
                      label={email}
                      onDelete={disabled ? undefined : () => {
                        const newArr = [...field.value];
                        newArr.splice(idx, 1);
                        field.onChange(newArr);
                      }}
                      color="primary"
                      aria-label={`Remover e-mail ${email}`}
                    />
                  ))}
                </Box>
                <TextField
                  id="emails-notificacao"
                  type="email"
                  label="Adicionar e-mail"
                  size="small"
                  fullWidth
                  disabled={disabled}
                  onKeyDown={e => {
                    if (e.key === 'Enter' && e.currentTarget.value) {
                      e.preventDefault();
                      if (!field.value.includes(e.currentTarget.value)) {
                        field.onChange([...(field.value || []), e.currentTarget.value]);
                        e.currentTarget.value = '';
                      }
                    }
                  }}
                  aria-label="Adicionar e-mail para notificação"
                  placeholder="Digite e pressione Enter"
                  sx={{ mt: 1 }}
                />
                <FormHelperText>Receberá alertas de expiração de certificado, falhas de envio, etc.</FormHelperText>
              </FormControl>
            )}
          />
        </Grid>
        <Grid gridColumn="span 12">
          <Typography variant="subtitle2" sx={{ mb: 0.5 }}>Status do Certificado:</Typography>
          <Chip
            label={statusCertificado.charAt(0).toUpperCase() + statusCertificado.slice(1)}
            color={statusCertificado === 'válido' ? 'success' : statusCertificado === 'expirado' ? 'error' : 'warning'}
            aria-label="Status do certificado digital"
          />
        </Grid>
        <Grid gridColumn="span 12">
          <Typography variant="subtitle2" sx={{ mb: 0.5 }}>Certificado Atual:</Typography>
          {certificadoAtual ? (
            <Typography variant="body2">{certificadoAtual.nome} (Válido até {certificadoAtual.validade})</Typography>
          ) : (
            <Typography variant="body2" color="text.secondary">Nenhum certificado cadastrado</Typography>
          )}
        </Grid>
        <Grid gridColumn="span 12">
          <Typography variant="subtitle2" sx={{ mb: 0.5 }}>Alertas Recentes:</Typography>
          {alertasRecentes.length === 0 ? (
            <Typography variant="body2" color="text.secondary">Nenhum alerta recente</Typography>
          ) : (
            alertasRecentes.map((a, idx) => (
              <Alert key={idx} severity={a.tipo === 'falha_envio' ? 'error' : 'warning'} sx={{ mb: 1 }}>
                {a.mensagem} <span sx={{ color: '#888', fontSize: 12 }}>({a.data})</span>
              </Alert>
            ))
          )}
        </Grid>
        <Grid gridColumn="span 12">
          <Typography variant="subtitle2" sx={{ mb: 0.5 }}>Histórico de Alterações:</Typography>
          {historicoAlteracoes.length === 0 ? (
            <Typography variant="body2" color="text.secondary">Nenhuma alteração registrada</Typography>
          ) : (
            historicoAlteracoes.map((h, idx) => (
              <Typography key={idx} variant="body2">
                {h.data} - {h.usuario}: {h.acao}
              </Typography>
            ))
          )}
        </Grid>
        <Grid>
          <Button type="submit" variant="contained" color="primary" fullWidth disabled={disabled} aria-label="Salvar configuração">
            {loading ? 'Salvando...' : 'Salvar Configuração'}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EsocialConfigForm; 
