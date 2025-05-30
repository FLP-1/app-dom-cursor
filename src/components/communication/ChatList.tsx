import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  CircularProgress,
} from '@mui/material';
import {
  MoreVert as MoreVertIcon,
  Group as GroupIcon,
  Person as PersonIcon,
  Campaign as CampaignIcon,
} from '@mui/icons-material';
import { ChatRoom } from '../../lib/communication/types';
import { CommunicationService } from '../../lib/communication/service';
import { PermissionChecker } from '../../lib/permissions/checker';

interface ChatListProps {
  onSelectChat: (chatRoomId: string) => void;
  communicationService: CommunicationService;
  permissionChecker: PermissionChecker;
}

export const ChatList: React.FC<ChatListProps> = ({
  onSelectChat,
  communicationService,
  permissionChecker,
}) => {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [loading, setLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

  const loadChatRooms = useCallback(async () => {
    setLoading(true);
    try {
      const rooms = await communicationService.getChatRooms();
      setChatRooms(rooms);
    } catch (error) {
      console.error('Erro ao carregar salas de chat:', error);
    } finally {
      setLoading(false);
    }
  }, [communicationService]);

  useEffect(() => {
    loadChatRooms();
  }, [loadChatRooms]);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, chatId: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedChatId(chatId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedChatId(null);
  };

  const handleDeleteChat = async () => {
    if (!selectedChatId) return;

    try {
      // TODO: Implementar deleção de sala
      setChatRooms((prev) => prev.filter((room) => room.id !== selectedChatId));
    } catch (error) {
      console.error('Erro ao deletar sala:', error);
    }
    handleMenuClose();
  };

  const getChatIcon = (type: string) => {
    switch (type) {
      case 'group':
        return <GroupIcon />;
      case 'broadcast':
        return <CampaignIcon />;
      default:
        return <PersonIcon />;
    }
  };

  const formatLastMessage = (chatRoom: ChatRoom) => {
    if (!chatRoom.lastMessage) return 'Nenhuma mensagem';
    return `${chatRoom.lastMessage.sender.name}: ${chatRoom.lastMessage.content}`;
  };

  return (
    <Box sx={{ height: '100%', overflow: 'auto' }}>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
          <CircularProgress />
        </Box>
      ) : (
        <List>
          {chatRooms.map((chatRoom) => (
            <React.Fragment key={chatRoom.id}>
              <ListItem
                button
                onClick={() => onSelectChat(chatRoom.id)}
                secondaryAction={
                  permissionChecker.can('delete', 'chat') && (
                    <IconButton
                      edge="end"
                      onClick={(e) => handleMenuOpen(e, chatRoom.id)}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  )
                }
              >
                <ListItemAvatar>
                  <Avatar>{getChatIcon(chatRoom.type)}</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={chatRoom.name}
                  secondary={
                    <Box>
                      <Typography variant="body2" color="text.secondary" noWrap>
                        {formatLastMessage(chatRoom)}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {chatRoom.participants.length} participantes
                      </Typography>
                    </Box>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          ))}
        </List>
      )}

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleDeleteChat}>
          Deletar Sala
        </MenuItem>
      </Menu>
    </Box>
  );
}; 