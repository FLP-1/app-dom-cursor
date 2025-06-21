/**
 * Arquivo: privacy-policy.tsx
 * Caminho: src/pages/privacy-policy.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Página de política de privacidade
 */

import React from 'react';
import { Box, Card, CardContent } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import fs from 'fs/promises';
import path from 'path';

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'docs', 'politica-de-privacidade.txt');
  const fileContent = await fs.readFile(filePath, 'utf-8');
  return { props: { content: fileContent } };
}

export default function PrivacyPolicyPage({ content }: { content: string }) {
  return (
    <Box sx={{ p: 3 }}>
      <Card>
        <CardContent>
          <ReactMarkdown>{content}</ReactMarkdown>
        </CardContent>
      </Card>
    </Box>
  );
} 
