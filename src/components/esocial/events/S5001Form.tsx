/**
 * Arquivo: S5001Form.tsx
 * Caminho: src/components/esocial/events/S5001Form.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-01-27
 * Descrição: Componente de formulário S5001 com mensagens centralizadas
 */

import React from 'react';
import { Grid, Button, Paper } from '@mui/material';
import { FormInput } from '@/components/forms/inputs/FormInput';
import { FormDatePicker } from '@/components/forms/inputs/FormDatePicker';
import { FormSelect } from '@/components/forms/inputs/FormSelect';
import { FormMoneyInput } from '@/components/forms/inputs/FormMoneyInput';
import { FormTextArea } from '@/components/forms/inputs/FormTextArea';
import { useS5001Form } from '@/hooks/esocial/useS5001Form';
import { S5001Schema } from '@/schemas/esocial/S5001Schema';
import { tooltips } from '@/i18n/tooltips';
import { interfaceMessages } from '@/i18n/messages/interface.messages';
import { useLanguage } from '@/hooks/useLanguage';

export const S5001Form: React.FC<{ initialData?: Partial<typeof S5001Schema._type> }> = ({ initialData }) => {
  const { methods, onSubmit } = useS5001Form(initialData);
  const { language } = useLanguage();
  const messages = interfaceMessages[language].common;

  return (
    <form onSubmit={onSubmit}>
      <Paper sx={{ p: 3 }}>
        <Grid container spacing={3} columns={12}>
          <Grid gridColumn={{ xs: 'span 12' }}>
            <FormInput
              name="campoExemplo"
              label={messages.exampleField}
              control={methods.control}
              required
              tooltip={tooltips.s5001_campoExemplo[language]}
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
