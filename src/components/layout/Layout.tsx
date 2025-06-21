/**
 * Arquivo: Layout.tsx
 * Caminho: src/components/layout/Layout.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

import React from 'react';
import { useRouter } from 'next/router';
import { Box, Drawer, List, ListItemButton, ListItemIcon, ListItemText, BottomNavigation, BottomNavigationAction, useMediaQuery, useTheme, AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import Link from 'next/link';
import { menuItems } from '@/config/menu';
import SettingsIcon from '@mui/icons-material/Settings';
import { useAuth } from '@/contexts/AuthContext';
import LogoutIcon from '@mui/icons-material/Logout';
import StarIcon from '@mui/icons-material/Star';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const router = useRouter();
  const [bottomNav, setBottomNav] = React.useState(0);
  const { signOut } = useAuth();

  // Favoritos do usuário (localStorage)
  const [favoritos, setFavoritos] = React.useState<string[]>([]);
  React.useEffect(() => {
    const fav = localStorage.getItem('menuFavoritos');
    if (fav) setFavoritos(JSON.parse(fav));
  }, []);

  // Mapeamento dos cards para path e ícone
  const cardMap = {
    dashboard: { label: 'Dashboard', icon: menuItems.find(i => i.label === 'Dashboard')?.icon, path: '/dashboard' },
    ponto: { label: 'Ponto', icon: menuItems.find(i => i.label === 'Ponto')?.icon, path: '/ponto' },
    relatorios: { label: 'Relatórios', icon: menuItems.find(i => i.label === 'Relatórios')?.icon, path: '/relatorios' },
    compras: { label: 'Compras', icon: menuItems.find(i => i.label === 'Compras')?.icon, path: '/compras' },
    tarefas: { label: 'Tarefas', icon: menuItems.find(i => i.label === 'Tarefas')?.icon, path: '/tarefas' },
    empregados: { label: 'Empregados', icon: menuItems.find(i => i.label === 'Empregados')?.icon, path: '/empregados-domesticos' },
    esocial: { label: 'eSocial', icon: menuItems.find(i => i.label === 'eSocial')?.icon, path: '/esocial' },
    alertas: { label: 'Alertas', icon: menuItems.find(i => i.label === 'Alertas')?.icon, path: '/alerts' },
    usuarios: { label: 'Usuários', icon: menuItems.find(i => i.label === 'Usuários')?.icon, path: '/usuarios' },
    parceiros: { label: 'Parceiros', icon: menuItems.find(i => i.label === 'Parceiros')?.icon, path: '/parceiros' },
    operacoes: { label: 'Operações', icon: menuItems.find(i => i.label === 'Financeiro')?.icon, path: '/operacoes-financeiras' },
    folha: { label: 'Folha de Pagamento', icon: menuItems.find(i => i.label === 'Financeiro')?.icon, path: '/operacoes-financeiras' },
    relatoriosfin: { label: 'Relatórios Financeiros', icon: menuItems.find(i => i.label === 'Relatórios')?.icon, path: '/relatorios' },
    mensagens: { label: 'Mensagens', icon: menuItems.find(i => i.label === 'Mensagens')?.icon, path: '/chat' },
    grupos: { label: 'Grupos', icon: menuItems.find(i => i.label === 'Usuários')?.icon, path: '/usuarios' },
    preferencias: { label: 'Preferências', icon: menuItems.find(i => i.label === 'Configurações')?.icon, path: '/configuracoes' },
    parceiros: { label: 'Parceiros', icon: menuItems.find(i => i.label === 'Parceiros')?.icon, path: '/parceiros' },
  };

  // Se não houver favoritos, usar padrão
  const favoritosMenu = favoritos.length > 0
    ? favoritos.slice(0, 3).map(key => cardMap[key]).filter(Boolean)
    : [cardMap.dashboard, cardMap.ponto, cardMap.relatorios];

  // Determina quais itens vão para o BottomNavigation e quais vão para o overflow
  const mainMenu = menuItems.slice(0, 5);
  const overflowMenu = menuItems.length > 5 ? menuItems.slice(5) : [];

  React.useEffect(() => {
    // Atualiza o valor do BottomNavigation conforme a rota
    const idx = mainMenu.findIndex(item => router.pathname.startsWith(item.path));
    setBottomNav(idx === -1 ? 0 : idx);
  }, [router.pathname]);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Drawer lateral para desktop */}
      {!isMobile && (
        <Drawer variant="permanent" sx={{ width: 220, flexShrink: 0, [`& .MuiDrawer-paper`]: { width: 220, boxSizing: 'border-box' } }}>
          <Toolbar>
            <Typography variant="h6">DOM</Typography>
            <Box sx={{ flexGrow: 1 }} />
            <IconButton color="inherit" aria-label="logout" onClick={signOut} size="large">
              <LogoutIcon />
            </IconButton>
          </Toolbar>
          <List>
            {menuItems.map((item) => (
              <ListItemButton
                key={item.label}
                component={Link}
                href={item.path}
                selected={router.pathname.startsWith(item.path)}
              >
                <ListItemIcon>{React.createElement(item.icon)}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            ))}
          </List>
        </Drawer>
      )}
      {/* Conteúdo principal */}
      <Box component="main" sx={{ flexGrow: 1, p: { xs: 1, sm: 3 }, width: '100%' }}>
        {/* AppBar para mobile */}
        {isMobile && (
          <AppBar position="static" color="default" elevation={1} sx={{ mb: 1 }}>
            <Toolbar>
              <Typography variant="h6" sx={{ flexGrow: 1 }}>DOM</Typography>
              <IconButton color="inherit" aria-label="logout" onClick={signOut} size="large">
                <LogoutIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
        )}
        {children}
      </Box>
      {/* BottomNavigation para mobile substituído por menu horizontal com scroll */}
      {isMobile && (
        <Box
          sx={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1200,
            boxShadow: 3,
            bgcolor: 'background.paper',
            display: 'flex',
            justifyContent: 'space-around',
            py: 1,
          }}
          component="nav"
          aria-label="Menu principal"
        >
          {/* Até 3 favoritos */}
          {favoritosMenu.map((item) => (
            <Box
              key={item.label}
              sx={{
                flex: '1 1 0',
                textAlign: 'center',
                cursor: 'pointer',
                color: router.pathname.startsWith(item.path)
                  ? theme.palette.primary.main
                  : theme.palette.text.secondary,
              }}
              onClick={() => router.push(item.path)}
              aria-label={item.label}
              tabIndex={0}
              role="button"
            >
              {item.icon && React.createElement(item.icon, { fontSize: 'medium' })}
              <Typography variant="caption" sx={{ display: 'block', fontSize: 12 }}>
                {item.label}
              </Typography>
            </Box>
          ))}
          {/* Ícone '+' */}
          <Box
            key="Mais"
            sx={{
              flex: '1 1 0',
              textAlign: 'center',
              cursor: 'pointer',
              color: router.pathname === '/mais-funcionalidades'
                ? theme.palette.primary.main
                : theme.palette.text.secondary,
            }}
            onClick={() => router.push('/mais-funcionalidades')}
            aria-label="Mais funcionalidades"
            tabIndex={0}
            role="button"
          >
            <StarIcon fontSize="medium" />
            <Typography variant="caption" sx={{ display: 'block', fontSize: 12 }}>
              Mais
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export { Layout }; 
