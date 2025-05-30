import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, CircularProgress } from '@mui/material';
import { parceiroService } from '../../services/parceiro.service';
import { Parceiro } from '../../types/parceiro';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { DataTable } from '../../components/common/DataTable';

export default function ParceirosListPage() {
  const { t } = useTranslation();
  const [parceiros, setParceiros] = useState<Parceiro[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    parceiroService.list()
      .then(setParceiros)
      .catch(() => setError(t('Erro ao carregar parceiros.')))
      .finally(() => setLoading(false));
  }, [t]);

  const columns = [
    { id: 'nome', label: t('Nome'), sortable: true },
    { id: 'cnpj', label: t('CNPJ'), sortable: true },
    { id: 'email', label: t('E-mail'), sortable: true },
    { id: 'telefone', label: t('Telefone'), sortable: false },
    { id: 'responsavel', label: t('Responsável'), sortable: true },
    { id: 'actions', label: t('Ações'), render: (_: unknown, row: Parceiro) => (
      <Box display="flex" gap={1}>
        <Link href={`/parceiros/[id]`.replace('[id]', row.id)} passHref legacyBehavior>
          <Button size="small" variant="outlined" color="primary">{t('Detalhes')}</Button>
        </Link>
        <Link href={`/parceiros/[id]/editar`.replace('[id]', row.id)} passHref legacyBehavior>
          <Button size="small" variant="outlined" color="secondary">{t('Editar')}</Button>
        </Link>
      </Box>
    ) },
  ];

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', mt: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4">{t('Parceiros')}</Typography>
        <Link href="/parceiros/novo" passHref legacyBehavior>
          <Button variant="contained" color="primary">{t('Novo Parceiro')}</Button>
        </Link>
      </Box>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight={300}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <DataTable
          columns={columns as any}
          data={parceiros}
          defaultSort="nome"
          onRowClick={(row: Parceiro) => window.location.href = `/parceiros/${row.id}`}
        />
      )}
    </Box>
  );
}

// Sugestão de testes automatizados:
// - Deve exibir a lista de parceiros corretamente
// - Deve filtrar/buscar por nome, CNPJ, e-mail
// - Deve navegar para detalhes e edição ao clicar nos botões
// - Deve exibir mensagem de erro se a API falhar
// - Deve garantir acessibilidade e responsividade 