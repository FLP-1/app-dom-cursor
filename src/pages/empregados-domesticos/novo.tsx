/**
 * Arquivo: novo.tsx
 * Caminho: src/pages/empregados-domesticos/novo.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Página de novo empregado doméstico
 */

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { EmpregadoDomesticoForm } from '@/components/forms/empregado-domestico/EmpregadoDomesticoForm';
import { CboCargo } from '@/types/empregado-domestico';
import { CircularProgress, Box } from '@mui/material';

const fetchCargos = async (): Promise<CboCargo[]> => {
  const res = await fetch('/api/cbo-cargos');
  if (!res.ok) return [];
  return res.json();
};

const fetchEmpregadores = async (): Promise<{ id: string; nomeCompleto: string }[]> => {
  const res = await fetch('/api/empregadores');
  if (!res.ok) return [];
  return res.json();
};

export default function NovoEmpregadoDomesticoPage() {
  const router = useRouter();
  const [cargos, setCargos] = useState<CboCargo[]>([]);
  const [empregadores, setEmpregadores] = useState<{ id: string; nomeCompleto: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchCargos(), fetchEmpregadores()]).then(([c, e]) => {
      setCargos(c);
      setEmpregadores(e);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <Box display="flex" justifyContent="center" alignItems="center" minHeight={300}><CircularProgress /></Box>;
  }

  return (
    <EmpregadoDomesticoForm
      cargos={cargos}
      empregadores={empregadores}
      onSubmitSuccess={() => router.push('/empregados-domesticos')}
    />
  );
} 
