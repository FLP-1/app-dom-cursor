/**
 * Arquivo: index.tsx
 * Caminho: src/pages/termos-de-uso/index.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Página de termos de uso
 */

import React from 'react';
import { Box, Card, CardContent } from '@mui/material';
import { PageHeader } from '@/components/common/PageHeader';
import { Layout } from '@/components/layout/Layout';
import ReactMarkdown from 'react-markdown';
import fs from 'fs/promises';
import path from 'path';

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'docs', 'termo-de-uso.txt');
  const fileContent = await fs.readFile(filePath, 'utf-8');
  return { props: { content: fileContent } };
}

export default function TermosDeUsoPage({ content }: { content: string }) {
  return (
    <Layout>
      <Box sx={{ p: 3 }}>
        <PageHeader title="Termos de Uso" />
        <Box sx={{ mt: 3 }}>
          <Card>
            <CardContent>
              <ReactMarkdown>{content}</ReactMarkdown>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Layout>
  );
} 
