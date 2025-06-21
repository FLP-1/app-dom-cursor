/**
 * Arquivo: index.tsx
 * Caminho: src/pages/dashboard/index.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Página de dashboard
 */

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Grid,
  Paper,
  Typography,
  Box,
  Button,
  CircularProgress,
  Alert,
  CardActionArea
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import EstatCard from '@/components/EstatCard';
import { Layout } from '@/components/layout/Layout';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { usePonto } from '@/hooks/usePonto';
import { useTranslation } from 'react-i18next';

interface DashboardStats {
  totalAlerts: number;
  activeAlerts: number;
  urgentAlerts: number;
  recentAlerts: number;
}

export default function Dashboard() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { horasSemana, horasMes, loading: loadingPonto } = usePonto();
  const { t } = useTranslation();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth/login');
      return;
    }
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/auth/login');
          return;
        }

        const response = await fetch('/api/dashboard/stats', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Erro ao carregar estatísticas');
        }

        const data = await response.json();
        setStats(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar dashboard');
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchStats();
  }, [router, user, authLoading]);

  if (authLoading || loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Layout>
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      </Layout>
    );
  }

  return (
    <Layout>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h4" component="h1">
          {user?.name ? `Olá, ${user.name}` : 'Dashboard'}
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => router.push('/alerts')}
        >
          Gerenciar Alertas
        </Button>
      </Box>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {/* Total de Alertas */}
        <Grid columns={{ xs: 12, sm: 6, md: 3 }}>
          <CardActionArea component={Link} href="/alerts" passHref>
            <EstatCard title="Total de Alertas" value={stats?.totalAlerts || 0} />
          </CardActionArea>
        </Grid>

        {/* Alertas Ativos */}
        <Grid columns={{ xs: 12, sm: 6, md: 3 }}>
          <CardActionArea component={Link} href="/alerts" passHref>
            <EstatCard title="Alertas Ativos" value={stats?.activeAlerts || 0} />
          </CardActionArea>
        </Grid>

        {/* Alertas Urgentes */}
        <Grid columns={{ xs: 12, sm: 6, md: 3 }}>
          <CardActionArea component={Link} href="/alerts" passHref>
            <EstatCard title="Alertas Urgentes" value={stats?.urgentAlerts || 0} color="error" />
          </CardActionArea>
        </Grid>

        {/* Alertas Recentes */}
        <Grid columns={{ xs: 12, sm: 6, md: 3 }}>
          <CardActionArea component={Link} href="/alerts" passHref>
            <EstatCard title="Alertas Recentes" value={stats?.recentAlerts || 0} />
          </CardActionArea>
        </Grid>

        {/* Horas Semanais */}
        <Grid columns={{ xs: 12, sm: 6, md: 3 }}>
          <EstatCard title={t('Horas Semanais')} value={horasSemana ? Number(horasSemana.replace(':', '.')) : 0} icon={<AccessTimeIcon />} color="info" />
        </Grid>

        {/* Horas Mensais */}
        <Grid columns={{ xs: 12, sm: 6, md: 3 }}>
          <EstatCard title={t('Horas Mensais')} value={horasMes ? Number(horasMes.replace(':', '.')) : 0} icon={<CalendarMonthIcon />} color="success" />
        </Grid>
      </Grid>
    </Layout>
  );
} 
