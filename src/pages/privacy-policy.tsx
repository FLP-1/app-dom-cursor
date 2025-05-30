import React, { useEffect, useState } from 'react';
import Box from '../components/layout/Box';
import Logo from '../components/common/Logo';
import Link from 'next/link';
import { Box as MuiBox, CircularProgress, Alert } from '@mui/material';
import ReactMarkdown from 'react-markdown';

const PrivacyPolicy: React.FC = () => {
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/documents?category=INSTITUCIONAL_PRIVACY_POLICY&isPublic=true')
      .then(async (res) => {
        if (!res.ok) throw new Error(await res.text());
        return res.json();
      })
      .then((doc) => {
        setContent(doc?.content || doc?.name || '');
        setLoading(false);
      })
      .catch((err) => {
        setError('Não foi possível carregar a Política de Privacidade. Tente novamente mais tarde.');
        setLoading(false);
      });
  }, []);

  return (
    <MuiBox sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Logo sx={{ mb: 3 }} />
      <MuiBox component="h1" sx={{ fontSize: 32, fontWeight: 700, mb: 2 }}>Política de Privacidade</MuiBox>
      {loading && <CircularProgress sx={{ display: 'block', mx: 'auto', my: 4 }} aria-label="Carregando política de privacidade" />}
      {error && <Alert severity="error">{error}</Alert>}
      {!loading && !error && content && (
        <Box sx={{ mb: 4 }}>
          <ReactMarkdown>{content}</ReactMarkdown>
        </Box>
      )}
      <MuiBox sx={{ mt: 4 }}>
        <Link href="/">Voltar para o início</Link>
      </MuiBox>
    </MuiBox>
  );
};

export default PrivacyPolicy; 