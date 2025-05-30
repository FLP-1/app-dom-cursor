import React, { useState } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Autocomplete,
} from '@mui/material';
import { Chat } from './Chat';
import { ChatList } from './ChatList';
import { CommunicationService } from '../../lib/communication/service';
import { PermissionChecker } from '../../lib/permissions/checker';
import { UserRole } from '../../lib/permissions/types';

interface ChatManagerProps {
  communicationService: CommunicationService;
  permissionChecker: PermissionChecker;
  availableUsers: Array<{
    id: string;
    name: string;
    role: UserRole;
  }>;
}

export const ChatManager: React.FC<ChatManagerProps> = ({
  communicationService,
  permissionChecker,
  availableUsers,
}) => {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [openNewChat, setOpenNewChat] = useState(false);
  const [newChatName, setNewChatName] = useState('');
  const [newChatType, setNewChatType] = useState<'private' | 'group' | 'broadcast'>('private');
  const [selectedUsers, setSelectedUsers] = useState<Array<{ id: string; name: string; role: UserRole }>>([]);

  const handleCreateChat = async () => {
    if (!newChatName.trim() || selectedUsers.length === 0) return;

    try {
      const chatRoom = await communicationService.createChatRoom(
        newChatName,
        newChatType,
        selectedUsers.map(user => user.id)
      );
      setSelectedChatId(chatRoom.id);
      setOpenNewChat(false);
      setNewChatName('');
      setSelectedUsers([]);
    } catch (error) {
      console.error('Erro ao criar sala:', error);
    }
  };

  return (
    <Box sx={{ height: '100%', p: 2 }}>
      <Grid container spacing={2} sx={{ height: '100%' }}>
        {/* Lista de Chats */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
              <Typography variant="h6">Conversas</Typography>
              {permissionChecker.can('create', 'chat') && (
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 2 }}
                  onClick={() => setOpenNewChat(true)}
                >
                  Nova Conversa
                </Button>
              )}
            </Box>
            <ChatList
              onSelectChat={setSelectedChatId}
              communicationService={communicationService}
              permissionChecker={permissionChecker}
            />
          </Paper>
        </Grid>

        {/* Área do Chat */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ height: '100%' }}>
            {selectedChatId ? (
              <Chat
                chatRoomId={selectedChatId}
                communicationService={communicationService}
                permissionChecker={permissionChecker}
              />
            ) : (
              <Box
                sx={{
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography variant="h6" color="text.secondary">
                  Selecione uma conversa para começar
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>

      {/* Diálogo de Nova Conversa */}
      <Dialog open={openNewChat} onClose={() => setOpenNewChat(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Nova Conversa</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Nome da Conversa"
              value={newChatName}
              onChange={(e) => setNewChatName(e.target.value)}
              sx={{ mb: 2 }}
            />
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Tipo de Conversa</InputLabel>
              <Select
                value={newChatType}
                onChange={(e) => setNewChatType(e.target.value as 'private' | 'group' | 'broadcast')}
                label="Tipo de Conversa"
              >
                <MenuItem value="private">Privada</MenuItem>
                <MenuItem value="group">Grupo</MenuItem>
                <MenuItem value="broadcast">Broadcast</MenuItem>
              </Select>
            </FormControl>
            <Autocomplete
              multiple
              options={availableUsers}
              getOptionLabel={(option) => option.name}
              value={selectedUsers}
              onChange={(_, newValue) => setSelectedUsers(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Participantes"
                  placeholder="Selecione os participantes"
                />
              )}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    label={option.name}
                    {...getTagProps({ index })}
                    key={option.id}
                  />
                ))
              }
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenNewChat(false)}>Cancelar</Button>
          <Button
            onClick={handleCreateChat}
            variant="contained"
            disabled={!newChatName.trim() || selectedUsers.length === 0}
          >
            Criar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}; 