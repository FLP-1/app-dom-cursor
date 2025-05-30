import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, CircularProgress } from '@mui/material';
import { DataTable } from '../../components/common/DataTable';
import { EmpregadoDomestico } from '../../types/empregado-domestico';
import { empregadoDomesticoService } from '../../services/empregado-domestico.service';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { empregadoDomesticoMessages } from '../../i18n/messages';
import { formatDateBR } from '../../utils/date';

export default function EmpregadosDomesticosListPage() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as 'pt' | 'en';
  const [empregados, setEmpregados] = useState<EmpregadoDomestico[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // TODO: Substituir por empregadoDomesticoService.list() quando implementado
    fetch('/api/empregado-domestico')
      .then((res) => res.json())
      .then(setEmpregados)
      .catch(() => setError(t(empregadoDomesticoMessages[lang].genericError)))
      .finally(() => setLoading(false));
  }, [t, lang]);

  const columns = [
    { id: 'nomeCompleto', label: t('Nome Completo'), sortable: true },
    { id: 'cpf', label: t('CPF'), sortable: true },
    { id: 'dataNascimento', label: t('Nascimento'), sortable: true, render: (v: unknown) => v ? formatDateBR(v as string) : '-' },
    { id: 'email', label: t('E-mail'), sortable: true },
    { id: 'telefone', label: t('Telefone'), sortable: false },
    { id: 'matricula', label: t('Matrícula'), sortable: true },
    { id: 'categoria', label: t('Categoria'), sortable: true },
    { id: 'actions', label: t('Ações'), render: (_: unknown, row: EmpregadoDomestico) => (
      <Box display="flex" gap={1}>
        <Link href={`/empregados-domesticos/[id]`.replace('[id]', row.id)} passHref legacyBehavior>
          <Button size="small" variant="outlined" color="primary">{t('Detalhes')}</Button>
        </Link>
        <Link href={`/empregados-domesticos/[id]/editar`.replace('[id]', row.id)} passHref legacyBehavior>
          <Button size="small" variant="outlined" color="secondary">{t('Editar')}</Button>
        </Link>
      </Box>
    ) },
  ];

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', mt: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4">{t('Empregados Domésticos')}</Typography>
        <Link href="/empregados-domesticos/novo" passHref legacyBehavior>
          <Button variant="contained" color="primary">{t('Novo Empregado')}</Button>
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
          data={empregados}
          defaultSort="nomeCompleto"
          onRowClick={(row: EmpregadoDomestico) => window.location.href = `/empregados-domesticos/${row.id}`}
        />
      )}
    </Box>
  );
}

// Sugestão de testes automatizados:
// - Deve exibir a lista de empregados corretamente
// - Deve filtrar/buscar por nome, CPF, e-mail
// - Deve navegar para detalhes e edição ao clicar nos botões
// - Deve exibir mensagem de erro se a API falhar
// - Deve garantir acessibilidade e responsividade 