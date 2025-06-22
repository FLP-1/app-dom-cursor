/**
 * Arquivo: ParceiroForm.tsx
 * Caminho: src/forms/parceiro/ParceiroForm.tsx
 * Criado em: 2024-01-15
 * Última atualização: 2025-01-27
 * Descrição: Formulário para cadastro e edição de parceiros
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
import { useMessages } from '@/hooks/useMessages';
import { parceiroMessages } from '@/i18n/messages/parceiro.messages';

interface ParceiroFormData {
  nome: string;
  cnpj: string;
  razaoSocial: string;
  tipo: string;
  telefone: string;
  email: string;
  endereco: string;
  cidade: string;
  estado: string;
  cep: string;
  ativo: boolean;
  observacoes: string;
}

interface ParceiroFormProps {
  onSubmit: (data: ParceiroFormData) => void;
  initialData?: Partial<ParceiroFormData>;
  isLoading?: boolean;
}

export const ParceiroForm: React.FC<ParceiroFormProps> = ({
  onSubmit,
  initialData,
  isLoading = false
}) => {
  const { messages } = useMessages(parceiroMessages);
  
  const { control, handleSubmit, formState: { errors } } = useForm<ParceiroFormData>({
    defaultValues: {
      nome: '',
      cnpj: '',
      razaoSocial: '',
      tipo: '',
      telefone: '',
      email: '',
      endereco: '',
      cidade: '',
      estado: '',
      cep: '',
      ativo: true,
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
            name="cnpj"
            control={control}
            rules={{ 
              required: messages.validation.cnpj.required,
              pattern: { value: /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, message: messages.validation.cnpj.format }
            }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label={messages.form.fields.cnpj.label}
                placeholder={messages.form.fields.cnpj.placeholder}
                error={!!errors.cnpj}
                helperText={errors.cnpj?.message}
              />
            )}
          />
        </Grid>

        <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
          <Controller
            name="razaoSocial"
            control={control}
            rules={{ 
              required: messages.validation.razaoSocial.required,
              minLength: { value: 3, message: messages.validation.razaoSocial.minLength }
            }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label={messages.form.fields.razaoSocial.label}
                placeholder={messages.form.fields.razaoSocial.placeholder}
                error={!!errors.razaoSocial}
                helperText={errors.razaoSocial?.message}
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
                  <MenuItem value="fornecedor">{messages.form.fields.tipo.options.fornecedor}</MenuItem>
                  <MenuItem value="cliente">{messages.form.fields.tipo.options.cliente}</MenuItem>
                  <MenuItem value="prestador">{messages.form.fields.tipo.options.prestador}</MenuItem>
                  <MenuItem value="parceiro">{messages.form.fields.tipo.options.parceiro}</MenuItem>
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
                label={messages.form.fields.endereco.label}
                placeholder={messages.form.fields.endereco.placeholder}
                error={!!errors.endereco}
                helperText={errors.endereco?.message}
              />
            )}
          />
        </Grid>

        <Grid gridColumn={{ xs: 'span 12', sm: 'span 4' }}>
          <Controller
            name="cidade"
            control={control}
            rules={{ required: messages.validation.cidade.required }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label={messages.form.fields.cidade.label}
                placeholder={messages.form.fields.cidade.placeholder}
                error={!!errors.cidade}
                helperText={errors.cidade?.message}
              />
            )}
          />
        </Grid>

        <Grid gridColumn={{ xs: 'span 12', sm: 'span 4' }}>
          <Controller
            name="estado"
            control={control}
            rules={{ required: messages.validation.estado.required }}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.estado}>
                <InputLabel>{messages.form.fields.estado.label}</InputLabel>
                <Select {...field} label={messages.form.fields.estado.label}>
                  <MenuItem value="AC">{messages.form.fields.estado.options.AC}</MenuItem>
                  <MenuItem value="AL">{messages.form.fields.estado.options.AL}</MenuItem>
                  <MenuItem value="AP">{messages.form.fields.estado.options.AP}</MenuItem>
                  <MenuItem value="AM">{messages.form.fields.estado.options.AM}</MenuItem>
                  <MenuItem value="BA">{messages.form.fields.estado.options.BA}</MenuItem>
                  <MenuItem value="CE">{messages.form.fields.estado.options.CE}</MenuItem>
                  <MenuItem value="DF">{messages.form.fields.estado.options.DF}</MenuItem>
                  <MenuItem value="ES">{messages.form.fields.estado.options.ES}</MenuItem>
                  <MenuItem value="GO">{messages.form.fields.estado.options.GO}</MenuItem>
                  <MenuItem value="MA">{messages.form.fields.estado.options.MA}</MenuItem>
                  <MenuItem value="MT">{messages.form.fields.estado.options.MT}</MenuItem>
                  <MenuItem value="MS">{messages.form.fields.estado.options.MS}</MenuItem>
                  <MenuItem value="MG">{messages.form.fields.estado.options.MG}</MenuItem>
                  <MenuItem value="PA">{messages.form.fields.estado.options.PA}</MenuItem>
                  <MenuItem value="PB">{messages.form.fields.estado.options.PB}</MenuItem>
                  <MenuItem value="PR">{messages.form.fields.estado.options.PR}</MenuItem>
                  <MenuItem value="PE">{messages.form.fields.estado.options.PE}</MenuItem>
                  <MenuItem value="PI">{messages.form.fields.estado.options.PI}</MenuItem>
                  <MenuItem value="RJ">{messages.form.fields.estado.options.RJ}</MenuItem>
                  <MenuItem value="RN">{messages.form.fields.estado.options.RN}</MenuItem>
                  <MenuItem value="RS">{messages.form.fields.estado.options.RS}</MenuItem>
                  <MenuItem value="RO">{messages.form.fields.estado.options.RO}</MenuItem>
                  <MenuItem value="RR">{messages.form.fields.estado.options.RR}</MenuItem>
                  <MenuItem value="SC">{messages.form.fields.estado.options.SC}</MenuItem>
                  <MenuItem value="SP">{messages.form.fields.estado.options.SP}</MenuItem>
                  <MenuItem value="SE">{messages.form.fields.estado.options.SE}</MenuItem>
                  <MenuItem value="TO">{messages.form.fields.estado.options.TO}</MenuItem>
                </Select>
              </FormControl>
            )}
          />
        </Grid>

        <Grid gridColumn={{ xs: 'span 12', sm: 'span 4' }}>
          <Controller
            name="cep"
            control={control}
            rules={{ 
              required: messages.validation.cep.required,
              pattern: { value: /^\d{5}-\d{3}$/, message: messages.validation.cep.format }
            }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label={messages.form.fields.cep.label}
                placeholder={messages.form.fields.cep.placeholder}
                error={!!errors.cep}
                helperText={errors.cep?.message}
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
          <Controller
            name="ativo"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                  />
                }
                label={messages.form.fields.ativo.label}
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