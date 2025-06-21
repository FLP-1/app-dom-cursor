/**
 * Arquivo: index.tsx
 * Caminho: src/pages/familia/index.tsx
 * Criado em: 2025-01-27
 * Última atualização: 2025-01-27
 * Descrição: Página de família principal do sistema, conectada à API via useFamilyData.
 */

import React, { useState } from 'react';
import { 
  Grid, Card, CardContent, Typography, Box, 
  IconButton, Avatar, Chip, LinearProgress, Skeleton,
  Button, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, FormControl, InputLabel, Select, MenuItem,
  List, ListItem, ListItemText, ListItemIcon, ListItemSecondaryAction,
  Badge, Divider
} from '@mui/material';
import {
  FamilyRestroom, Add, Phone, Email, LocationOn, Work,
  MedicalServices, Warning, Birthday, Emergency, Delete, Edit,
  Person, Child, Elderly, ContactPhone
} from '@mui/icons-material';
import { useFamilyData } from '@/hooks/useFamilyData';

const Familia = () => {
  const { data, isLoading, isError, addMember, updateMember, deleteMember } = useFamilyData();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedMember, setSelectedMember] = useState<any>(null);

  if (isLoading) {
    return (
      <Box sx={{ p: 3, background: '#f8fafc', minHeight: '100vh' }}>
        <Skeleton variant="text" width={250} height={60} />
        <Skeleton variant="text" width={200} height={30} />
        <Grid container spacing={3} mt={2}>
          <Grid item xs={12} md={8}>
            <Skeleton variant="rectangular" height={400} sx={{ borderRadius: 3 }} />
          </Grid>
          <Grid item xs={12} md={4}>
            <Skeleton variant="rectangular" height={200} sx={{ borderRadius: 3, mb: 2 }} />
            <Skeleton variant="rectangular" height={200} sx={{ borderRadius: 3 }} />
          </Grid>
        </Grid>
      </Box>
    );
  }

  if (isError) {
    return (
      <Box sx={{ p: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography color="error">Falha ao carregar os dados da família.</Typography>
      </Box>
    );
  }

  const { members, emergencyContacts, upcomingBirthdays, medicalAlerts, stats } = data;

  const getRelationshipIcon = (relationship: string) => {
    switch (relationship) {
      case 'spouse': return <Person />;
      case 'child': return <Child />;
      case 'parent': return <Elderly />;
      case 'sibling': return <FamilyRestroom />;
      default: return <Person />;
    }
  };

  const getRelationshipColor = (relationship: string) => {
    switch (relationship) {
      case 'spouse': return '#E91E63';
      case 'child': return '#4CAF50';
      case 'parent': return '#FF9800';
      case 'sibling': return '#2196F3';
      default: return '#757575';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#F44336';
      case 'medium': return '#FF9800';
      case 'low': return '#4CAF50';
      default: return '#757575';
    }
  };

  const handleAddMember = () => {
    setSelectedMember(null);
    setOpenDialog(true);
  };

  const handleEditMember = (member: any) => {
    setSelectedMember(member);
    setOpenDialog(true);
  };

  const handleSaveMember = async (memberData: any) => {
    try {
      if (selectedMember) {
        await updateMember(selectedMember.id, memberData);
      } else {
        await addMember(memberData);
      }
      setOpenDialog(false);
    } catch (error) {
      console.error('Erro ao salvar membro:', error);
    }
  };

  return (
    <Box sx={{ p: 3, background: '#f8fafc', minHeight: '100vh' }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Box>
          <Typography variant="h4" fontWeight="bold" color="primary">
            Família 👨‍👩‍👧‍👦
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Gerencie informações dos membros da família
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleAddMember}
          sx={{ borderRadius: 2 }}
        >
          Adicionar Membro
        </Button>
      </Box>

      <Grid container spacing={3}>
        {/* Lista de Membros */}
        <Grid item xs={12} md={8}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" mb={3}>
                Membros da Família
              </Typography>
              
              <List>
                {members.map((member) => (
                  <ListItem
                    key={member.id}
                    sx={{
                      border: '1px solid #e0e0e0',
                      borderRadius: 2,
                      mb: 2,
                      background: 'white',
                      '&:hover': {
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                        transform: 'translateY(-1px)'
                      },
                      transition: 'all 0.2s'
                    }}
                  >
                    <ListItemIcon>
                      <Badge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        badgeContent={
                          member.emergencyContact ? (
                            <Emergency sx={{ fontSize: 16, color: '#F44336' }} />
                          ) : null
                        }
                      >
                        <Avatar sx={{ 
                          background: getRelationshipColor(member.relationship), 
                          width: 56, 
                          height: 56 
                        }}>
                          {getRelationshipIcon(member.relationship)}
                        </Avatar>
                      </Badge>
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Box display="flex" alignItems="center" gap={1}>
                          <Typography variant="body1" fontWeight="medium">
                            {member.name}
                          </Typography>
                          <Chip
                            label={member.relationship}
                            size="small"
                            sx={{
                              background: getRelationshipColor(member.relationship),
                              color: 'white',
                              textTransform: 'capitalize'
                            }}
                          />
                          <Typography variant="body2" color="text.secondary">
                            ({member.age} anos)
                          </Typography>
                        </Box>
                      }
                      secondary={
                        <Box>
                          <Box display="flex" alignItems="center" gap={2} mt={1}>
                            <Box display="flex" alignItems="center" gap={0.5}>
                              <Phone sx={{ fontSize: 16, color: 'text.secondary' }} />
                              <Typography variant="body2" color="text.secondary">
                                {member.phone}
                              </Typography>
                            </Box>
                            {member.email && (
                              <Box display="flex" alignItems="center" gap={0.5}>
                                <Email sx={{ fontSize: 16, color: 'text.secondary' }} />
                                <Typography variant="body2" color="text.secondary">
                                  {member.email}
                                </Typography>
                              </Box>
                            )}
                          </Box>
                          <Box display="flex" alignItems="center" gap={0.5} mt={1}>
                            <LocationOn sx={{ fontSize: 16, color: 'text.secondary' }} />
                            <Typography variant="body2" color="text.secondary">
                              {member.address}
                            </Typography>
                          </Box>
                          {member.occupation && (
                            <Box display="flex" alignItems="center" gap={0.5} mt={1}>
                              <Work sx={{ fontSize: 16, color: 'text.secondary' }} />
                              <Typography variant="body2" color="text.secondary">
                                {member.occupation}
                              </Typography>
                            </Box>
                          )}
                          {member.medicalInfo && (
                            <Box display="flex" gap={0.5} mt={1}>
                              {member.medicalInfo.bloodType && (
                                <Chip
                                  label={`Sangue: ${member.medicalInfo.bloodType}`}
                                  size="small"
                                  variant="outlined"
                                  sx={{ fontSize: '0.7rem' }}
                                />
                              )}
                              {member.medicalInfo.allergies && member.medicalInfo.allergies.length > 0 && (
                                <Chip
                                  label={`${member.medicalInfo.allergies.length} alergia(s)`}
                                  size="small"
                                  variant="outlined"
                                  color="warning"
                                  sx={{ fontSize: '0.7rem' }}
                                />
                              )}
                            </Box>
                          )}
                        </Box>
                      }
                    />
                    <ListItemSecondaryAction>
                      <Box display="flex" gap={1}>
                        <IconButton size="small">
                          <Edit />
                        </IconButton>
                        <IconButton size="small" color="error">
                          <Delete />
                        </IconButton>
                      </Box>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} md={4}>
          {/* Contatos de Emergência */}
          <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)', mb: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" mb={2}>
                Contatos de Emergência
              </Typography>
              {emergencyContacts.map((contact) => (
                <Box key={contact.id} display="flex" alignItems="center" py={1}>
                  <Avatar sx={{ 
                    background: getRelationshipColor(contact.relationship), 
                    mr: 2, 
                    width: 32, 
                    height: 32 
                  }}>
                    {getRelationshipIcon(contact.relationship)}
                  </Avatar>
                  <Box flex={1}>
                    <Typography variant="body2" fontWeight="medium">
                      {contact.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {contact.phone}
                    </Typography>
                  </Box>
                  <IconButton size="small" color="primary">
                    <ContactPhone />
                  </IconButton>
                </Box>
              ))}
            </CardContent>
          </Card>

          {/* Aniversários Próximos */}
          <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)', mb: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" mb={2}>
                Próximos Aniversários
              </Typography>
              {upcomingBirthdays.map((member) => (
                <Box key={member.id} display="flex" alignItems="center" py={1}>
                  <Avatar sx={{ 
                    background: getRelationshipColor(member.relationship), 
                    mr: 2, 
                    width: 32, 
                    height: 32 
                  }}>
                    <Birthday />
                  </Avatar>
                  <Box flex={1}>
                    <Typography variant="body2" fontWeight="medium">
                      {member.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {member.birthDate}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </CardContent>
          </Card>

          {/* Alertas Médicos */}
          <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)', mb: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" mb={2}>
                Alertas Médicos
              </Typography>
              {medicalAlerts.map((alert, index) => (
                <Box key={index} display="flex" alignItems="center" py={1}>
                  <MedicalServices sx={{ 
                    color: getPriorityColor(alert.priority), 
                    mr: 2, 
                    fontSize: 20 
                  }} />
                  <Box flex={1}>
                    <Typography variant="body2" fontWeight="medium">
                      {alert.memberName}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {alert.alert}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </CardContent>
          </Card>

          {/* Estatísticas */}
          <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" mb={2}>
                Estatísticas
              </Typography>
              <Box>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography variant="body2">Total de Membros</Typography>
                  <Typography variant="body2" fontWeight="bold">{stats.totalMembers}</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography variant="body2">Crianças</Typography>
                  <Typography variant="body2" fontWeight="bold" color="#4CAF50">{stats.children}</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography variant="body2">Adultos</Typography>
                  <Typography variant="body2" fontWeight="bold" color="#2196F3">{stats.adults}</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography variant="body2">Idosos</Typography>
                  <Typography variant="body2" fontWeight="bold" color="#FF9800">{stats.seniors}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Dialog para adicionar/editar membro */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedMember ? 'Editar Membro' : 'Adicionar Membro'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Nome"
                  defaultValue={selectedMember?.name || ''}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Relacionamento</InputLabel>
                  <Select
                    defaultValue={selectedMember?.relationship || 'other'}
                    label="Relacionamento"
                  >
                    <MenuItem value="spouse">Cônjuge</MenuItem>
                    <MenuItem value="child">Filho(a)</MenuItem>
                    <MenuItem value="parent">Pai/Mãe</MenuItem>
                    <MenuItem value="sibling">Irmão(ã)</MenuItem>
                    <MenuItem value="other">Outro</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Data de Nascimento"
                  type="date"
                  defaultValue={selectedMember?.birthDate || ''}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Telefone"
                  defaultValue={selectedMember?.phone || ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  defaultValue={selectedMember?.email || ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Endereço"
                  defaultValue={selectedMember?.address || ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Profissão"
                  defaultValue={selectedMember?.occupation || ''}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
          <Button 
            variant="contained" 
            onClick={() => handleSaveMember({})}
          >
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Familia;
