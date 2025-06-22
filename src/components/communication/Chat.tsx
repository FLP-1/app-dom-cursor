/**
 * Arquivo: Chat.tsx
 * Caminho: src/components/communication/Chat.tsx
 * Criado em: 2025-01-27
 * Última atualização: 2025-01-27
 * Descrição: Componente de chat com mensagens centralizadas
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  TextField,
  IconButton,
  CircularProgress,
  Divider,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  Send as SendIcon,
  MoreVert as MoreVertIcon,
  AttachFile as AttachFileIcon,
} from '@mui/icons-material';
import { Message, MessageType, MessagePriority } from '@/lib/communication/types';
import { CommunicationService } from '@/lib/communication/service';
import { PermissionChecker } from '@/lib/permissions/checker';
import { interfaceMessages } from '@/i18n/messages/interface.messages';
import { useLanguage } from '@/hooks/useLanguage';

interface ChatProps {
  chatRoomId: string;
  communicationService: CommunicationService;
  permissionChecker: PermissionChecker;
}

export const Chat: React.FC<ChatProps> = ({
  chatRoomId,
  communicationService,
  permissionChecker,
}) => {
  const { language } = useLanguage();
  const messages = interfaceMessages[language].common;
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const loadMessages = useCallback(async () => {
    setLoading(true);
    try {
      const loadedMessages = await communicationService.getMessages({
        page: 1,
        limit: 50,
      });
      setMessages(loadedMessages);
    } catch (error) {
      console.error('Erro ao carregar mensagens:', error);
    } finally {
      setLoading(false);
    }
  }, [communicationService]);

  useEffect(() => {
    loadMessages();
  }, [chatRoomId, loadMessages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const message = await communicationService.sendMessage(
        newMessage,
        MessageType.TEXT,
        [], // TODO: Implementar seleção de destinatários
        MessagePriority.NORMAL
      );
      setMessages((prev) => [...prev, message]);
      setNewMessage('');
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteMessage = async (messageId: string) => {
    try {
      await communicationService.deleteMessage(messageId);
      setMessages((prev) => prev.filter((msg) => msg.id !== messageId));
    } catch (error) {
      console.error('Erro ao deletar mensagem:', error);
    }
    handleMenuClose();
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Paper sx={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {/* Cabeçalho do Chat */}
        <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
          <Typography variant="h6">{messages.chat}</Typography>
        </Box>

        {/* Lista de Mensagens */}
        <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
              <CircularProgress />
            </Box>
          ) : (
            <List>
              {messages.map((message) => (
                <React.Fragment key={message.id}>
                  <ListItem
                    alignItems="flex-start"
                    sx={{
                      flexDirection: message.sender.id === 'current-user-id' ? 'row-reverse' : 'row',
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar>{message.sender.name[0]}</Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="subtitle2">{message.sender.name}</Typography>
                          <Typography variant="caption" color="text.secondary">
                            {new Date(message.createdAt).toLocaleTimeString()}
                          </Typography>
                        </Box>
                      }
                      secondary={
                        <Box sx={{ mt: 1 }}>
                          <Typography variant="body1">{message.content}</Typography>
                        </Box>
                      }
                    />
                    {permissionChecker.can('delete', 'message') && (
                      <IconButton
                        size="small"
                        onClick={handleMenuOpen}
                        sx={{ ml: 1 }}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    )}
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </React.Fragment>
              ))}
              <div ref={messagesEndRef} />
            </List>
          )}
        </Box>

        {/* Área de Input */}
        <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton size="small">
              <AttachFileIcon />
            </IconButton>
            <TextField
              fullWidth
              multiline
              maxRows={4}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={messages.typeMessage}
              variant="outlined"
              size="small"
            />
            <IconButton
              color="primary"
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
            >
              <SendIcon />
            </IconButton>
          </Box>
        </Box>
      </Paper>

      {/* Menu de Opções */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleDeleteMessage('message-id')}>
          Deletar Mensagem
        </MenuItem>
      </Menu>
    </Box>
  );
}; 
