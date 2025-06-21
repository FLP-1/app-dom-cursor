/**
 * Arquivo: TarefaForm.tsx
 * Caminho: src/components/forms/TarefaForm.tsx
 * Criado em: 2025-06-13
 * Última atualização: 2025-06-13
 * Descrição: Formulário para cadastro e edição de tarefas, com campos de título, status, prioridade, responsável e datas.
 */

import React from 'react';
import { Box, Button, Grid, TextField, MenuItem, Tooltip } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { Task, TaskStatus, TaskPriority } from '@/types/task';
import { tooltips } from '@/i18n/tooltips';
import { useTranslation } from 'react-i18next';

export interface TarefaFormProps {
  initialValues?: Partial<Task>;
  onSubmit: (data: Partial<Task>) => void;
  onCancel?: () => void;
  loading?: boolean;
}

const TarefaForm: React.FC<TarefaFormProps> = ({ initialValues = {}, onSubmit, onCancel, loading }) => {
  const { t } = useTranslation();
  const { control, handleSubmit } = useForm<Partial<Task>>({
    defaultValues: {
      title: initialValues.title || '',
      description: initialValues.description || '',
      status: initialValues.status || TaskStatus.PENDING,
      prioridade: initialValues.prioridade || TaskPriority.MEDIA,
      dataVencimento: initialValues.dataVencimento || '',
      observacoes: initialValues.observacoes || '',
    },
  });

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
      <Grid container spacing={2} columns={12}>
        <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
          <Tooltip title={tooltips.tarefaBusca.pt}>
            <span>
              <Controller
                name="title"
                control={control}
                rules={{ required: t('Título obrigatório') as string }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label={t('Título')}
                    fullWidth
                    required
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    aria-label="Título da tarefa"
                  />
                )}
              />
            </span>
          </Tooltip>
        </Grid>
        <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
          <Tooltip title={tooltips.tarefaStatus.pt}>
            <span>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label={t('Status')}
                    fullWidth
                    aria-label="Status da tarefa"
                  >
                    {Object.values(TaskStatus).map(status => (
                      <MenuItem key={status} value={status}>{status}</MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </span>
          </Tooltip>
        </Grid>
        <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
          <Tooltip title={tooltips.tarefaPrioridade.pt}>
            <span>
              <Controller
                name="prioridade"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label={t('Prioridade')}
                    fullWidth
                    aria-label="Prioridade da tarefa"
                  >
                    {Object.values(TaskPriority).map(prio => (
                      <MenuItem key={prio} value={prio}>{prio}</MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </span>
          </Tooltip>
        </Grid>
        <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
          <Tooltip title={tooltips.tarefaResponsavel.pt}>
            <span>
              <Controller
                name="assignedTo"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label={t('Responsável (ID)')}
                    fullWidth
                    aria-label="Responsável pela tarefa"
                  />
                )}
              />
            </span>
          </Tooltip>
        </Grid>
        <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
          <Tooltip title={tooltips.tarefaBusca.pt}>
            <span>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label={t('Descrição')}
                    fullWidth
                    multiline
                    minRows={2}
                    aria-label="Descrição da tarefa"
                  />
                )}
              />
            </span>
          </Tooltip>
        </Grid>
        <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
          <Tooltip title={t('Data de vencimento da tarefa')}>
            <span>
              <Controller
                name="dataVencimento"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label={t('Data de vencimento')}
                    type="date"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    aria-label="Data de vencimento da tarefa"
                  />
                )}
              />
            </span>
          </Tooltip>
        </Grid>
        <Grid gridColumn={{ xs: 'span 12' }}>
          <Tooltip title={t('Observações adicionais sobre a tarefa')}>
            <span>
              <Controller
                name="observacoes"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label={t('Observações')}
                    fullWidth
                    multiline
                    minRows={2}
                    aria-label="Observações da tarefa"
                  />
                )}
              />
            </span>
          </Tooltip>
        </Grid>
        <Grid gridColumn={{ xs: 'span 12' }} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
          {onCancel && (
            <Button onClick={onCancel} color="secondary" variant="outlined" aria-label="Cancelar" disabled={loading}>
              {t('Cancelar')}
            </Button>
          )}
          <Button type="submit" color="primary" variant="contained" aria-label="Salvar tarefa" disabled={loading}>
            {t('Salvar')}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TarefaForm; 
