/**
 * Arquivo: index.tsx
 * Caminho: src/pages/admissao/index.tsx
 * Criado em: 2025-01-27
 * Última atualização: 2025-01-27
 * Descrição: Página de admissão com mensagens centralizadas
 */

import React from 'react';
import { Box, Typography, Button, Grid, Card, CardContent, Avatar, List, ListItem, ListItemIcon, ListItemText, Chip, IconButton, Menu, MenuItem } from '@mui/material';
import { Person, CheckCircle, Schedule, Warning, Work, MoreVert } from '@mui/icons-material';
import { useAdmissaoData } from '@/hooks/useAdmissaoData';
import { aprovarCandidato, reprovarCandidato, contratarCandidato } from '@/services/admissao.service';
import { interfaceMessages } from '@/i18n/messages/interface.messages';
import { useLanguage } from '@/hooks/useLanguage';

const AdmissaoScreen = () => {
  const { data, isLoading, isError } = useAdmissaoData();
  const { language } = useLanguage();
  const messages = interfaceMessages[language].common;

  if (isLoading) {
    return (
      <Box sx={{ p: 3, background: '#f8fafc', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography>{messages.loading}</Typography>
      </Box>
    );
  }

  if (isError || !data) {
    return (
      <Box sx={{ p: 3, background: '#f8fafc', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography color="error">{messages.errorLoadingAdmission}</Typography>
      </Box>
    );
  }

  const { candidatos, processos, stats } = data;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'aprovado': return '#4CAF50';
      case 'pendente': return '#FF9800';
      case 'reprovado': return '#F44336';
      case 'contratado': return '#2196F3';
      default: return '#757575';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'aprovado': return <CheckCircle />;
      case 'pendente': return <Schedule />;
      case 'reprovado': return <Warning />;
      case 'contratado': return <Work />;
      default: return <Person />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const handleAprovar = async (candidatoId: string) => {
    try {
      await aprovarCandidato(candidatoId);
    } catch (error) {
      console.error('Erro ao aprovar candidato:', error);
    }
  };

  const handleReprovar = async (candidatoId: string) => {
    try {
      await reprovarCandidato(candidatoId, 'Não atende aos requisitos');
    } catch (error) {
      console.error('Erro ao reprovar candidato:', error);
    }
  };

  const handleContratar = async (candidatoId: string) => {
    try {
      await contratarCandidato(candidatoId, new Date().toISOString());
    } catch (error) {
      console.error('Erro ao contratar candidato:', error);
    }
  };

  return (
    <Box sx={{ p: 3, background: '#f8fafc', minHeight: '100vh' }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Box>
          <Typography variant="h4" fontWeight="bold" color="primary">
            Admissão de Funcionários
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Gerencie candidatos e processos de admissão
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<Person />}>
          Novo Candidato
        </Button>
      </Box>

      {/* Estatísticas */}
      <Grid container columns={12} spacing={3} mb={4}>
        <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 3' }}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <CardContent>
              <Box display="flex" alignItems="center" gap={2}>
                <Avatar sx={{ background: '#2196F3', width: 48, height: 48 }}>
                  <Person />
                </Avatar>
                <Box>
                  <Typography variant="h6" fontWeight="bold" color="#2196F3">
                    {stats.totalCandidatos}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total de Candidatos
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 3' }}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <CardContent>
              <Box display="flex" alignItems="center" gap={2}>
                <Avatar sx={{ background: '#4CAF50', width: 48, height: 48 }}>
                  <CheckCircle />
                </Avatar>
                <Box>
                  <Typography variant="h6" fontWeight="bold" color="#4CAF50">
                    {stats.candidatosAprovados}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Aprovados
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 3' }}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <CardContent>
              <Box display="flex" alignItems="center" gap={2}>
                <Avatar sx={{ background: '#FF9800', width: 48, height: 48 }}>
                  <Schedule />
                </Avatar>
                <Box>
                  <Typography variant="h6" fontWeight="bold" color="#FF9800">
                    {stats.candidatosPendentes}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Pendentes
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 3' }}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <CardContent>
              <Box display="flex" alignItems="center" gap={2}>
                <Avatar sx={{ background: '#2196F3', width: 48, height: 48 }}>
                  <Work />
                </Avatar>
                <Box>
                  <Typography variant="h6" fontWeight="bold" color="#2196F3">
                    {stats.candidatosContratados}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Contratados
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container columns={12} spacing={3}>
        {/* Lista de Candidatos */}
        <Grid gridColumn={{ xs: 'span 12', md: 'span 8' }}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" mb={3}>
                Candidatos
              </Typography>
              <List>
                {candidatos.map((candidato) => (
                  <ListItem key={candidato.id} sx={{ px: 0, py: 2 }}>
                    <ListItemIcon>
                      <Avatar sx={{ background: getStatusColor(candidato.status), width: 48, height: 48 }}>
                        {getStatusIcon(candidato.status)}
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Box display="flex" alignItems="center" gap={1}>
                          <Typography variant="body1" fontWeight="medium">
                            {candidato.nome}
                          </Typography>
                          <Chip 
                            label={candidato.status} 
                            size="small" 
                            sx={{ 
                              backgroundColor: getStatusColor(candidato.status),
                              color: 'white',
                              textTransform: 'capitalize'
                            }}
                          />
                        </Box>
                      }
                      secondary={
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            {candidato.cargo} • {candidato.email}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Candidatura: {formatDate(candidato.dataCandidatura)}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Estatísticas Detalhadas */}
        <Grid gridColumn={{ xs: 'span 12', md: 'span 4' }}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" mb={3}>
                Estatísticas
              </Typography>
              <Box>
                <Typography variant="body2">{messages.approvalRate}</Typography>
                <Typography variant="h6" color="primary">
                  {((stats.candidatosAprovados / stats.totalCandidatos) * 100).toFixed(1)}%
                </Typography>
              </Box>
              <Box mt={2}>
                <Typography variant="body2">{messages.hiringRate}</Typography>
                <Typography variant="h6" color="primary">
                  {((stats.candidatosContratados / stats.totalCandidatos) * 100).toFixed(1)}%
                </Typography>
              </Box>
              <Box mt={2}>
                <Typography variant="body2">{messages.averageTime}</Typography>
                <Typography variant="h6" color="primary">
                  15 dias
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdmissaoScreen;
