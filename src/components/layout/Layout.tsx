/**
 * Arquivo: Layout.tsx
 * Caminho: src/components/layout/Layout.tsx
 * Criado em: 2025-06-13
 * Última atualização: 2025-06-13
 * Descrição: Layout principal da aplicação com menu lateral e área de conteúdo
 */

import React from 'react';
import { Box, CssBaseline, useTheme, useMediaQuery } from '@mui/material';
import SideMenu from '@/components/layout/SideMenu';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <CssBaseline />
      <SideMenu />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ml: { xs: 0, md: '240px' }, // Margem para o menu lateral
          mt: { xs: '64px', md: 0 }, // Margem top para AppBar mobile
          transition: 'margin 0.3s ease-in-out',
          minHeight: '100vh',
          backgroundColor: '#f8fafc'
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
