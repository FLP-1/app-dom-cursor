/**
 * Arquivo: layout.tsx
 * Caminho: src/app/esocial/events/layout.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

import { Box } from '@mui/material';
import { Header } from '@/components/Header';

export default function EsocialEventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {children}
      </Box>
    </Box>
  );
} 
