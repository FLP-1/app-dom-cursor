/**
 * Arquivo: familiar.tsx
 * Caminho: src/pages/familiar.tsx
 * Criado em: 2025-06-07
 * Última atualização: 2025-06-07
 * Descrição: Página de cadastro de familiar, acessível, responsiva e integrada ao formulário padronizado.
 */

import { Container, Typography, Paper } from '@mui/material';
import { FamiliarForm } from '@/components/forms/familiar/FamiliarForm';

export default function FamiliarPage() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Cadastro de Familiar
        </Typography>
        <FamiliarForm />
      </Paper>
    </Container>
  );
} 
