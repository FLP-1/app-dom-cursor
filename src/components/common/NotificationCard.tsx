/**
 * Arquivo: NotificationCard.tsx
 * Caminho: src/components/common/NotificationCard.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
  Chip,
  Stack,
} from '@mui/material';
import {
  Error as ErrorIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  Close as CloseIcon,
  Notifications as NotificationsIcon,
  Email as EmailIcon,
  Sms as SmsIcon,
  WhatsApp as WhatsAppIcon,
} from '@mui/icons-material';

export enum NotificationPriority {
  NORMAL = 'NORMAL',
  ERROR = 'ERROR',
  CRITICAL = 'CRITICAL',
  URGENT = 'URGENT',
}

export enum NotificationChannel {
  PUSH = 'PUSH',
  EMAIL = 'EMAIL',
  SMS = 'SMS',
  WHATSAPP = 'WHATSAPP',
}

interface NotificationCardProps {
  title: string;
  message: string;
  priority: NotificationPriority;
  channels: NotificationChannel[];
  timestamp: Date;
  onClose?: () => void;
  onAction?: () => void;
  actionLabel?: string;
}

const priorityConfig = {
  [NotificationPriority.NORMAL]: {
    color: 'info',
    icon: InfoIcon,
  },
  [NotificationPriority.ERROR]: {
    color: 'error',
    icon: ErrorIcon,
  },
  [NotificationPriority.CRITICAL]: {
    color: 'warning',
    icon: WarningIcon,
  },
  [NotificationPriority.URGENT]: {
    color: 'error',
    icon: ErrorIcon,
  },
};

const channelIcons = {
  [NotificationChannel.PUSH]: NotificationsIcon,
  [NotificationChannel.EMAIL]: EmailIcon,
  [NotificationChannel.SMS]: SmsIcon,
  [NotificationChannel.WHATSAPP]: WhatsAppIcon,
};

export const NotificationCard: React.FC<NotificationCardProps> = ({
  title,
  message,
  priority,
  channels,
  timestamp,
  onClose,
  onAction,
  actionLabel,
}) => {
  const { color, icon: PriorityIcon } = priorityConfig[priority];

  return (
    <Card
      sx={{
        mb: 2,
        borderLeft: 4,
        borderColor: `${color}.main`,
      }}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
          <Box display="flex" alignItems="center" gap={1}>
            <PriorityIcon color={color as 'info' | 'error' | 'warning'} />
            <Typography variant="h6" component="div">
              {title}
            </Typography>
          </Box>
          {onClose && (
            <IconButton size="small" onClick={onClose}>
              <CloseIcon />
            </IconButton>
          )}
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {message}
        </Typography>

        <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
          <Stack direction="row" spacing={1}>
            {channels.map((channel) => {
              const ChannelIcon = channelIcons[channel];
              return (
                <Chip
                  key={channel}
                  icon={<ChannelIcon />}
                  label={channel}
                  size="small"
                  variant="outlined"
                  color={color as 'info' | 'error' | 'warning'}
                />
              );
            })}
          </Stack>

          <Typography variant="caption" color="text.secondary">
            {new Date(timestamp).toLocaleString()}
          </Typography>
        </Box>

        {onAction && actionLabel && (
          <Box mt={2} display="flex" justifyContent="flex-end">
            <Chip
              label={actionLabel}
              onClick={onAction}
              color={color as 'info' | 'error' | 'warning'}
              variant="outlined"
            />
          </Box>
        )}
      </CardContent>
    </Card>
  );
}; 
