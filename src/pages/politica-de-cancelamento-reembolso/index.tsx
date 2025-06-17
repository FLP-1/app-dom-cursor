/**
 * Arquivo: index.tsx
 * Caminho: src/pages/politica-de-cancelamento-reembolso/index.tsx
 * Criado em: 2024-03-19
 * Última atualização: 2024-03-19
 * Descrição: Página oficial de política de cancelamento e reembolso
 */

import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import fs from 'fs/promises';
import path from 'path';
import { DocumentViewer } from '@/components/institutional/DocumentViewer';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const filePath = path.join(process.cwd(), 'docs', 'institutional', 'cancellation', `${locale}.md`);
  const content = await fs.readFile(filePath, 'utf-8');
  
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'pt-BR', ['common'])),
      content,
    },
  };
};

export default function CancellationPolicy({ content }: { content: string }) {
  const { t } = useTranslation();
  
  return (
    <DocumentViewer
      title={t('cancellation.title', 'Política de Cancelamento e Reembolso')}
      content={content}
      lastUpdate={t('cancellation.lastUpdate', '19/03/2024')}
    />
  );
} 
