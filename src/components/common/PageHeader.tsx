/**
 * Arquivo: PageHeader.tsx
 * Caminho: src/components/common/PageHeader.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

import React from 'react';
import { Box, Typography } from '@mui/material';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle }) => (
  <Box mb={2}>
    <Typography variant="h4" component="h1">{title}</Typography>
    {subtitle && (
      <Typography variant="subtitle1" color="textSecondary">{subtitle}</Typography>
    )}
  </Box>
);

export { PageHeader }; 
