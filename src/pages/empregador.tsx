/**
 * Arquivo: empregador.tsx
 * Caminho: src/pages/empregador.tsx
 * Criado em: 2025-06-07
 * Última atualização: 2025-01-27
 * Descrição: Página de cadastro de empregador, acessível, responsiva e integrada ao formulário padronizado.
 */

import { Container, Typography, Paper } from '@mui/material';
import { EmpregadorForm } from '@/components/forms/empregador/EmpregadorForm';
import { useMessages } from '@/hooks/useMessages';
import { empregadorMessages } from '@/i18n/messages/empregador.messages';

export default function EmpregadorPage() {
  const { messages } = useMessages(empregadorMessages);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {messages.page.title}
        </Typography>
        <EmpregadorForm />
        <Typography variant="body1">{messages.page.development}</Typography>
      </Paper>
    </Container>
  );
} 
