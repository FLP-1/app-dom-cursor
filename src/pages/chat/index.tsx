/**
 * Arquivo: index.tsx
 * Caminho: src/pages/chat/index.tsx
 * Criado em: 2025-01-27
 * Última atualização: 2025-01-27
 * Descrição: Página de chat principal do sistema, conectada à API via useChatData.
 */

import React, { useState, useRef, useEffect } from 'react';
import { 
  Grid, Card, CardContent, Typography, Box, 
  IconButton, Avatar, Chip, LinearProgress, Skeleton,
  Button, TextField, List, ListItem, ListItemText, ListItemIcon,
  ListItemAvatar, Badge, Divider, Paper
} from '@mui/material';
import {
  Send, Search, MoreVert, AttachFile, EmojiEmotions,
  Person, Group, Circle, CheckCircle, DoneAll,
  Delete, Edit, Reply, Forward
} from '@mui/icons-material';
import { useChatData } from '@/hooks/useChatData';

const Chat = () => {
  const { data, isLoading, isError, sendMessage, createConversation, markAsRead, deleteMessage } = useChatData();
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messageText, setMessageText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (data?.conversations.length && !selectedConversation) {
      setSelectedConversation(data.conversations[0].id);
    }
  }, [data, selectedConversation]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [data?.messages]);

  if (isLoading) {
    return (
      <Box sx={{ p: 3, background: '#f8fafc', minHeight: '100vh' }}>
        <Skeleton variant="text" width={250} height={60} />
        <Skeleton variant="text" width={200} height={30} />
        <Grid container columns={12} spacing={3} mt={2}>
          <Grid gridColumn={{ xs: 'span 12', md: 'span 4' }}>
            <Skeleton variant="rectangular" height={600} sx={{ borderRadius: 3 }} />
          </Grid>
          <Grid gridColumn={{ xs: 'span 12', md: 'span 8' }}>
            <Skeleton variant="rectangular" height={600} sx={{ borderRadius: 3 }} />
          </Grid>
        </Grid>
      </Box>
    );
  }

  if (isError) {
    return (
      <Box sx={{ p: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography color="error">Falha ao carregar os dados do chat.</Typography>
      </Box>
    );
  }

  const { conversations, messages, contacts, stats } = data;

  const currentConversation = conversations.find(c => c.id === selectedConversation);
  const currentMessages = messages.filter(m => m.conversationId === selectedConversation);

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Hoje';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Ontem';
    } else {
      return date.toLocaleDateString('pt-BR');
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent': return <CheckCircle sx={{ fontSize: 16 }} />;
      case 'delivered': return <DoneAll sx={{ fontSize: 16 }} />;
      case 'read': return <DoneAll sx={{ fontSize: 16, color: '#2196F3' }} />;
      default: return <Circle sx={{ fontSize: 16 }} />;
    }
  };

  const handleSendMessage = async () => {
    if (messageText.trim() && selectedConversation) {
      try {
        await sendMessage(selectedConversation, messageText);
        setMessageText('');
      } catch (error) {
        console.error('Erro ao enviar mensagem:', error);
      }
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const filteredConversations = conversations.filter(conversation =>
    conversation.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ p: 3, background: '#f8fafc', minHeight: '100vh' }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Box>
          <Typography variant="h4" fontWeight="bold" color="primary">
            Chat 💬
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Comunicação em tempo real com a equipe
          </Typography>
        </Box>
        <Box display="flex" gap={2}>
          <Chip
            label={`${stats.onlineContacts} online`}
            color="success"
            variant="outlined"
          />
          <Chip
            label={`${stats.unreadMessages} não lidas`}
            color="warning"
            variant="outlined"
          />
        </Box>
      </Box>

      <Grid container columns={12} spacing={3} sx={{ height: 'calc(100vh - 200px)' }}>
        {/* Lista de Conversas */}
        <Grid gridColumn={{ xs: 'span 12', md: 'span 4' }}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)', height: '100%' }}>
            <CardContent sx={{ p: 0, height: '100%', display: 'flex', flexDirection: 'column' }}>
              {/* Busca */}
              <Box sx={{ p: 2, borderBottom: '1px solid #e0e0e0' }}>
                <TextField
                  fullWidth
                  placeholder="Buscar conversas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />
                  }}
                  size="small"
                />
              </Box>

              {/* Lista de Conversas */}
              <List sx={{ flex: 1, overflow: 'auto' }}>
                {filteredConversations.map((conversation) => (
                  <ListItem
                    key={conversation.id}
                    button
                    selected={selectedConversation === conversation.id}
                    onClick={() => setSelectedConversation(conversation.id)}
                    sx={{
                      borderBottom: '1px solid #f0f0f0',
                      '&:hover': {
                        backgroundColor: '#f5f5f5'
                      },
                      '&.Mui-selected': {
                        backgroundColor: '#e3f2fd'
                      }
                    }}
                  >
                    <ListItemAvatar>
                      <Badge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        badgeContent={
                          conversation.isOnline ? (
                            <Circle sx={{ fontSize: 12, color: '#4CAF50' }} />
                          ) : null
                        }
                      >
                        <Avatar src={conversation.avatar}>
                          {conversation.type === 'group' ? <Group /> : <Person />}
                        </Avatar>
                      </Badge>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box display="flex" alignItems="center" justifyContent="space-between">
                          <Typography variant="body2" fontWeight="medium">
                            {conversation.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {formatTime(conversation.lastMessage?.timestamp || '')}
                          </Typography>
                        </Box>
                      }
                      secondary={
                        <Box>
                          <Typography variant="caption" color="text.secondary" noWrap>
                            {conversation.lastMessage?.text || 'Nenhuma mensagem'}
                          </Typography>
                          {conversation.unreadCount > 0 && (
                            <Chip
                              label={conversation.unreadCount}
                              size="small"
                              sx={{
                                background: '#2196F3',
                                color: 'white',
                                fontSize: '0.7rem',
                                height: 20,
                                ml: 1
                              }}
                            />
                          )}
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Área de Mensagens */}
        <Grid gridColumn={{ xs: 'span 12', md: 'span 8' }}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)', height: '100%' }}>
            <CardContent sx={{ p: 0, height: '100%', display: 'flex', flexDirection: 'column' }}>
              {/* Header da Conversa */}
              {currentConversation && (
                <Box sx={{ p: 2, borderBottom: '1px solid #e0e0e0', display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    badgeContent={
                      currentConversation.isOnline ? (
                        <Circle sx={{ fontSize: 12, color: '#4CAF50' }} />
                      ) : null
                    }
                  >
                    <Avatar src={currentConversation.avatar}>
                      {currentConversation.type === 'group' ? <Group /> : <Person />}
                    </Avatar>
                  </Badge>
                  <Box flex={1}>
                    <Typography variant="body1" fontWeight="medium">
                      {currentConversation.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {currentConversation.isOnline ? 'Online' : 'Offline'}
                    </Typography>
                  </Box>
                  <IconButton size="small">
                    <MoreVert />
                  </IconButton>
                </Box>
              )}

              {/* Mensagens */}
              <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
                {currentMessages.map((message) => (
                  <Box
                    key={message.id}
                    display="flex"
                    justifyContent={message.isOwn ? 'flex-end' : 'flex-start'}
                    mb={2}
                  >
                    <Box
                      sx={{
                        maxWidth: '70%',
                        background: message.isOwn ? '#2196F3' : '#f5f5f5',
                        color: message.isOwn ? 'white' : 'text.primary',
                        borderRadius: 2,
                        p: 1.5,
                        position: 'relative'
                      }}
                    >
                      <Typography variant="body2">
                        {message.text}
                      </Typography>
                      <Box display="flex" alignItems="center" justifyContent="flex-end" gap={0.5} mt={0.5}>
                        <Typography variant="caption" sx={{ opacity: 0.7 }}>
                          {formatTime(message.timestamp)}
                        </Typography>
                        {message.isOwn && getStatusIcon(message.status)}
                      </Box>
                    </Box>
                  </Box>
                ))}
                <div ref={messagesEndRef} />
              </Box>

              {/* Input de Mensagem */}
              <Box sx={{ p: 2, borderTop: '1px solid #e0e0e0' }}>
                <Box display="flex" gap={1} alignItems="flex-end">
                  <IconButton size="small">
                    <AttachFile />
                  </IconButton>
                  <IconButton size="small">
                    <EmojiEmotions />
                  </IconButton>
                  <TextField
                    fullWidth
                    multiline
                    maxRows={4}
                    placeholder="Digite sua mensagem..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    size="small"
                  />
                  <IconButton
                    color="primary"
                    onClick={handleSendMessage}
                    disabled={!messageText.trim()}
                  >
                    <Send />
                  </IconButton>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Chat;
