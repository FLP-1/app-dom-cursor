import { Box, Typography, Button } from '@mui/material';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import { Layout } from '@/components/layout/Layout';
import { useAuth } from '@/hooks/useAuth';

export default function UnauthorizedPage() {
  const router = useRouter();
  const { t } = useTranslation();
  const { logout } = useAuth();

  const handleGoBack = () => {
    router.back();
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <Layout>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="60vh"
        textAlign="center"
        p={3}
      >
        <Typography variant="h1" color="error" gutterBottom>
          403
        </Typography>
        <Typography variant="h4" gutterBottom>
          {t('unauthorized.title', 'Acesso Negado')}
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          {t('unauthorized.message', 'Você não tem permissão para acessar esta página.')}
        </Typography>
        <Box mt={4} display="flex" gap={2}>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleGoBack}
          >
            {t('unauthorized.goBack', 'Voltar')}
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleLogout}
          >
            {t('unauthorized.logout', 'Sair')}
          </Button>
        </Box>
      </Box>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'pt-BR', ['common'])),
    },
  };
}; 