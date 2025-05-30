import React, { useState } from 'react';
import { Box, Button, Typography, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useTarefas } from '../../hooks/useTarefas';
import TarefaList from '../../components/TarefaList';
import TarefaFilter from '../../components/TarefaFilter';
// import TarefaModal from '../../components/TarefaModal'; // Placeholder

const TarefasPage: React.FC = () => {
  const { tarefas, filtros, setFiltros, loading } = useTarefas();
  const [openModal, setOpenModal] = useState(false);

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Gestão de Tarefas
      </Typography>
      <Paper sx={{ p: 2, mb: 2 }}>
        <TarefaFilter filtros={filtros} setFiltros={setFiltros} />
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          sx={{ mt: 2 }}
          onClick={() => setOpenModal(true)}
          aria-label="Nova tarefa"
        >
          Nova Tarefa
        </Button>
      </Paper>
      <TarefaList tarefas={tarefas} loading={loading} />
      {/* <TarefaModal open={openModal} onClose={() => setOpenModal(false)} /> */}
    </Box>
  );
};

export default TarefasPage; 