/**
 * Arquivo: index.tsx
 * Caminho: src/pages/termos-de-uso/index.tsx
 * Criado em: 2024-03-19
 * Última atualização: 2024-03-19
 * Descrição: Página oficial de termos de uso
 */

import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import fs from 'fs/promises';
import path from 'path';
import { DocumentViewer } from '@/components/institutional/DocumentViewer';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const filePath = path.join(process.cwd(), 'docs', 'institutional', 'terms', `${locale}.md`);
  const content = await fs.readFile(filePath, 'utf-8');
  
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'pt-BR', ['common'])),
      content,
    },
  };
};

export default function TermsOfUse({ content }: { content: string }) {
  const { t } = useTranslation('common');

  return (
    <DocumentViewer
      title={t('institutional.terms.title')}
      subtitle={t('institutional.terms.subtitle')}
      lastUpdate={t('institutional.terms.lastUpdate')}
      content={content}
    />
  );
} 
