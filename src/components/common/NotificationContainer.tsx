import React, { useEffect, useState } from 'react';
import { Box, Snackbar, Alert, AlertTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Notification, notificationService, NotificationType } from '../../services/NotificationService';

export const NotificationContainer: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const unsubscribe = notificationService.subscribe((notification) => {
      setNotifications((prev) => [...prev, notification]);

      if (notification.duration) {
        setTimeout(() => {
          setNotifications((prev) =>
            prev.filter((n) => n.id !== notification.id)
          );
        }, notification.duration);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleClose = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const handleAction = (notification: Notification) => {
    if (notification.action) {
      notification.action.onClick();
      handleClose(notification.id);
    }
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 24,
        right: 24,
        zIndex: 2000,
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
      }}
    >
      {notifications.map((notification) => (
        <Snackbar
          key={notification.id}
          open={true}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert
            severity={notification.type}
            action={
              <IconButton
                size="small"
                aria-label="fechar"
                color="inherit"
                onClick={() => handleClose(notification.id)}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            }
            sx={{
              width: '100%',
              minWidth: 300,
              maxWidth: 400,
              boxShadow: 3,
            }}
          >
            <AlertTitle>{notification.title}</AlertTitle>
            {notification.message}
            {notification.action && (
              <Box
                sx={{
                  mt: 1,
                  display: 'flex',
                  justifyContent: 'flex-end',
                }}
              >
                <IconButton
                  size="small"
                  onClick={() => handleAction(notification)}
                  color="inherit"
                >
                  {notification.action.label}
                </IconButton>
              </Box>
            )}
          </Alert>
        </Snackbar>
      ))}
    </Box>
  );
}; 