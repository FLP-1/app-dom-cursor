/**
 * Arquivo: cadastro.tsx
 * Caminho: src/pages/empregadores/cadastro.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Página de cadastro de empregador doméstico
 */

import { Container, Typography, Alert } from '@mui/material';
import { EmpregadorForm } from '@/components/forms/empregador/EmpregadorForm';
import { Layout } from '@/components/layout/Layout';
import { SnackbarProvider } from 'notistack';

export default function CadastroEmpregador() {
  return (
    <SnackbarProvider maxSnack={3}>
      <Layout>
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Cadastro de Empregador Doméstico
          </Typography>
          
          <Alert severity="info" sx={{ mb: 3 }}>
            Este cadastro é integrado com o eSocial. Os dados cadastrais do empregador (CPF, nome, data de nascimento, etc.) 
            devem ser atualizados diretamente na base do CPF da Receita Federal. Aqui você pode apenas complementar 
            informações específicas do eSocial.
          </Alert>

          <Typography variant="body1" color="text.secondary" paragraph>
            Preencha os dados abaixo para cadastrar um novo empregador doméstico.
            Todos os campos marcados com * são obrigatórios.
          </Typography>

          <EmpregadorForm />
        </Container>
      </Layout>
    </SnackbarProvider>
  );
} 
