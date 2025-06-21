/**
 * Arquivo: index.tsx
 * Caminho: src/pages/tarefas/index.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Página de listagem de tarefas
 */

import React, { useState } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { useTarefas } from '@/hooks/useTarefas';
import { TarefaList } from '@/components/tarefas/TarefaList';
import { TarefaFilter } from '@/components/tarefas/TarefaFilter';
import { PageHeader } from '@/components/common/PageHeader';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { TarefaForm } from '@/components/forms/tarefa/TarefaForm';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { useNotification } from '@/hooks/useNotification';

const TarefasPage: React.FC = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { tarefas, filtros, setFiltros, loading, error, createTarefa, updateTarefa, deleteTarefa, fetchTarefas } = useTarefas();
  const { showNotification } = useNotification();
  const [openModal, setOpenModal] = useState(false);
  const [selectedTarefa, setSelectedTarefa] = useState(null);
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view'>('create');

  const handleOpenCreate = () => {
    setSelectedTarefa(null);
    setModalMode('create');
    setOpenModal(true);
  };

  const handleOpenEdit = (tarefa) => {
    setSelectedTarefa(tarefa);
    setModalMode('edit');
    setOpenModal(true);
  };

  const handleOpenView = (tarefa) => {
    setSelectedTarefa(tarefa);
    setModalMode('view');
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedTarefa(null);
  };

  const handleDelete = async (tarefa) => {
    if (window.confirm(t('Deseja realmente excluir esta tarefa?'))) {
      try {
        await deleteTarefa(tarefa.id);
        showNotification({ type: 'success', message: t('Tarefa excluída com sucesso!') });
      } catch {
        showNotification({ type: 'error', message: t('Erro ao excluir tarefa.') });
      }
    }
  };

  const handleSubmit = async (data) => {
    try {
      if (modalMode === 'edit' && selectedTarefa) {
        await updateTarefa(selectedTarefa.id, data);
        showNotification({ type: 'success', message: t('Tarefa atualizada com sucesso!') });
      } else {
        await createTarefa(data);
        showNotification({ type: 'success', message: t('Tarefa criada com sucesso!') });
      }
      setOpenModal(false);
    } catch {
      showNotification({ type: 'error', message: t('Erro ao salvar tarefa.') });
    }
  };

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
        onAdd={handleOpenCreate}
        onRefresh={fetchTarefas}
        addButtonText={t('Nova Tarefa')}
      />

      <Box sx={{ mt: 3 }}>
        <TarefaFilter filtros={filtros} setFiltros={setFiltros} />
      </Box>

      <Box sx={{ mt: 3 }}>
        <TarefaList
          tarefas={tarefas}
          loading={loading}
          onEdit={handleOpenEdit}
          onView={handleOpenView}
          onDelete={handleDelete}
        />
      </Box>

      <Dialog open={openModal} onClose={handleCloseModal} fullWidth maxWidth="sm" aria-labelledby="modal-tarefa-titulo">
        <DialogTitle id="modal-tarefa-titulo">
          {modalMode === 'create' && t('Nova Tarefa')}
          {modalMode === 'edit' && t('Editar Tarefa')}
          {modalMode === 'view' && t('Visualizar Tarefa')}
        </DialogTitle>
        <DialogContent>
          <TarefaForm
            initialValues={selectedTarefa || {}}
            onSubmit={handleSubmit}
            onCancel={handleCloseModal}
            loading={loading}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="secondary">
            {t('Fechar')}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TarefasPage; 
