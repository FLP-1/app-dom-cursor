/**
 * Arquivo: FamiliarForm.tsx
 * Caminho: src/forms/familiar/FamiliarForm.tsx
 * Criado em: 2024-01-15
 * Última atualização: 2025-01-27
 * Descrição: Formulário para cadastro e edição de familiares
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
import { familiarMessages } from '@/i18n/messages/familiar.messages';

interface FamiliarFormData {
  nome: string;
  cpf: string;
  dataNascimento: Date;
  parentesco: string;
  dependente: boolean;
  telefone: string;
  email: string;
  endereco: string;
}

interface FamiliarFormProps {
  onSubmit: (data: FamiliarFormData) => void;
  initialData?: Partial<FamiliarFormData>;
  isLoading?: boolean;
}

export const FamiliarForm: React.FC<FamiliarFormProps> = ({
  onSubmit,
  initialData,
  isLoading = false
}) => {
  const { messages } = useMessages(familiarMessages);
  
  const { control, handleSubmit, formState: { errors } } = useForm<FamiliarFormData>({
    defaultValues: {
      nome: '',
      cpf: '',
      dataNascimento: new Date(),
      parentesco: '',
      dependente: false,
      telefone: '',
      email: '',
      endereco: '',
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
            name="nome"
            control={control}
            rules={{ 
              required: messages.validation.nome.required,
              minLength: { value: 2, message: messages.validation.nome.minLength }
            }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label={messages.form.fields.nome.label}
                placeholder={messages.form.fields.nome.placeholder}
                error={!!errors.nome}
                helperText={errors.nome?.message}
              />
            )}
          />
        </Grid>

        <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
          <Controller
            name="cpf"
            control={control}
            rules={{ 
              required: messages.validation.cpf.required,
              pattern: { value: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/, message: messages.validation.cpf.format }
            }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label={messages.form.fields.cpf.label}
                placeholder={messages.form.fields.cpf.placeholder}
                error={!!errors.cpf}
                helperText={errors.cpf?.message}
              />
            )}
          />
        </Grid>

        <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
          <Controller
            name="dataNascimento"
            control={control}
            rules={{ required: messages.validation.dataNascimento.required }}
            render={({ field }) => (
              <DatePicker
                {...field}
                label={messages.form.fields.dataNascimento.label}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: !!errors.dataNascimento,
                    helperText: errors.dataNascimento?.message
                  }
                }}
              />
            )}
          />
        </Grid>

        <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
          <Controller
            name="parentesco"
            control={control}
            rules={{ required: messages.validation.parentesco.required }}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.parentesco}>
                <InputLabel>{messages.form.fields.parentesco.label}</InputLabel>
                <Select {...field} label={messages.form.fields.parentesco.label}>
                  <MenuItem value="conjuge">{messages.form.fields.parentesco.options.conjuge}</MenuItem>
                  <MenuItem value="filho">{messages.form.fields.parentesco.options.filho}</MenuItem>
                  <MenuItem value="pai">{messages.form.fields.parentesco.options.pai}</MenuItem>
                  <MenuItem value="mae">{messages.form.fields.parentesco.options.mae}</MenuItem>
                  <MenuItem value="irmao">{messages.form.fields.parentesco.options.irmao}</MenuItem>
                  <MenuItem value="outro">{messages.form.fields.parentesco.options.outro}</MenuItem>
                </Select>
              </FormControl>
            )}
          />
        </Grid>

        <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
          <Controller
            name="telefone"
            control={control}
            rules={{ 
              required: messages.validation.telefone.required,
              pattern: { value: /^\(\d{2}\) \d{4,5}-\d{4}$/, message: messages.validation.telefone.format }
            }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label={messages.form.fields.telefone.label}
                placeholder={messages.form.fields.telefone.placeholder}
                error={!!errors.telefone}
                helperText={errors.telefone?.message}
              />
            )}
          />
        </Grid>

        <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
          <Controller
            name="email"
            control={control}
            rules={{ 
              required: messages.validation.email.required,
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: messages.validation.email.format }
            }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                type="email"
                label={messages.form.fields.email.label}
                placeholder={messages.form.fields.email.placeholder}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            )}
          />
        </Grid>

        <Grid gridColumn={{ xs: 'span 12' }}>
          <Controller
            name="endereco"
            control={control}
            rules={{ 
              required: messages.validation.endereco.required,
              minLength: { value: 10, message: messages.validation.endereco.minLength }
            }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                multiline
                rows={2}
                label={messages.form.fields.endereco.label}
                placeholder={messages.form.fields.endereco.placeholder}
                error={!!errors.endereco}
                helperText={errors.endereco?.message}
              />
            )}
          />
        </Grid>

        <Grid gridColumn={{ xs: 'span 12' }}>
          <Controller
            name="dependente"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                  />
                }
                label={messages.form.fields.dependente.label}
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