/**
 * Arquivo: cancelamento-reembolso.tsx
 * Caminho: src/pages/cancelamento-reembolso.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Página de cancelamento e reembolso
 */

import React from 'react';
import { Box, Card, CardContent } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import fs from 'fs/promises';
import path from 'path';

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'docs', 'politica-cancelamento-reembolso.txt');
  const fileContent = await fs.readFile(filePath, 'utf-8');
  return { props: { content: fileContent } };
}

export default function CancelamentoReembolsoPage({ content }: { content: string }) {
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
