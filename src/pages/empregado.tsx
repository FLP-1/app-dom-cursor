/**
 * Arquivo: empregado.tsx
 * Caminho: src/pages/empregado.tsx
 * Criado em: 2025-06-07
 * Última atualização: 2025-06-07
 * Descrição: Página de cadastro de empregado, acessível, responsiva e integrada ao formulário padronizado.
 */

import { Container, Typography, Paper } from '@mui/material';
import { EmpregadoForm } from '@/components/forms/empregado/EmpregadoForm';

export default function EmpregadoPage() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Cadastro de Empregado
        </Typography>
        <EmpregadoForm />
        <Typography variant="body1">Formulário de Empregado em desenvolvimento.</Typography>
      </Paper>
    </Container>
  );
} 
