import React from 'react';
import { Box, Typography, Paper, Alert } from '@mui/material';
import { useEsocialConfig } from '../../hooks/useEsocialConfig';
import EsocialConfigForm from '../../components/EsocialConfigForm';

const EsocialConfiguracaoPage: React.FC = () => {
  const {
    control,
    handleSubmit,
    onSubmit,
    loading,
    error,
    success,
    initialValues,
    certificadoAtual,
    statusCertificado,
    alertasRecentes,
    permissoes,
    historicoAlteracoes
  } = useEsocialConfig();

  return (
    <Box sx={{ p: 2, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Configuração da Integração eSocial
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        Preencha os dados do empregador e parâmetros necessários para o funcionamento da integração com o eSocial.
      </Typography>
      <Paper sx={{ p: 2 }}>
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}
        <EsocialConfigForm
          control={control}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          loading={loading}
          initialValues={initialValues}
          certificadoAtual={certificadoAtual}
          statusCertificado={statusCertificado}
          alertasRecentes={alertasRecentes}
          permissoes={permissoes}
          historicoAlteracoes={historicoAlteracoes}
        />
      </Paper>
    </Box>
  );
};

export default EsocialConfiguracaoPage; 