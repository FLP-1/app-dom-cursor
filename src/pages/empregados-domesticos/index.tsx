/**
 * Arquivo: index.tsx
 * Caminho: src/pages/empregados-domesticos/index.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Página de listagem de empregados domésticos
 */

import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { empregadoDomesticoService } from '@/services/empregado-domestico.service';
import { EmpregadoDomestico } from '@/types/empregado-domestico';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { DataTable } from '@/components/common/DataTable';
import { PageHeader } from '@/components/common/PageHeader';
import { TableActions } from '@/components/common/TableActions';
import { useRouter } from 'next/router';
import { formatDateBR } from '@/utils/date';
import { Layout } from '@/components/layout/Layout';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import { tooltips } from '@/i18n/tooltips';

export default function EmpregadosDomesticosListPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const [empregados, setEmpregados] = useState<EmpregadoDomestico[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadEmpregados = async () => {
    try {
      setLoading(true);
      const data = await empregadoDomesticoService.list();
      setEmpregados(data);
      setError(null);
    } catch (err) {
      setError(t('Erro ao carregar empregados domésticos.'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEmpregados();
  }, [t]);

  const columns = [
    { id: 'nomeCompleto', label: t('Nome Completo'), sortable: true },
    { id: 'cpf', label: t('CPF'), sortable: true },
    { id: 'dataNascimento', label: t('Nascimento'), sortable: true, render: (v: unknown) => v ? formatDateBR(v as string) : '-' },
    { id: 'email', label: t('E-mail'), sortable: true },
    { id: 'telefone', label: t('Telefone'), sortable: false },
    { id: 'matricula', label: t('Matrícula'), sortable: true },
    { id: 'categoria', label: t('Categoria'), sortable: true },
    { id: 'actions', label: t('Ações'), render: (_: unknown, row: EmpregadoDomestico) => (
      <TableActions
        actions={[
          {
            icon: <VisibilityIcon color="info" />, 
            tooltip: tooltips.visualizar.pt,
            onClick: () => router.push(`/empregados-domesticos/${row.id}`),
            ariaLabel: 'Visualizar empregado doméstico'
          },
          {
            icon: <EditIcon color="primary" />, 
            tooltip: tooltips.editar.pt,
            onClick: () => router.push(`/empregados-domesticos/${row.id}/editar`),
            ariaLabel: 'Editar empregado doméstico'
          }
        ]}
      />
    ) },
  ];

  if (loading && empregados.length === 0) {
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
          title={t('Empregados Domésticos')}
          onAdd={() => router.push('/empregados-domesticos/novo')}
          onRefresh={loadEmpregados}
          addButtonText={t('Novo Empregado')}
        />
        <DataTable
          columns={columns}
          data={empregados}
          loading={loading}
          error={error}
        />
      </Box>
    </Layout>
  );
}

// Sugestão de testes automatizados:
// - Deve exibir a lista de empregados corretamente
// - Deve filtrar/buscar por nome, CPF, e-mail
// - Deve navegar para detalhes e edição ao clicar nos botões
// - Deve exibir mensagem de erro se a API falhar
// - Deve garantir acessibilidade e responsividade 
