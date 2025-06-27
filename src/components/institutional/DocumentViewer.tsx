/**
 * Arquivo: DocumentViewer.tsx
 * Caminho: src/components/institutional/DocumentViewer.tsx
 * Criado em: 2024-06-07
 * Última atualização: 2025-06-25
 * Descrição: Componente para visualização de documentos com renderização de Markdown e layout Material UI.
 */

import { Box, Paper, Typography } from '@mui/material';
import ReactMarkdown from 'react-markdown';

interface DocumentViewerProps {
  title: string;
  content: string;
}

export function DocumentViewer({ title, content }: DocumentViewerProps) {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}>
      <Paper sx={{ maxWidth: 800, width: '100%', borderRadius: 3, boxShadow: 6 }}>
        <Box sx={{ p: 4, maxHeight: '80vh', overflowY: 'auto' }}>
          <Typography variant="h4" component="h1" gutterBottom color="primary" fontWeight="bold">
            {title}
          </Typography>
          <ReactMarkdown
            components={{
              h1: ({node, ...props}) => <Typography variant="h5" fontWeight="bold" gutterBottom {...props} />,
              h2: ({node, ...props}) => <Typography variant="h6" fontWeight="bold" gutterBottom {...props} />,
              h3: ({node, ...props}) => <Typography variant="subtitle1" fontWeight="bold" gutterBottom {...props} />,
              p: ({node, ...props}) => <Typography variant="body1" paragraph {...props} />,
              li: ({node, ...props}) => <li style={{ marginBottom: 8 }} {...props} />,
              strong: ({node, ...props}) => <strong style={{ color: '#764ba2' }} {...props} />,
            }}
          >
            {content}
          </ReactMarkdown>
        </Box>
      </Paper>
    </Box>
  );
} 
