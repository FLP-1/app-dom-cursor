import React, { useState } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { useTarefas } from '../../hooks/useTarefas';
import TarefaList from '../../components/TarefaList';
import TarefaFilter from '../../components/TarefaFilter';
import { PageHeader } from '../../components/common/PageHeader';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

const TarefasPage: React.FC = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { tarefas, filtros, setFiltros, loading, error, atualizar } = useTarefas();
  const [openModal, setOpenModal] = useState(false);

  if (loading && tarefas.length === 0) {
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
        title={t('Gestão de Tarefas')}
        onAdd={() => setOpenModal(true)}
        onRefresh={atualizar}
        addButtonText={t('Nova Tarefa')}
      />

      <Box sx={{ mt: 3 }}>
        <TarefaFilter filtros={filtros} setFiltros={setFiltros} />
      </Box>

      <Box sx={{ mt: 3 }}>
        <TarefaList tarefas={tarefas} loading={loading} />
      </Box>
    </Box>
  );
};

export default TarefasPage; 