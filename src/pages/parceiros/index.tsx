/**
 * Arquivo: index.tsx
 * Caminho: src/pages/parceiros/index.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Página de listagem de parceiros
 */

import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { parceiroService } from '@/services/parceiro.service';
import { Parceiro } from '@/types/parceiro';
import { useTranslation } from 'react-i18next';
import { DataTable } from '@/components/common/DataTable';
import { PageHeader } from '@/components/common/PageHeader';
import { TableActions } from '@/components/common/TableActions';
import { useRouter } from 'next/router';
import { Layout } from '@/components/layout/Layout';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import { tooltips } from '@/i18n/tooltips';

export default function ParceirosListPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const [parceiros, setParceiros] = useState<Parceiro[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadParceiros = async () => {
    try {
      setLoading(true);
      const data = await parceiroService.list();
      setParceiros(data);
      setError(null);
    } catch (err) {
      setError(t('Erro ao carregar parceiros.'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadParceiros();
  }, [t]);

  const columns = [
    { id: 'nome', label: t('Nome'), sortable: true },
    { id: 'cnpj', label: t('CNPJ'), sortable: true },
    { id: 'email', label: t('E-mail'), sortable: true },
    { id: 'telefone', label: t('Telefone'), sortable: false },
    { id: 'responsavel', label: t('Responsável'), sortable: true },
    { id: 'actions', label: t('Ações'), render: (_: unknown, row: Parceiro) => (
      <TableActions
        actions={[
          {
            icon: <VisibilityIcon color="info" />, 
            tooltip: tooltips.visualizar.pt,
            onClick: () => router.push(`/parceiros/${row.id}`),
            ariaLabel: 'Visualizar parceiro'
          },
          {
            icon: <EditIcon color="primary" />, 
            tooltip: tooltips.editar.pt,
            onClick: () => router.push(`/parceiros/${row.id}/editar`),
            ariaLabel: 'Editar parceiro'
          }
        ]}
      />
    ) },
  ];

  if (loading && parceiros.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={3}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Layout>
      <Box sx={{ p: 3 }}>
        <PageHeader
          title={t('Parceiros')}
          onAdd={() => router.push('/parceiros/novo')}
          onRefresh={loadParceiros}
          addButtonText={t('Novo Parceiro')}
        />
        <DataTable
          columns={columns}
          data={parceiros}
          loading={loading}
          error={error}
        />
      </Box>
    </Layout>
  );
}

// Sugestão de testes automatizados:
// - Deve exibir a lista de parceiros corretamente
// - Deve filtrar/buscar por nome, CNPJ, e-mail
// - Deve navegar para detalhes e edição ao clicar nos botões
// - Deve exibir mensagem de erro se a API falhar
// - Deve garantir acessibilidade e responsividade 
