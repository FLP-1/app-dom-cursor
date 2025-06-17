/**
 * Arquivo: parceiro.tsx
 * Caminho: src/pages/parceiro.tsx
 * Criado em: 2025-06-07
 * Última atualização: 2025-06-07
 * Descrição: Página de cadastro de parceiro, acessível, responsiva e integrada ao formulário padronizado.
 */

import { Container, Typography, Paper } from '@mui/material';
import { ParceiroForm } from '@/components/forms/parceiro/ParceiroForm';

export default function ParceiroPage() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Cadastro de Parceiro
        </Typography>
        <ParceiroForm />
        <Typography variant="body1">Formulário de Parceiro em desenvolvimento.</Typography>
      </Paper>
    </Container>
  );
} 
