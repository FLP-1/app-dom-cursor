/**
 * Arquivo: empregado.tsx
 * Caminho: src/pages/empregado.tsx
 * Criado em: 2025-06-07
 * Última atualização: 2025-01-27
 * Descrição: Página de cadastro de empregado, acessível, responsiva e integrada ao formulário padronizado.
 */

import { Container, Typography, Paper } from '@mui/material';
import { EmpregadoForm } from '@/components/forms/empregado/EmpregadoForm';
import { useMessages } from '@/hooks/useMessages';
import { empregadoMessages } from '@/i18n/messages/empregado.messages';

export default function EmpregadoPage() {
  const { messages } = useMessages(empregadoMessages);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {messages.page.title}
        </Typography>
        <EmpregadoForm />
        <Typography variant="body1">{messages.page.development}</Typography>
      </Paper>
    </Container>
  );
} 
