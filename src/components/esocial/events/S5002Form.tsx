/**
 * Arquivo: S5002Form.tsx
 * Caminho: src/components/esocial/events/S5002Form.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

import React from 'react';
import { Grid, Button, Paper } from '@mui/material';
import { FormInput } from '@/components/form';
import { useS5002Form } from '@/hooks/esocial/useS5002Form';
import { S5002Schema } from '@/schemas/esocial/S5002Schema';
import { tooltips } from '@/constants/tooltips';

export const S5002Form: React.FC<{ initialData?: Partial<typeof S5002Schema._type> }> = ({ initialData }) => {
  const { methods, onSubmit } = useS5002Form(initialData);

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
              tooltip={tooltips.s5002_campoExemplo.pt}
            />
          </Grid>
          {/* TODO: Adicionar os demais campos do evento S-5002 conforme layout oficial */}
          
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
