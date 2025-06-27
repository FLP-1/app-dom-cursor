/**
 * Arquivo: index.tsx
 * Caminho: src/pages/empregados-domesticos/index.tsx
 * Criado em: 2024-06-13
 * Última atualização: 2024-06-13
 * Descrição: Página de listagem de empregados domésticos com busca real na API e botão para cadastro.
 */

import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Button, CircularProgress, Alert, Grid } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { EmpregadoDomestico } from '@/types/empregado-domestico';

const fetchEmpregadosDomesticos = async (): Promise<EmpregadoDomestico[]> => {
  const res = await fetch('/api/empregado-domestico');
  if (!res.ok) throw new Error('Erro ao buscar empregados domésticos');
  return res.json();
};

export default function EmpregadosDomesticosPage() {
  const [empregados, setEmpregados] = useState<EmpregadoDomestico[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    fetchEmpregadosDomesticos()
      .then(setEmpregados)
      .catch(() => setError('Erro ao carregar empregados domésticos.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Box sx={{ maxWidth: 1100, mx: 'auto', mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h4">Empregados Domésticos</Typography>
          <Link href="/empregados-domesticos/novo" passHref legacyBehavior>
            <Button variant="contained" color="primary">Novo Empregado</Button>
          </Link>
        </Box>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="40vh">
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : empregados.length === 0 ? (
          <Alert severity="info">Nenhum empregado doméstico cadastrado.</Alert>
        ) : (
          <Grid container spacing={2} columns={12}>
            {empregados.map((empregado) => (
              <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 4' }} key={empregado.id}>
                <Paper elevation={1} sx={{ p: 2, mb: 2, cursor: 'pointer' }} onClick={() => router.push(`/empregados-domesticos/${empregado.id}`)}>
                  <Typography variant="h6">{empregado.nomeCompleto}</Typography>
                  <Typography variant="body2">CPF: {empregado.cpf}</Typography>
                  <Typography variant="body2">Nascimento: {empregado.dataNascimento}</Typography>
                  <Typography variant="body2">Função: {empregado.funcao}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}
      </Paper>
    </Box>
  );
} 