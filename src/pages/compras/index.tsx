/**
 * Arquivo: index.tsx
 * Caminho: src/pages/compras/index.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Página de listagem e filtro de compras, integrando cabeçalho e lista de compras.
 */

import React, { useState } from 'react';
import CompraHeader from '@/components/compras/CompraHeader';
import CompraList from '@/components/compras/CompraList';
import { Layout } from '@/components/layout/Layout';
import { Box } from '@mui/material';

const ComprasPage: React.FC = () => {
  const [filtros, setFiltros] = useState({ produto: '', data: '', grupo: '', status: '' });

  return (
    <Layout>
      <CompraHeader filtros={filtros} setFiltros={setFiltros} />
      <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
        <CompraList {...filtros} />
      </Box>
    </Layout>
  );
};

export default ComprasPage; 
