/**
 * Arquivo: index.tsx
 * Caminho: src/pages/index.tsx
 * Criado em: 2025-06-07
 * Última atualização: 2025-06-07
 * Descrição: Página inicial do sistema, com splash, redirecionamento e apresentação dos recursos principais.
 */

import { Box, Typography, Button, Container, Grid, Card, CardContent, CircularProgress, Link as MuiLink } from '@mui/material';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import Logo from '@/components/Logo';
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import Backdrop from '@mui/material/Backdrop';

export default function HomePage() {
  const { t } = useTranslation();
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    if (showSplash) {
      const timeout = setTimeout(() => setShowSplash(false), 2000);
      const handleKeyDown = () => setShowSplash(false);
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        clearTimeout(timeout);
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [showSplash]);

  // Redireciona se já autenticado
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace('/dashboard');
    }
  }, [isAuthenticated, isLoading, router]);

  return (
    <>
      <Backdrop
        open={showSplash}
        sx={{ 
          color: '#fff', 
          zIndex: (theme) => theme.zIndex.drawer + 1, 
          background: '#f7f8fa' 
        }}
      >
        <Box 
          sx={{ 
            position: 'relative', 
            width: 180, 
            height: 180, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center' 
          }}
        >
          <Box 
            sx={{
              position: 'absolute',
              width: 180,
              height: 180,
              border: '6px solid #1976d2',
              borderTop: '6px solid #90caf9',
              borderRadius: '50%',
              animation: 'splash-spin 1.2s linear infinite',
              boxSizing: 'border-box',
              '@keyframes splash-spin': {
                '0%': { transform: 'rotate(0deg)' },
                '100%': { transform: 'rotate(360deg)' }
              }
            }}
          />
          <Box 
            sx={{ 
              position: 'absolute', 
              left: 0, 
              right: 0, 
              top: 0, 
              bottom: 0, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center' 
            }}
          >
            <Logo sx={{ width: 100, height: 100 }} />
          </Box>
        </Box>
      </Backdrop>
      {!showSplash && (
        <Box 
          sx={{ 
            minHeight: '100vh', 
            background: '#f7f8fa', 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center' 
          }}
        >
          <Container maxWidth="md" sx={{ py: 8 }}>
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                <Logo />
              </Box>
              <Typography variant="h2" color="primary" fontWeight={700} gutterBottom>
                Gestão Doméstica - tarefas e pessoas
              </Typography>
              <Typography variant="h5" color="text.secondary" gutterBottom>
                {t('home.slogan', 'Organize, simplifique e automatize a gestão de empregados domésticos e obrigações do eSocial.')}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                size="large"
                sx={{ mt: 4, px: 6 }}
                onClick={() => {
                  if (isAuthenticated) {
                    router.push('/dashboard');
                  } else {
                    router.push('/auth/login');
                  }
                }}
              >
                {t('home.entrar', 'Entrar no sistema')}
              </Button>
            </Box>
            <Grid container spacing={4} columns={12}>
              <Grid gridColumn={{ xs: 'span 12', md: 'span 4' }}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" color="primary" gutterBottom>
                      {t('home.recursos.titulo', 'Recursos')}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {t('home.recursos.descricao', 'Controle de empregados, geração de folhas, recibos, relatórios, alertas e integração com o eSocial.')}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid gridColumn={{ xs: 'span 12', md: 'span 4' }}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" color="primary" gutterBottom>
                      {t('home.segurança.titulo', 'Segurança')}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {t('home.segurança.descricao', 'Seus dados protegidos com criptografia, backups automáticos e autenticação segura.')}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid gridColumn={{ xs: 'span 12', md: 'span 4' }}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" color="primary" gutterBottom>
                      {t('home.suporte.titulo', 'Suporte e Atualizações')}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {t('home.suporte.descricao', 'Equipe dedicada, atualizações frequentes e central de ajuda completa.')}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <Box sx={{ textAlign: 'center', mt: 6 }}>
              <MuiLink href="/planos-assinatura" underline="hover" sx={{ mx: 2 }}>
                {t('home.planos', 'Planos de assinatura')}
              </MuiLink>
              <MuiLink href="/termos-de-uso" underline="hover" sx={{ mx: 2 }}>
                {t('home.termos', 'Termos de uso')}
              </MuiLink>
              <MuiLink href="/politica-de-privacidade" underline="hover" sx={{ mx: 2 }}>
                {t('home.privacidade', 'Política de privacidade')}
              </MuiLink>
            </Box>
          </Container>
        </Box>
      )}
    </>
  );
} 
