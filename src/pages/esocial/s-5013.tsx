/**
 * Arquivo: s-5013.tsx
 * Caminho: src/pages/esocial/s-5013.tsx
 * Criado em: 2025-06-05
 * Última atualização: 2025-06-13
 * Descrição: Página de criação de evento S-5013
 */

import { S5013Form } from '@/components/forms/esocial/S5013Form';
import { Box, Container } from '@mui/material';
import Link from 'next/link';

export default function S5013Page() {
  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <S5013Form />
      <Box mt={2}>
        <Link href="/esocial" passHref legacyBehavior>
          <Box component="a" sx={{ textDecoration: 'underline' }}>Voltar para lista de eventos</Box>
        </Link>
      </Box>
    </Container>
  );
} 
