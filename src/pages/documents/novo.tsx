/**
 * Arquivo: novo.tsx
 * Caminho: src/pages/documents/novo.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Página de novo documento
 */

import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { DocumentForm } from '@/components/DocumentForm';
import { Container } from '@/components/Container';
import { useTranslation } from 'next-i18next';

export default function NewDocumentPage() {
  const { t } = useTranslation();

  return (
    <Container title={t('document.create.title')}>
      <DocumentForm />
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'pt-BR', ['common', 'document'])),
    },
  };
}; 
