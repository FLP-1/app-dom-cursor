import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Button,
  CircularProgress,
  Alert,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import StatCard from '../components/StatCard';

interface DashboardStats {
  totalAlerts: number;
  activeAlerts: number;
  urgentAlerts: number;
  recentAlerts: number;
}

export default function Dashboard() {
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
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

    fetchStats();
  }, [router]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h4" component="h1">
          Dashboard
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => router.push('/alerts')}
        >
          Gerenciar Alertas
        </Button>
      </Box>

      <Grid container spacing={3}>
        {/* Total de Alertas */}
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Total de Alertas" value={stats?.totalAlerts || 0} />
        </Grid>

        {/* Alertas Ativos */}
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Alertas Ativos" value={stats?.activeAlerts || 0} />
        </Grid>

        {/* Alertas Urgentes */}
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Alertas Urgentes" value={stats?.urgentAlerts || 0} color="error" />
        </Grid>

        {/* Alertas Recentes */}
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Alertas Recentes" value={stats?.recentAlerts || 0} />
        </Grid>
      </Grid>
    </Container>
  );
} 