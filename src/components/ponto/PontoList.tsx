/**
 * Arquivo: PontoList.tsx
 * Caminho: src/components/ponto/PontoList.tsx
 * Criado em: 2025-06-07
 * Última atualização: 2025-01-27
 * Descrição: Componente de tabela para exibição dos registros de ponto, com ações de editar, validar e excluir
 */

import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  CircularProgress, 
  Typography, 
  Chip,
  Box,
  IconButton,
  Tooltip
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useLanguage } from '@/contexts/LanguageContext';
import { pontoMessages } from '@/i18n/messages/ponto.messages';
import { tooltips } from '@/i18n/tooltips';
import { formatDateBR } from '@/utils/date';

interface RegistroPonto {
  id: string;
  usuarioNome: string;
  data: string;
  entrada?: string;
  inicioIntervalo?: string;
  fimIntervalo?: string;
  saida?: string;
  validado: boolean;
  horasTrabalhadas?: number;
  horasExtras?: number;
  alerta?: string;
}

interface PontoListProps {
  registros: RegistroPonto[];
  loading: boolean;
  onEdit?: (ponto: RegistroPonto) => void;
  onValidate?: (ponto: RegistroPonto) => void;
  onDelete?: (ponto: RegistroPonto) => void;
}

const PontoList: React.FC<PontoListProps> = ({ 
  registros, 
  loading, 
  onEdit, 
  onValidate, 
  onDelete 
}) => {
  const { language } = useLanguage();
  const messages = pontoMessages[language];

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress aria-label={messages.tooltips.carregando} />
      </Box>
    );
  }

  if (!registros || registros.length === 0) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="body1" color="text.secondary">
          {messages.mensagens.nenhum}
        </Typography>
      </Box>
    );
  }

  return (
    <TableContainer component={Paper} sx={{ mt: 2, borderRadius: 2 }}>
      <Table aria-label={messages.tooltips.listaPonto}>
        <TableHead>
          <TableRow sx={{ bgcolor: 'grey.50' }}>
            <TableCell>{messages.labels.funcionario}</TableCell>
            <TableCell>{messages.labels.data}</TableCell>
            <TableCell>{messages.labels.entrada}</TableCell>
            <TableCell>{messages.labels.entradaIntervalo}</TableCell>
            <TableCell>{messages.labels.saidaIntervalo}</TableCell>
            <TableCell>{messages.labels.saida}</TableCell>
            <TableCell>{messages.labels.aprovado}</TableCell>
            <TableCell>{messages.labels.horasTrabalhadas}</TableCell>
            <TableCell>{messages.labels.horasExtras}</TableCell>
            <TableCell>{messages.labels.alerta}</TableCell>
            <TableCell>{messages.labels.acoes}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {registros.map((ponto) => (
            <TableRow 
              key={ponto.id}
              sx={{
                '&:hover': { bgcolor: 'action.hover' }
              }}
            >
              <TableCell>{ponto.usuarioNome}</TableCell>
              <TableCell>{formatDateBR(ponto.data)}</TableCell>
              <TableCell>{ponto.entrada ? new Date(ponto.entrada).toLocaleTimeString() : '-'}</TableCell>
              <TableCell>{ponto.inicioIntervalo ? new Date(ponto.inicioIntervalo).toLocaleTimeString() : '-'}</TableCell>
              <TableCell>{ponto.fimIntervalo ? new Date(ponto.fimIntervalo).toLocaleTimeString() : '-'}</TableCell>
              <TableCell>{ponto.saida ? new Date(ponto.saida).toLocaleTimeString() : '-'}</TableCell>
              <TableCell>
                <Chip 
                  label={ponto.validado ? messages.labels.sim : messages.labels.nao} 
                  color={ponto.validado ? 'success' : 'warning'} 
                  size="small" 
                />
              </TableCell>
              <TableCell>{ponto.horasTrabalhadas?.toFixed(2) ?? '-'}</TableCell>
              <TableCell>{ponto.horasExtras?.toFixed(2) ?? '-'}</TableCell>
              <TableCell>
                {ponto.alerta ? (
                  <Chip 
                    label={ponto.alerta} 
                    color="error" 
                    size="small" 
                  />
                ) : '-'}
              </TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  {onEdit && (
                    <Tooltip title={tooltips.editar[language]}>
                      <IconButton 
                        onClick={() => onEdit(ponto)} 
                        size="small"
                        aria-label={messages.tooltips.editar}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                  {onValidate && (
                    <Tooltip title={tooltips.aprovar[language]}>
                      <IconButton 
                        onClick={() => onValidate(ponto)} 
                        size="small"
                        aria-label={messages.tooltips.aprovar}
                      >
                        <CheckCircleIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                  {onDelete && (
                    <Tooltip title={tooltips.excluir[language]}>
                      <IconButton 
                        onClick={() => onDelete(ponto)} 
                        size="small"
                        aria-label={messages.tooltips.excluir}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default React.memo(PontoList);

export { PontoList }; 