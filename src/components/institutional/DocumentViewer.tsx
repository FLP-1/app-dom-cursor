/**
 * Arquivo: DocumentViewer.tsx
 * Caminho: src/components/institutional/DocumentViewer.tsx
 * Criado em: 2024-06-07
 * Última atualização: 2024-06-07
 * Descrição: Componente para visualização de documentos.
 */

import { Box, Paper, Typography } from '@mui/material';

interface DocumentViewerProps {
  title: string;
  content: string;
}

export function DocumentViewer({ title, content }: DocumentViewerProps) {
  return (
    <Paper sx={{ p: 3 }}>
      <Box>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body1" component="div">
          {content}
        </Typography>
      </Box>
    </Paper>
  );
} 
