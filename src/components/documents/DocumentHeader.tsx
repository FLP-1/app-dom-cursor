/**
 * Arquivo: DocumentHeader.tsx
 * Caminho: src/components/documents/DocumentHeader.tsx
 * Criado em: 2025-06-07
 * Última atualização: 2025-06-07
 * Descrição: Componente de cabeçalho para a página de gestão de documentos, contendo título, botão de upload e campo de busca
 */

import React from 'react';
import { Box, Typography, Button, TextField } from '@mui/material';
import { tooltips } from '@/i18n/tooltips';

interface DocumentHeaderProps {
  onUploadClick: () => void;
  onSearch: (value: string) => void;
  onFilter: (value: string) => void;
}

const DocumentHeader: React.FC<DocumentHeaderProps> = ({ onUploadClick, onSearch, onFilter }) => {
  return (
    <Box 
      component="header"
      sx={{
        padding: 3,
        backgroundColor: 'background.paper',
        borderBottom: '1px solid',
        borderColor: 'divider'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography variant="h4" sx={{ m: 0, fontWeight: 700, color: 'primary.dark' }}>
          Gestão de Documentos
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
        <Button 
          onClick={onUploadClick}
          variant="contained"
          sx={{
            backgroundColor: 'primary.main',
            color: 'white',
            '&:hover': {
              backgroundColor: 'primary.dark'
            }
          }}
        >
          Upload
        </Button>

        <TextField
          placeholder="Buscar documentos..."
          onChange={(e) => onSearch(e.target.value)}
          size="small"
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 1
            }
          }}
        />
      </Box>
    </Box>
  );
};

export default DocumentHeader; 
