import React from 'react';
import CompraHeader from '../../components/compras/CompraHeader';
import CompraList from '../../components/compras/CompraList';

const ComprasPage: React.FC = () => {
  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      <CompraHeader />
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: 24 }}>
        <CompraList />
      </div>
    </div>
  );
};

export default ComprasPage; 