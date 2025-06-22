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
import { useLanguage } from '@/contexts/LanguageContext';
import { messages } from '@/i18n/messages';

const Familia = () => {
  const { data, isLoading, isError, addMember, updateMember, deleteMember } = useFamilyData();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const { language } = useLanguage();
  const msg = messages[language];

  if (isLoading) {
    return (
      <Box sx={{ p: 3, background: '#f8fafc', minHeight: '100vh' }}>
        <Skeleton variant="text" width={250} height={60} />
        <Skeleton variant="text" width={200} height={30} />
        <Grid container columns={12} spacing={3} mt={2}>
          <Grid gridColumn={{ xs: 'span 12', md: 'span 8' }}>
            <Skeleton variant="rectangular" height={400} sx={{ borderRadius: 3 }} />
          </Grid>
          <Grid gridColumn={{ xs: 'span 12', md: 'span 4' }}>
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
        <Typography color="error">{msg.familia.loadError}</Typography>
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
      console.error(msg.familia.saveError, error);
    }
  };

  return (
    <Box sx={{ p: 3, background: '#f8fafc', minHeight: '100vh' }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Box>
          <Typography variant="h4" fontWeight="bold" color="primary">
            {msg.familia.title}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {msg.familia.subtitle}
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleAddMember}
          sx={{ borderRadius: 2 }}
        >
          {msg.familia.addMember}
        </Button>
      </Box>

      <Grid container columns={12} spacing={3}>
        {/* Lista de Membros */}
        <Grid gridColumn={{ xs: 'span 12', md: 'span 8' }}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" mb={3}>
                {msg.familia.familyMembers}
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
                            ({member.age} {msg.familia.years})
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
                                  label={`${msg.familia.bloodType}: ${member.medicalInfo.bloodType}`}
                                  size="small"
                                  variant="outlined"
                                  sx={{ fontSize: '0.7rem' }}
                                />
                              )}
                              {member.medicalInfo.allergies && member.medicalInfo.allergies.length > 0 && (
                                <Chip
                                  label={`${member.medicalInfo.allergies.length} ${msg.familia.allergies}`}
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
        <Grid gridColumn={{ xs: 'span 12', md: 'span 4' }}>
          {/* Contatos de Emergência */}
          <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)', mb: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" mb={2}>
                {msg.familia.emergencyContacts}
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
                {msg.familia.upcomingBirthdays}
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
                {msg.familia.medicalAlerts}
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
                {msg.familia.statistics}
              </Typography>
              <Box>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography variant="body2">{msg.familia.totalMembers}</Typography>
                  <Typography variant="body2" fontWeight="bold">{stats.totalMembers}</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography variant="body2">{msg.familia.children}</Typography>
                  <Typography variant="body2" fontWeight="bold" color="#4CAF50">{stats.children}</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography variant="body2">{msg.familia.adults}</Typography>
                  <Typography variant="body2" fontWeight="bold" color="#2196F3">{stats.adults}</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography variant="body2">{msg.familia.seniors}</Typography>
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
          {selectedMember ? msg.familia.editMember : msg.familia.addMember}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label={msg.familia.name}
                  defaultValue={selectedMember?.name || ''}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>{msg.familia.relationship}</InputLabel>
                  <Select
                    defaultValue={selectedMember?.relationship || 'other'}
                    label={msg.familia.relationship}
                  >
                    <MenuItem value="spouse">{msg.familia.spouse}</MenuItem>
                    <MenuItem value="child">{msg.familia.child}</MenuItem>
                    <MenuItem value="parent">{msg.familia.parent}</MenuItem>
                    <MenuItem value="sibling">{msg.familia.sibling}</MenuItem>
                    <MenuItem value="other">{msg.familia.other}</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label={msg.familia.birthDate}
                  type="date"
                  defaultValue={selectedMember?.birthDate || ''}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label={msg.familia.phone}
                  defaultValue={selectedMember?.phone || ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label={msg.familia.email}
                  defaultValue={selectedMember?.email || ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label={msg.familia.address}
                  defaultValue={selectedMember?.address || ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label={msg.familia.occupation}
                  defaultValue={selectedMember?.occupation || ''}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>{msg.common.cancel}</Button>
          <Button 
            variant="contained" 
            onClick={() => handleSaveMember({})}
          >
            {msg.common.save}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Familia;
