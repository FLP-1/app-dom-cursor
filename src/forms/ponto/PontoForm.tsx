/**
 * Arquivo: PontoForm.tsx
 * Caminho: src/forms/ponto/PontoForm.tsx
 * Criado em: 2024-01-15
 * Última atualização: 2025-01-27
 * Descrição: Formulário para cadastro e edição de registros de ponto
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
  Typography
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { useMessages } from '@/hooks/useMessages';
import { pontoMessages } from '@/i18n/messages/ponto.messages';

interface PontoFormData {
  data: Date;
  entrada: Date;
  saidaAlmoco: Date;
  retornoAlmoco: Date;
  saida: Date;
  tipo: string;
  observacoes: string;
}

interface PontoFormProps {
  onSubmit: (data: PontoFormData) => void;
  initialData?: Partial<PontoFormData>;
  isLoading?: boolean;
}

export const PontoForm: React.FC<PontoFormProps> = ({
  onSubmit,
  initialData,
  isLoading = false
}) => {
  const { messages } = useMessages(pontoMessages);
  
  const { control, handleSubmit, formState: { errors } } = useForm<PontoFormData>({
    defaultValues: {
      data: new Date(),
      entrada: new Date(),
      saidaAlmoco: new Date(),
      retornoAlmoco: new Date(),
      saida: new Date(),
      tipo: 'normal',
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
        <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
          <Controller
            name="data"
            control={control}
            rules={{ required: messages.validation.data.required }}
            render={({ field }) => (
              <DatePicker
                {...field}
                label={messages.form.fields.data.label}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: !!errors.data,
                    helperText: errors.data?.message
                  }
                }}
              />
            )}
          />
        </Grid>

        <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
          <Controller
            name="tipo"
            control={control}
            rules={{ required: messages.validation.tipo.required }}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.tipo}>
                <InputLabel>{messages.form.fields.tipo.label}</InputLabel>
                <Select {...field} label={messages.form.fields.tipo.label}>
                  <MenuItem value="normal">{messages.form.fields.tipo.options.normal}</MenuItem>
                  <MenuItem value="feriado">{messages.form.fields.tipo.options.feriado}</MenuItem>
                  <MenuItem value="folga">{messages.form.fields.tipo.options.folga}</MenuItem>
                  <MenuItem value="ferias">{messages.form.fields.tipo.options.ferias}</MenuItem>
                  <MenuItem value="licenca">{messages.form.fields.tipo.options.licenca}</MenuItem>
                </Select>
              </FormControl>
            )}
          />
        </Grid>

        <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
          <Controller
            name="entrada"
            control={control}
            rules={{ required: messages.validation.entrada.required }}
            render={({ field }) => (
              <TimePicker
                {...field}
                label={messages.form.fields.entrada.label}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: !!errors.entrada,
                    helperText: errors.entrada?.message
                  }
                }}
              />
            )}
          />
        </Grid>

        <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
          <Controller
            name="saidaAlmoco"
            control={control}
            render={({ field }) => (
              <TimePicker
                {...field}
                label={messages.form.fields.saidaAlmoco.label}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: !!errors.saidaAlmoco,
                    helperText: errors.saidaAlmoco?.message
                  }
                }}
              />
            )}
          />
        </Grid>

        <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
          <Controller
            name="retornoAlmoco"
            control={control}
            render={({ field }) => (
              <TimePicker
                {...field}
                label={messages.form.fields.retornoAlmoco.label}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: !!errors.retornoAlmoco,
                    helperText: errors.retornoAlmoco?.message
                  }
                }}
              />
            )}
          />
        </Grid>

        <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
          <Controller
            name="saida"
            control={control}
            rules={{ required: messages.validation.saida.required }}
            render={({ field }) => (
              <TimePicker
                {...field}
                label={messages.form.fields.saida.label}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: !!errors.saida,
                    helperText: errors.saida?.message
                  }
                }}
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
                rows={3}
                label={messages.form.fields.observacoes.label}
                placeholder={messages.form.fields.observacoes.placeholder}
                error={!!errors.observacoes}
                helperText={errors.observacoes?.message}
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