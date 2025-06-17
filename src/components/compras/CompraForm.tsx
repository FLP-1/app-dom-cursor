/**
 * Arquivo: CompraForm.tsx
 * Caminho: src/components/compras/CompraForm.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

import React, { useRef } from 'react';
import { useCompraForm } from '@/hooks/forms/useCompraForm';
import { FormInput } from '@/components/forms/inputs/FormInput';
import { FormSelect } from '@/components/forms/inputs/FormSelect';
import Button from '@/components/common/Button';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { control, handleSubmit, onSubmit, loading, registerWithValidation } = useCompraForm();

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)} noValidate aria-label="Formulário de Nova Compra">
      <Box component="h3" sx={{ mt: 0 }}>
        Nova Compra
      </Box>
      <FormInput
        name="produto"
        label="Produto"
        required
        control={control}
        placeholder="Nome do produto"
        autoComplete="off"
      />
      <FormSelect
        name="unidade"
        label="Unidade"
        options={unidades}
        required
        control={control}
      />
      <FormInput
        name="quantidade"
        label="Quantidade"
        type="number"
        required
        control={control}
        inputProps={{ min: 1 }}
        placeholder="Quantidade"
      />
      <FormInput
        name="valor"
        label="Valor (R$)"
        type="number"
        required
        control={control}
        inputProps={{ min: 0, step: 0.01 }}
        placeholder="Valor"
      />
      <FormInput
        name="dataCompra"
        label="Data da Compra"
        type="date"
        required
        control={control}
        InputLabelProps={{ shrink: true }}
        {...registerWithValidation('dataCompra')}
      />
      <FormSelect
        name="grupo"
        label="Grupo de Compra"
        options={grupos}
        required
        control={control}
      />
      <FormInput
        name="foto"
        label="Foto do Produto"
        type="file"
        control={control}
        inputRef={fileInputRef}
        inputProps={{ accept: 'image/*' }}
      />
      <Actions>
        <Button type="button" variant="secondary" onClick={() => window.history.back()}>
          Cancelar
        </Button>
        <Button type="submit" variant="primary" disabled={loading}>
          {loading ? 'Salvando...' : 'Salvar'}
        </Button>
      </Actions>
    </FormContainer>
  );
};

export default CompraForm; 
