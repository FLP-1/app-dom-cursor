/**
 * Arquivo: editar.tsx
 * Caminho: src/pages/empregados-domesticos/[id]/editar.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Página de edição de empregado doméstico
 */

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { EmpregadoDomesticoForm } from '@/components/forms/empregado-domestico/EmpregadoDomesticoForm';
import { CboCargo, EmpregadoDomestico } from '@/types/empregado-domestico';
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

const fetchEmpregado = async (id: string): Promise<EmpregadoDomestico | null> => {
  const res = await fetch(`/api/empregado-domestico/${id}`);
  if (!res.ok) return null;
  return res.json();
};

export default function EditarEmpregadoDomesticoPage() {
  const router = useRouter();
  const { id } = router.query;
  const [cargos, setCargos] = useState<CboCargo[]>([]);
  const [empregadores, setEmpregadores] = useState<{ id: string; nomeCompleto: string }[]>([]);
  const [initialValues, setInitialValues] = useState<Partial<EmpregadoDomestico>>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id || typeof id !== 'string') return;
    setLoading(true);
    Promise.all([
      fetchCargos(),
      fetchEmpregadores(),
      fetchEmpregado(id)
    ]).then(([c, e, emp]) => {
      setCargos(c);
      setEmpregadores(e);
      setInitialValues(emp);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return <Box display="flex" justifyContent="center" alignItems="center" minHeight={300}><CircularProgress /></Box>;
  }

  return (
    <EmpregadoDomesticoForm
      initialValues={initialValues}
      cargos={cargos}
      empregadores={empregadores}
      onSubmitSuccess={() => router.push('/empregados-domesticos')}
    />
  );
} 