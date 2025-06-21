/**
 * Arquivo: selecionar-grupo.tsx
 * Caminho: src/pages/selecionar-grupo.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Página de seleção de grupo
 */

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Layout } from '@/components/layout/Layout';
import { Box, Button, Typography } from '@mui/material';

interface Grupo {
  id: string;
  name: string;
  role: string;
}

export default function SelecionarGrupo() {
  const [grupos, setGrupos] = useState<Grupo[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    async function fetchGrupos() {
      try {
        const token = localStorage.getItem('token');
        const { data } = await axios.get<Grupo[]>('/api/meus-grupos', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setGrupos(data);
      } catch (e) {
        setErro('Erro ao buscar grupos. Faça login novamente.');
      } finally {
        setLoading(false);
      }
    }
    fetchGrupos();
  }, []);

  const selecionarGrupo = (grupo) => {
    localStorage.setItem('grupoSelecionado', JSON.stringify(grupo));
    window.location.href = '/dashboard';
  };

  if (loading) return <Typography>Carregando...</Typography>;
  if (erro) return <Typography color="error.main">{erro}</Typography>;

  return (
    <Layout>
      <Box sx={{ maxWidth: 400, mx: 'auto', my: 5, p: 3, border: '1px solid', borderColor: 'grey.300', borderRadius: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Selecione o grupo que deseja acessar</Typography>
        <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
          {grupos.map((grupo: Grupo) => {
            return (
              <Box component="li" key={grupo.id} sx={{ mb: 2 }}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ py: 1.5, borderRadius: 1.5, fontWeight: 'bold' }}
                  onClick={() => selecionarGrupo(grupo)}
                >
                  {grupo.name} (Papel: {grupo.role})
                </Button>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Layout>
  );
} 
