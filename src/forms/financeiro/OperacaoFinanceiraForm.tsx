/**
 * Arquivo: OperacaoFinanceiraForm.tsx
 * Caminho: src/forms/financeiro/OperacaoFinanceiraForm.tsx
 * Criado em: 2024-01-15
 * Última atualização: 2025-01-27
 * Descrição: Formulário para cadastro e edição de operações financeiras
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
import { useMessages } from '@/hooks/useMessages';
import { financeiroMessages } from '@/i18n/messages/financeiro.messages';

interface OperacaoFinanceiraFormData {
  tipo: string;
  valor: number;
  data: Date;
  descricao: string;
  categoria: string;
  status: string;
}

interface OperacaoFinanceiraFormProps {
  onSubmit: (data: OperacaoFinanceiraFormData) => void;
  initialData?: Partial<OperacaoFinanceiraFormData>;
  isLoading?: boolean;
}

export const OperacaoFinanceiraForm: React.FC<OperacaoFinanceiraFormProps> = ({
  onSubmit,
  initialData,
  isLoading = false
}) => {
  const { messages } = useMessages(financeiroMessages);
  
  const { control, handleSubmit, formState: { errors } } = useForm<OperacaoFinanceiraFormData>({
    defaultValues: {
      tipo: '',
      valor: 0,
      data: new Date(),
      descricao: '',
      categoria: '',
      status: 'pendente',
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
            name="tipo"
            control={control}
            rules={{ required: messages.validation.tipo.required }}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.tipo}>
                <InputLabel>{messages.form.fields.tipo.label}</InputLabel>
                <Select {...field} label={messages.form.fields.tipo.label}>
                  <MenuItem value="receita">{messages.form.fields.tipo.options.receita}</MenuItem>
                  <MenuItem value="despesa">{messages.form.fields.tipo.options.despesa}</MenuItem>
                </Select>
              </FormControl>
            )}
          />
        </Grid>

        <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
          <Controller
            name="valor"
            control={control}
            rules={{ 
              required: messages.validation.valor.required,
              min: { value: 0.01, message: messages.validation.valor.min }
            }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                type="number"
                label={messages.form.fields.valor.label}
                placeholder={messages.form.fields.valor.placeholder}
                error={!!errors.valor}
                helperText={errors.valor?.message}
                inputProps={{ step: 0.01, min: 0 }}
              />
            )}
          />
        </Grid>

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
            name="categoria"
            control={control}
            rules={{ required: messages.validation.categoria.required }}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.categoria}>
                <InputLabel>{messages.form.fields.categoria.label}</InputLabel>
                <Select {...field} label={messages.form.fields.categoria.label}>
                  <MenuItem value="salario">{messages.form.fields.categoria.options.salario}</MenuItem>
                  <MenuItem value="beneficios">{messages.form.fields.categoria.options.beneficios}</MenuItem>
                  <MenuItem value="impostos">{messages.form.fields.categoria.options.impostos}</MenuItem>
                  <MenuItem value="outros">{messages.form.fields.categoria.options.outros}</MenuItem>
                </Select>
              </FormControl>
            )}
          />
        </Grid>

        <Grid gridColumn={{ xs: 'span 12' }}>
          <Controller
            name="descricao"
            control={control}
            rules={{ 
              required: messages.validation.descricao.required,
              minLength: { value: 3, message: messages.validation.descricao.minLength }
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
            name="status"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth>
                <InputLabel>{messages.form.fields.status.label}</InputLabel>
                <Select {...field} label={messages.form.fields.status.label}>
                  <MenuItem value="pendente">{messages.form.fields.status.options.pendente}</MenuItem>
                  <MenuItem value="aprovado">{messages.form.fields.status.options.aprovado}</MenuItem>
                  <MenuItem value="rejeitado">{messages.form.fields.status.options.rejeitado}</MenuItem>
                  <MenuItem value="concluido">{messages.form.fields.status.options.concluido}</MenuItem>
                </Select>
              </FormControl>
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