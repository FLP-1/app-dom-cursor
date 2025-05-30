import React, { useState } from 'react';
import DocumentHeader from '../../components/documents/DocumentHeader';
import DocumentFilters from '../../components/documents/DocumentFilters';
import DocumentList from '../../components/documents/DocumentList';
import DocumentUploadModal from '../../components/documents/DocumentUploadModal';
import Box from '@mui/material/Box';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { Container } from '@/components/Container';

const DocumentsPage: React.FC = () => {
  const [uploadOpen, setUploadOpen] = useState(false);
  const [filters, setFilters] = useState<any>(null);
  const { t } = useTranslation();

  return (
    <Box sx={{ minHeight: '100vh', background: '#f5f5f5' }}>
      <DocumentHeader onUploadClick={() => setUploadOpen(true)} />
      <Box sx={{ maxWidth: 1200, margin: '0 auto', p: 3 }}>
        <DocumentFilters onFilter={setFilters} />
        <DocumentList filters={filters} isAdmin={true} />
      </Box>
      <DocumentUploadModal open={uploadOpen} onClose={() => setUploadOpen(false)} />
    </Box>
  );
};

export default DocumentsPage;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'pt-BR', ['common', 'document'])),
    },
  };
}; 