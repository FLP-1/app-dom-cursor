/**
 * Arquivo: ChatManager.tsx
 * Caminho: src/components/communication/ChatManager.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-01-27
 * Descrição: Gerenciador de chat com suporte a conversas privadas, grupos e broadcast.
 */

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
import { Chat } from '@/components/communication/Chat';
import { ChatList } from '@/components/communication/ChatList';
import { CommunicationService } from '@/lib/communication/service';
import { PermissionChecker } from '@/lib/permissions/checker';
import { UserRole } from '@/lib/permissions/types';
import { useMessages } from '@/hooks/useMessages';
import { commonMessages } from '@/i18n/messages/common.messages';

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
  const { messages } = useMessages(commonMessages);
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
      <Grid container spacing={2} columns={12} sx={{ height: '100%' }}>
        {/* Lista de Chats */}
        <Grid gridColumn={{ xs: 'span 12', md: 'span 4' }}>
          <Paper sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
              <Typography variant="h6">{messages.chat.conversations}</Typography>
              {permissionChecker.can('create', 'chat') && (
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 2 }}
                  onClick={() => setOpenNewChat(true)}
                >
                  {messages.chat.newConversation}
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
        <Grid gridColumn={{ xs: 'span 12', md: 'span 8' }}>
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
                  {messages.chat.selectConversation}
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>

      {/* Diálogo de Nova Conversa */}
      <Dialog open={openNewChat} onClose={() => setOpenNewChat(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{messages.chat.newConversation}</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label={messages.chat.conversationName}
              value={newChatName}
              onChange={(e) => setNewChatName(e.target.value)}
              sx={{ mb: 2 }}
            />
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>{messages.chat.conversationType}</InputLabel>
              <Select
                value={newChatType}
                onChange={(e) => setNewChatType(e.target.value as 'private' | 'group' | 'broadcast')}
                label={messages.chat.conversationType}
              >
                <MenuItem value="private">{messages.chat.types.private}</MenuItem>
                <MenuItem value="group">{messages.chat.types.group}</MenuItem>
                <MenuItem value="broadcast">{messages.chat.types.broadcast}</MenuItem>
              </Select>
            </FormControl>
            <Autocomplete
              multiple
              options={availableUsers}
              getOptionLabel={(option) => option.name}
              value={selectedUsers}
              onChange={(_, newValue) => setSelectedUsers(newValue)}
              slotProps={{ textField: { label: messages.chat.participants, placeholder: messages.chat.selectParticipants } }}
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
          <Button onClick={() => setOpenNewChat(false)}>{messages.common.cancel}</Button>
          <Button
            onClick={handleCreateChat}
            variant="contained"
            disabled={!newChatName.trim() || selectedUsers.length === 0}
          >
            {messages.common.create}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}; 
