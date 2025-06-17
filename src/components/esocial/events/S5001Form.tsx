/**
 * Arquivo: S5001Form.tsx
 * Caminho: src/components/esocial/events/S5001Form.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

import React from 'react';
import { Grid, Button, Paper } from '@mui/material';
import { FormInput } from '@/components/form';
import { useS5001Form } from '@/hooks/esocial/useS5001Form';
import { S5001Schema } from '@/schemas/esocial/S5001Schema';
import { tooltips } from '@/constants/tooltips';

export const S5001Form: React.FC<{ initialData?: Partial<typeof S5001Schema._type> }> = ({ initialData }) => {
  const { methods, onSubmit } = useS5001Form(initialData);

  return (
    <form onSubmit={onSubmit}>
      <Paper sx={{ p: 3 }}>
        <Grid container spacing={3} columns={12}>
          <Grid gridColumn={{ xs: 'span 12' }}>
            <FormInput
              name="campoExemplo"
              label="Campo Exemplo"
              control={methods.control}
              required
              tooltip={tooltips.s5001_campoExemplo.pt}
            />
          </Grid>
          {/* TODO: Adicionar os demais campos do evento S-5001 conforme layout oficial */}
          
          <Grid gridColumn={{ xs: 'span 12' }}>
            <Button type="submit" variant="contained">
              Salvar
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </form>
  );
}; 
