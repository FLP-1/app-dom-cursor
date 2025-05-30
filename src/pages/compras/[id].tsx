import React from 'react';
// import { useRouter } from 'next/router'; // Removido pois não está em uso
import Image from 'next/image';
import CompraHeader from '../../components/compras/CompraHeader';

// Mock para exibição
const mockCompra = {
  id: 1,
  produto: 'Arroz 5kg',
  foto: '/produtos/arroz.jpg',
  unidade: 'Pacote',
  quantidade: 2,
  valor: 25.90,
  dataCompra: '2024-05-20',
  grupo: 'Família A',
  status: 'Pendente',
};

const CompraDetalhePage: React.FC = () => {
  // No futuro: buscar compra pelo id da rota

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      <CompraHeader />
      <div style={{ maxWidth: 600, margin: '0 auto', padding: 24, background: '#fff', borderRadius: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
        <h3 style={{ marginTop: 0 }}>Detalhes da Compra</h3>
        <div style={{ display: 'flex', gap: 24, alignItems: 'center', marginBottom: 24 }}>
          <Image src={mockCompra.foto} alt={mockCompra.produto} width={80} height={80} style={{ objectFit: 'cover', borderRadius: 8 }} />
          <div>
            <div><strong>Produto:</strong> {mockCompra.produto}</div>
            <div><strong>Unidade:</strong> {mockCompra.unidade}</div>
            <div><strong>Quantidade:</strong> {mockCompra.quantidade}</div>
            <div><strong>Valor:</strong> R$ {mockCompra.valor.toFixed(2)}</div>
            <div><strong>Data da Compra:</strong> {mockCompra.dataCompra}</div>
            <div><strong>Grupo:</strong> {mockCompra.grupo}</div>
            <div><strong>Status:</strong> {mockCompra.status}</div>
          </div>
        </div>
        <button style={{ background: '#29ABE2', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 20px', fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>Editar</button>
      </div>
    </div>
  );
};

export default CompraDetalhePage; 