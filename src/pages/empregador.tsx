/**
 * Arquivo: empregador.tsx
 * Caminho: src/pages/empregador.tsx
 * Criado em: 2025-06-07
 * Última atualização: 2025-06-07
 * Descrição: Página de cadastro de empregador, acessível, responsiva e integrada ao formulário padronizado.
 */

import { Container, Typography, Paper } from '@mui/material';
import { EmpregadorForm } from '@/components/forms/empregador/EmpregadorForm';

export default function EmpregadorPage() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Cadastro de Empregador
        </Typography>
        <EmpregadorForm />
        <Typography variant="body1">Formulário de Empregador em desenvolvimento.</Typography>
      </Paper>
    </Container>
  );
} 
