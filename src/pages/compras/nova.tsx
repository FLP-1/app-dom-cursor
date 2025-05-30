import React from 'react';
import CompraHeader from '../../components/compras/CompraHeader';
import CompraForm from '../../components/compras/CompraForm';
import Box from '@mui/material/Box';

const NovaCompraPage: React.FC = () => {
  return (
    <Box sx={{ minHeight: '100vh', background: '#f5f5f5' }}>
      <CompraHeader />
      <Box sx={{ maxWidth: 600, margin: '0 auto', p: 3 }}>
        <CompraForm />
      </Box>
    </Box>
  );
};

export default NovaCompraPage; 