import { Box, Typography, Container } from '@mui/material';
import Link from 'next/link';

export default function Home() {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          gap: 4,
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom>
          DOM - Sistema de Gestão
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          Bem-vindo ao sistema de gestão de documentos e processos
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Link href="/esocial/events" passHref>
            <Typography
              component="a"
              variant="button"
              sx={{
                color: 'primary.main',
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              Eventos eSocial
            </Typography>
          </Link>
        </Box>
      </Box>
    </Container>
  );
} 