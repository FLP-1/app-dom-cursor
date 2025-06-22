/**
 * Arquivo: [id].tsx
 * Caminho: src/pages/compras/[id].tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-01-27
 * Descrição: Página de detalhes de compra
 */

import React from 'react';
// import { useRouter } from 'next/router'; // Removido pois não está em uso
import Image from 'next/image';
import CompraHeader from '@/components/compras/CompraHeader';
import { Box, Button, Typography } from '@mui/material';
import { useMessages } from '@/hooks/useMessages';
import { comprasMessages } from '@/i18n/messages/compras.messages';

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
  const { messages } = useMessages(comprasMessages);
  // No futuro: buscar compra pelo id da rota

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.100' }}>
      <CompraHeader filtros={{ produto: '', data: '', grupo: '', status: '' }} setFiltros={() => {}} />
      <Box sx={{ maxWidth: 600, mx: 'auto', p: 3, bgcolor: 'background.paper', borderRadius: 2.5, boxShadow: 2 }}>
        <Typography variant="h5" sx={{ mt: 0, mb: 2 }}>{messages.details.title}</Typography>
        <Box sx={{ display: 'flex', gap: 3, alignItems: 'center', mb: 3 }}>
          <Image src={mockCompra.foto} alt={mockCompra.produto} width={80} height={80} sx={{ objectFit: 'cover', borderRadius: 2 }} />
          <Box>
            <Typography><strong>{messages.details.fields.product}:</strong> {mockCompra.produto}</Typography>
            <Typography><strong>{messages.details.fields.unit}:</strong> {mockCompra.unidade}</Typography>
            <Typography><strong>{messages.details.fields.quantity}:</strong> {mockCompra.quantidade}</Typography>
            <Typography><strong>{messages.details.fields.value}:</strong> R$ {mockCompra.valor.toFixed(2)}</Typography>
            <Typography><strong>{messages.details.fields.purchaseDate}:</strong> {mockCompra.dataCompra}</Typography>
            <Typography><strong>{messages.details.fields.group}:</strong> {mockCompra.grupo}</Typography>
            <Typography><strong>{messages.details.fields.status}:</strong> {mockCompra.status}</Typography>
          </Box>
        </Box>
        <Button variant="contained" color="primary" sx={{ borderRadius: 1.5, px: 2.5, py: 1, fontWeight: 600, fontSize: 16 }}>
          {messages.details.actions.edit}
        </Button>
      </Box>
    </Box>
  );
};

export default CompraDetalhePage; 