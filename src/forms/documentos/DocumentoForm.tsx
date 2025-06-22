/**
 * Arquivo: DocumentoForm.tsx
 * Caminho: src/forms/documentos/DocumentoForm.tsx
 * Criado em: 2024-01-15
 * Última atualização: 2025-01-27
 * Descrição: Formulário para cadastro e edição de documentos
 */

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { 
  TextField, 
  Button, 
  Grid, 
  MenuItem, 
  FormControl, 
  InputLabel, 
  Select,
  Box,
  Typography,
  FormControlLabel,
  Checkbox
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useMessages } from '@/hooks/useMessages';
import { documentosMessages } from '@/i18n/messages/documentos.messages';

interface DocumentoFormData {
  titulo: string;
  tipo: string;
  categoria: string;
  dataCriacao: Date;
  dataVencimento: Date;
  descricao: string;
  tags: string;
  publico: boolean;
  observacoes: string;
}

interface DocumentoFormProps {
  onSubmit: (data: DocumentoFormData) => void;
  initialData?: Partial<DocumentoFormData>;
  isLoading?: boolean;
}

export const DocumentoForm: React.FC<DocumentoFormProps> = ({
  onSubmit,
  initialData,
  isLoading = false
}) => {
  const { messages } = useMessages(documentosMessages);
  
  const { control, handleSubmit, formState: { errors } } = useForm<DocumentoFormData>({
    defaultValues: {
      titulo: '',
      tipo: '',
      categoria: '',
      dataCriacao: new Date(),
      dataVencimento: new Date(),
      descricao: '',
      tags: '',
      publico: false,
      observacoes: '',
      ...initialData
    }
  });

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        {messages.form.title}
      </Typography>
      
      <Grid container columns={12} spacing={2}>
        <Grid gridColumn={{ xs: 'span 12', sm: 'span 8' }}>
          <Controller
            name="titulo"
            control={control}
            rules={{ 
              required: messages.validation.titulo.required,
              minLength: { value: 3, message: messages.validation.titulo.minLength }
            }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label={messages.form.fields.titulo.label}
                placeholder={messages.form.fields.titulo.placeholder}
                error={!!errors.titulo}
                helperText={errors.titulo?.message}
              />
            )}
          />
        </Grid>

        <Grid gridColumn={{ xs: 'span 12', sm: 'span 4' }}>
          <Controller
            name="tipo"
            control={control}
            rules={{ required: messages.validation.tipo.required }}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.tipo}>
                <InputLabel>{messages.form.fields.tipo.label}</InputLabel>
                <Select {...field} label={messages.form.fields.tipo.label}>
                  <MenuItem value="contrato">{messages.form.fields.tipo.options.contrato}</MenuItem>
                  <MenuItem value="relatorio">{messages.form.fields.tipo.options.relatorio}</MenuItem>
                  <MenuItem value="planilha">{messages.form.fields.tipo.options.planilha}</MenuItem>
                  <MenuItem value="apresentacao">{messages.form.fields.tipo.options.apresentacao}</MenuItem>
                  <MenuItem value="manual">{messages.form.fields.tipo.options.manual}</MenuItem>
                  <MenuItem value="outro">{messages.form.fields.tipo.options.outro}</MenuItem>
                </Select>
              </FormControl>
            )}
          />
        </Grid>

        <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
          <Controller
            name="categoria"
            control={control}
            rules={{ required: messages.validation.categoria.required }}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.categoria}>
                <InputLabel>{messages.form.fields.categoria.label}</InputLabel>
                <Select {...field} label={messages.form.fields.categoria.label}>
                  <MenuItem value="rh">{messages.form.fields.categoria.options.rh}</MenuItem>
                  <MenuItem value="financeiro">{messages.form.fields.categoria.options.financeiro}</MenuItem>
                  <MenuItem value="operacional">{messages.form.fields.categoria.options.operacional}</MenuItem>
                  <MenuItem value="legal">{messages.form.fields.categoria.options.legal}</MenuItem>
                  <MenuItem value="tecnico">{messages.form.fields.categoria.options.tecnico}</MenuItem>
                  <MenuItem value="outro">{messages.form.fields.categoria.options.outro}</MenuItem>
                </Select>
              </FormControl>
            )}
          />
        </Grid>

        <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
          <Controller
            name="dataCriacao"
            control={control}
            rules={{ required: messages.validation.dataCriacao.required }}
            render={({ field }) => (
              <DatePicker
                {...field}
                label={messages.form.fields.dataCriacao.label}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: !!errors.dataCriacao,
                    helperText: errors.dataCriacao?.message
                  }
                }}
              />
            )}
          />
        </Grid>

        <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
          <Controller
            name="dataVencimento"
            control={control}
            render={({ field }) => (
              <DatePicker
                {...field}
                label={messages.form.fields.dataVencimento.label}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: !!errors.dataVencimento,
                    helperText: errors.dataVencimento?.message
                  }
                }}
              />
            )}
          />
        </Grid>

        <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
          <Controller
            name="tags"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label={messages.form.fields.tags.label}
                placeholder={messages.form.fields.tags.placeholder}
                error={!!errors.tags}
                helperText={errors.tags?.message}
              />
            )}
          />
        </Grid>

        <Grid gridColumn={{ xs: 'span 12' }}>
          <Controller
            name="descricao"
            control={control}
            rules={{ 
              required: messages.validation.descricao.required,
              minLength: { value: 10, message: messages.validation.descricao.minLength }
            }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                multiline
                rows={3}
                label={messages.form.fields.descricao.label}
                placeholder={messages.form.fields.descricao.placeholder}
                error={!!errors.descricao}
                helperText={errors.descricao?.message}
              />
            )}
          />
        </Grid>

        <Grid gridColumn={{ xs: 'span 12' }}>
          <Controller
            name="observacoes"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                multiline
                rows={2}
                label={messages.form.fields.observacoes.label}
                placeholder={messages.form.fields.observacoes.placeholder}
                error={!!errors.observacoes}
                helperText={errors.observacoes?.message}
              />
            )}
          />
        </Grid>

        <Grid gridColumn={{ xs: 'span 12' }}>
          <Controller
            name="publico"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                  />
                }
                label={messages.form.fields.publico.label}
              />
            )}
          />
        </Grid>

        <Grid gridColumn={{ xs: 'span 12' }}>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
            <Button
              type="submit"
              variant="contained"
              disabled={isLoading}
              sx={{ minWidth: 120 }}
            >
              {isLoading ? messages.form.buttons.saving : messages.form.buttons.save}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}; 