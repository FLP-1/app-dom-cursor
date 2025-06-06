import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { DocumentForm } from '@/components/DocumentForm';
import { Container } from '@/components/Container';
import { useTranslation } from 'next-i18next';
import { DocumentService } from '@/services/DocumentService';
import { Document } from '@prisma/client';

interface EditDocumentPageProps {
  document: Document;
}

export default function EditDocumentPage({ document }: EditDocumentPageProps) {
  const { t } = useTranslation();

  return (
    <Container title={t('document.edit.title')}>
      <DocumentForm document={document} />
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params, locale }) => {
  try {
    const document = await DocumentService.getById(params?.id as string);

    return {
      props: {
        document,
        ...(await serverSideTranslations(locale || 'pt-BR', ['common', 'document'])),
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}; 