import React, { useState } from 'react';
import { Box, Button, Typography, Paper, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DownloadIcon from '@mui/icons-material/Download';
import { usePonto } from '../../hooks/usePonto';
import PontoList from '../../components/PontoList';
import PontoFilter from '../../components/PontoFilter';
// import PontoModal from '../../components/PontoModal'; // Placeholder

const PontoPage: React.FC = () => {
  const { registros, filtros, setFiltros, loading } = usePonto();
  const [openModal, setOpenModal] = useState(false);

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Registro de Ponto
      </Typography>
      <Paper sx={{ p: 2, mb: 2 }}>
        <PontoFilter filtros={filtros} setFiltros={setFiltros} />
        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => setOpenModal(true)}
            aria-label="Registrar novo ponto"
          >
            Registrar Ponto
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<DownloadIcon />}
            aria-label="Exportar registros"
            // onClick={handleExport} // Placeholder para exportação
          >
            Exportar
          </Button>
        </Stack>
      </Paper>
      <PontoList registros={registros} loading={loading} />
      {/* <PontoModal open={openModal} onClose={() => setOpenModal(false)} /> */}
    </Box>
  );
};

export default PontoPage; 