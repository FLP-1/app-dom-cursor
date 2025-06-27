/**
 * Arquivo: SideMenu.tsx
 * Caminho: src/components/layout/SideMenu.tsx
 * Criado em: 2025-01-27
 * Última atualização: 2025-06-13
 * Descrição: Menu lateral da aplicação, integrado ao menu central e permissões do usuário.
 */

import React, { useState } from 'react';
import { 
  Drawer, 
  List, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  Box, 
  Tooltip, 
  IconButton,
  useTheme,
  useMediaQuery,
  AppBar,
  Toolbar,
  Typography
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import Link from 'next/link';
import { menuItems } from '@/config/menu';
import { useAuth } from '@/hooks/useAuth';
import { PermissionChecker } from '@/lib/permissions/checker';
import { useLanguage } from '@/contexts/LanguageContext';
import { menuMessages } from '@/i18n/messages/menu.messages';
import { tooltips } from '@/i18n/tooltips';

const SideMenu: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { user } = useAuth();
  const { language } = useLanguage();
  const messages = menuMessages[language];
  
  // Fallback: se não houver user, mostra todos os itens
  const permissionChecker = user ? new PermissionChecker({ role: user.role }) : null;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Função para internacionalizar o label
  const getLabel = (item: typeof menuItems[number]) => {
    const key = item.label.toLowerCase() as keyof typeof messages;
    return messages[key] || item.label;
  };

  // Função para obter tooltip do dicionário central
  const getTooltip = (item: typeof menuItems[number]) => {
    const tooltipKey = item.label.toLowerCase() as keyof typeof tooltips;
    return tooltips[tooltipKey]?.[language] || '';
  };

  // Filtra itens conforme permissão
  const filteredMenu = menuItems.filter(item => {
    if (!item.permission || !permissionChecker) return true;
    const [subject, action] = item.permission.split(':');
    return permissionChecker.can(action, subject);
  });

  const drawerContent = (
    <Box sx={{ overflow: 'auto', mt: isMobile ? 0 : 8 }}>
      {isMobile && (
        <Box sx={{ p: 2, borderBottom: '1px solid rgba(0,0,0,0.12)' }}>
          <Typography variant="h6" color="primary">
            Menu
          </Typography>
        </Box>
      )}
      <List>
        {filteredMenu.map((item) => {
          const Icon = item.icon;
          const tooltip = getTooltip(item);
          
          return (
            <Tooltip 
              key={item.label} 
              title={tooltip} 
              placement="right"
              arrow
            >
              <ListItemButton 
                component={Link} 
                href={item.path}
                onClick={() => isMobile && setMobileOpen(false)}
              >
                <ListItemIcon>{Icon ? <Icon /> : null}</ListItemIcon>
                <ListItemText primary={getLabel(item)} />
              </ListItemButton>
            </Tooltip>
          );
        })}
      </List>
    </Box>
  );

  return (
    <>
      {/* AppBar para mobile */}
      {isMobile && (
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - 240px)` },
            ml: { sm: `240px` },
            display: { md: 'none' }
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
      )}

      {/* Drawer para desktop */}
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? mobileOpen : true}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Melhora performance em mobile
        }}
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default SideMenu;
