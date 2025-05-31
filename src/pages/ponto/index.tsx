import React, { useState } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { usePonto } from '../../hooks/usePonto';
import PontoList from '../../components/PontoList';
import PontoFilter from '../../components/PontoFilter';
import { PageHeader } from '../../components/common/PageHeader';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

const PontoPage: React.FC = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { registros, filtros, setFiltros, loading, error, atualizar } = usePonto();
  const [openModal, setOpenModal] = useState(false);

  if (loading && registros.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={3}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <PageHeader
        title={t('Registro de Ponto')}
        onAdd={() => setOpenModal(true)}
        onRefresh={atualizar}
        addButtonText={t('Registrar Ponto')}
      />

      <Box sx={{ mt: 3 }}>
        <PontoFilter filtros={filtros} setFiltros={setFiltros} />
      </Box>

      <Box sx={{ mt: 3 }}>
        <PontoList registros={registros} loading={loading} />
      </Box>
    </Box>
  );
};

export default PontoPage; 