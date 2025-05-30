import React from 'react';
import Link from 'next/link';

const CompraHeader: React.FC = () => (
  <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#fff', padding: '16px 32px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', borderBottom: '1px solid #e0e0e0', position: 'sticky', top: 0, zIndex: 10 }}>
    <h2 style={{ margin: 0, fontWeight: 700, fontSize: 24, color: '#1c3a5b' }}>Gestão de Compras</h2>
    <Link href="/compras/nova">
      <button style={{ background: '#29ABE2', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 20px', fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>+ Nova Compra</button>
    </Link>
  </header>
);

export default CompraHeader; 