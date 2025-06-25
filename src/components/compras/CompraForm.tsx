/**
 * Arquivo: CompraForm.tsx
 * Caminho: src/components/compras/CompraForm.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-01-27
 * Descrição: Formulário para cadastro de novas compras
 */

import React, { useRef } from 'react';
import { useCompraForm } from '@/hooks/forms/useCompraForm';
import { FormInput } from '@/components/forms/inputs/FormInput';
import { FormSelect } from '@/components/forms/inputs/FormSelect';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { useMessages } from '@/hooks/useMessages';
import { comprasMessages } from '@/i18n/messages/compras.messages';

const unidades = [
  { value: 'Pacote', label: 'Pacote' },
  { value: 'Litro', label: 'Litro' },
  { value: 'Unidade', label: 'Unidade' },
  { value: 'Kg', label: 'Kg' },
  { value: 'Caixa', label: 'Caixa' },
];

const grupos = [
  { value: 'Família A', label: 'Família A' },
  { value: 'Família B', label: 'Família B' },
];

const FormContainer = styled('form')(({ theme }) => ({
  background: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
}));

const Actions = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: theme.spacing(2),
  marginTop: theme.spacing(2),
}));

const CompraForm: React.FC = () => {
  const { messages } = useMessages(comprasMessages);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { control, handleSubmit, onSubmit, loading, registerWithValidation } = useCompraForm();

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)} noValidate aria-label={messages.form.ariaLabel}>
      <Box component="h3" sx={{ mt: 0 }}>
        {messages.form.title}
      </Box>
      <FormInput
        name="produto"
        label={messages.form.fields.produto.label}
        required
        control={control}
        placeholder={messages.form.fields.produto.placeholder}
        autoComplete="off"
      />
      <FormSelect
        name="unidade"
        label={messages.form.fields.unidade.label}
        options={unidades}
        required
        control={control}
      />
      <FormInput
        name="quantidade"
        label={messages.form.fields.quantidade.label}
        type="number"
        required
        control={control}
        inputProps={{ min: 1 }}
        placeholder={messages.form.fields.quantidade.placeholder}
      />
      <FormInput
        name="valor"
        label={messages.form.fields.valor.label}
        type="number"
        required
        control={control}
        inputProps={{ min: 0, step: 0.01 }}
        placeholder={messages.form.fields.valor.placeholder}
      />
      <FormInput
        name="dataCompra"
        label={messages.form.fields.dataCompra.label}
        type="date"
        required
        control={control}
        InputLabelProps={{ shrink: true }}
        {...registerWithValidation('dataCompra')}
      />
      <FormSelect
        name="grupo"
        label={messages.form.fields.grupo.label}
        options={grupos}
        required
        control={control}
      />
      <FormInput
        name="foto"
        label={messages.form.fields.foto.label}
        type="file"
        control={control}
        inputRef={fileInputRef}
        inputProps={{ accept: 'image/*' }}
      />
      <Actions>
        <Button type="button" variant="secondary" onClick={() => window.history.back()}>
          {messages.form.buttons.cancel}
        </Button>
        <Button type="submit" variant="primary" disabled={loading}>
          {loading ? messages.form.buttons.saving : messages.form.buttons.save}
        </Button>
      </Actions>
    </FormContainer>
  );
};

export default CompraForm; 
