/**
 * Arquivo: DocumentoForm.tsx
 * Caminho: src/components/documentos/DocumentoForm.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Formulário para cadastro e edição de documentos, com validação e upload de arquivo.
 */

import React, { useState } from 'react';
import { Box, Button, Grid, TextField, MenuItem, Tooltip } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { DocumentFormData, TipoDocumento } from '@/types/document';
import { tooltips } from '@/i18n/tooltips';
import { useTranslation } from 'react-i18next';

export interface DocumentoFormProps {
  initialValues?: Partial<DocumentFormData>;
  onSubmit: (data: DocumentFormData) => void;
  onCancel?: () => void;
  loading?: boolean;
}

export const DocumentoForm: React.FC<DocumentoFormProps> = ({ initialValues = {}, onSubmit, onCancel, loading }) => {
  const { t } = useTranslation();
  const { control, handleSubmit, setValue } = useForm<DocumentFormData>({
    defaultValues: {
      tipo: initialValues.tipo || TipoDocumento.OUTROS,
      nome: initialValues.nome || '',
      descricao: initialValues.descricao || '',
      empregadoDomesticoId: initialValues.empregadoDomesticoId || '',
      esocialEventId: initialValues.esocialEventId || '',
      arquivo: undefined as any,
    },
  });
  const [file, setFile] = useState<File | null>(null);

  return (
    <Box component="form" onSubmit={handleSubmit((data) => onSubmit({ ...data, arquivo: file! }))} sx={{ mt: 2 }}>
      <Grid container spacing={2} columns={12}>
        <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
          <Tooltip title={tooltips.documentoTipo?.pt || 'Selecione o tipo de documento.'}>
            <span>
              <Controller
                name="tipo"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label={t('Tipo de documento')}
                    fullWidth
                    aria-label="Tipo de documento"
                  >
                    {Object.values(TipoDocumento).map(tipo => (
                      <MenuItem key={tipo} value={tipo}>{tipo}</MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </span>
          </Tooltip>
        </Grid>
        <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
          <Tooltip title={tooltips.documentoNome?.pt || 'Nome do documento.'}>
            <span>
              <Controller
                name="nome"
                control={control}
                rules={{ required: t('Nome obrigatório') as string }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label={t('Nome')}
                    fullWidth
                    required
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    aria-label="Nome do documento"
                  />
                )}
              />
            </span>
          </Tooltip>
        </Grid>
        <Grid gridColumn={{ xs: 'span 12' }}>
          <Tooltip title={tooltips.documentoDescricao?.pt || 'Descrição do documento.'}>
            <span>
              <Controller
                name="descricao"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label={t('Descrição')}
                    fullWidth
                    multiline
                    minRows={2}
                    aria-label="Descrição do documento"
                  />
                )}
              />
            </span>
          </Tooltip>
        </Grid>
        <Grid gridColumn={{ xs: 'span 12' }}>
          <Tooltip title={tooltips.documentoArquivo?.pt || 'Selecione o arquivo do documento.'}>
            <span>
              <Box sx={{ mt: 1 }}>
                <input
                  type="file"
                  accept="application/pdf,image/*"
                  onChange={e => {
                    setFile(e.target.files?.[0] || null);
                    setValue('arquivo', e.target.files?.[0] as any);
                  }}
                  aria-label="Arquivo do documento"
                  required
                />
              </Box>
            </span>
          </Tooltip>
        </Grid>
        {/* Campos extras: empregadoDomesticoId, esocialEventId podem ser select/autocomplete se necessário */}
        <Grid gridColumn={{ xs: 'span 12' }} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
          {onCancel && (
            <Button onClick={onCancel} color="secondary" variant="outlined" aria-label="Cancelar" disabled={loading}>
              {t('Cancelar')}
            </Button>
          )}
          <Button type="submit" color="primary" variant="contained" aria-label="Salvar documento" disabled={loading}>
            {t('Salvar')}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}; 
