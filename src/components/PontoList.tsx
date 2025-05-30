import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Typography, Chip } from '@mui/material';
import { RegistroPonto } from '../hooks/usePonto';
import { formatDateBR } from '../utils/date';

interface PontoListProps {
  registros: RegistroPonto[];
  loading: boolean;
}

const PontoList: React.FC<PontoListProps> = ({ registros, loading }) => {
  if (loading) {
    return <CircularProgress aria-label="Carregando registros de ponto" />;
  }
  if (!registros || registros.length === 0) {
    return <Typography variant="body1">Nenhum registro de ponto encontrado.</Typography>;
  }
  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Table aria-label="Lista de registros de ponto">
        <TableHead>
          <TableRow>
            <TableCell>Usuário</TableCell>
            <TableCell>Data</TableCell>
            <TableCell>Entrada</TableCell>
            <TableCell>Início Intervalo</TableCell>
            <TableCell>Fim Intervalo</TableCell>
            <TableCell>Saída</TableCell>
            <TableCell>Validado</TableCell>
            <TableCell>Horas Trabalhadas</TableCell>
            <TableCell>Horas Extras</TableCell>
            <TableCell>Alerta</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {registros.map((ponto) => (
            <TableRow key={ponto.id}>
              <TableCell>{ponto.usuarioNome}</TableCell>
              <TableCell>{formatDateBR(ponto.data)}</TableCell>
              <TableCell>{ponto.entrada ? new Date(ponto.entrada).toLocaleTimeString() : '-'}</TableCell>
              <TableCell>{ponto.inicioIntervalo ? new Date(ponto.inicioIntervalo).toLocaleTimeString() : '-'}</TableCell>
              <TableCell>{ponto.fimIntervalo ? new Date(ponto.fimIntervalo).toLocaleTimeString() : '-'}</TableCell>
              <TableCell>{ponto.saida ? new Date(ponto.saida).toLocaleTimeString() : '-'}</TableCell>
              <TableCell>{ponto.validado ? <Chip label="Sim" color="success" size="small" /> : <Chip label="Não" color="warning" size="small" />}</TableCell>
              <TableCell>{ponto.horasTrabalhadas?.toFixed(2) ?? '-'}</TableCell>
              <TableCell>{ponto.horasExtras?.toFixed(2) ?? '-'}</TableCell>
              <TableCell>{ponto.alerta ? <Chip label={ponto.alerta} color="error" size="small" /> : '-'}</TableCell>
              <TableCell>{/* Placeholder para ações (editar, validar, etc) */}-</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PontoList; 