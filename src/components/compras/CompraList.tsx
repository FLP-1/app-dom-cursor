import React from 'react';
import Image from 'next/image';

const mockCompras = [
  {
    id: 1,
    produto: 'Arroz 5kg',
    foto: '/produtos/arroz.jpg',
    unidade: 'Pacote',
    quantidade: 2,
    valor: 25.90,
    dataCompra: '2024-05-20',
    grupo: 'Família A',
    status: 'Pendente',
  },
  {
    id: 2,
    produto: 'Leite Integral',
    foto: '/produtos/leite.jpg',
    unidade: 'Litro',
    quantidade: 12,
    valor: 4.50,
    dataCompra: '2024-05-22',
    grupo: 'Família B',
    status: 'Realizada',
  },
  {
    id: 3,
    produto: 'Detergente',
    foto: '/produtos/detergente.jpg',
    unidade: 'Unidade',
    quantidade: 6,
    valor: 2.99,
    dataCompra: '2024-05-23',
    grupo: 'Família A',
    status: 'Pendente',
  },
];

const CompraList: React.FC = () => (
  <div style={{ background: '#fff', borderRadius: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.04)', padding: 24 }}>
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr style={{ background: '#f7f8fa' }}>
          <th style={{ padding: 8, textAlign: 'left' }}>Foto</th>
          <th style={{ padding: 8, textAlign: 'left' }}>Produto</th>
          <th style={{ padding: 8, textAlign: 'left' }}>Unidade</th>
          <th style={{ padding: 8, textAlign: 'left' }}>Quantidade</th>
          <th style={{ padding: 8, textAlign: 'left' }}>Valor</th>
          <th style={{ padding: 8, textAlign: 'left' }}>Data da Compra</th>
          <th style={{ padding: 8, textAlign: 'left' }}>Grupo</th>
          <th style={{ padding: 8, textAlign: 'left' }}>Status</th>
        </tr>
      </thead>
      <tbody>
        {mockCompras.map((compra) => (
          <tr key={compra.id} style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: 8 }}>
              <Image src={compra.foto} alt={compra.produto} width={48} height={48} style={{ objectFit: 'cover', borderRadius: 6 }} />
            </td>
            <td style={{ padding: 8 }}>{compra.produto}</td>
            <td style={{ padding: 8 }}>{compra.unidade}</td>
            <td style={{ padding: 8 }}>{compra.quantidade}</td>
            <td style={{ padding: 8 }}>R$ {compra.valor.toFixed(2)}</td>
            <td style={{ padding: 8 }}>{compra.dataCompra}</td>
            <td style={{ padding: 8 }}>{compra.grupo}</td>
            <td style={{ padding: 8 }}>{compra.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default CompraList; 