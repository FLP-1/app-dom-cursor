/**
 * Arquivo: OperacaoFinanceiraForm.tsx
 * Caminho: src/components/operacoes-financeiras/OperacaoFinanceiraForm.tsx
 * Criado em: 2025-06-13
 * Última atualização: 2025-01-27
 * Descrição: Componente de formulário para operações financeiras
 */

import React from 'react';
import { Box, Typography } from '@mui/material';
import { useMessages } from '@/hooks/useMessages';
import { financeiroMessages } from '@/i18n/messages/financeiro.messages';

interface OperacaoFinanceiraFormProps {
  // Props do componente
}

export function OperacaoFinanceiraForm(props: OperacaoFinanceiraFormProps) {
  const { messages } = useMessages(financeiroMessages);
  
  return (
    <Box>
      <Typography variant="h6">{messages.form.title}</Typography>
      {/* Implementação do formulário */}
    </Box>
  );
}

export default OperacaoFinanceiraForm; 
