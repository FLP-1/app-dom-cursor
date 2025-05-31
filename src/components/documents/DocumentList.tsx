import React from 'react';
import useSWR from 'swr';
import { DataTable } from '../common/DataTable';
import { FaFilePdf, FaFileImage, FaFileWord, FaFileAlt, FaDownload, FaEye, FaTrash } from 'react-icons/fa';
import { CellProps, Row } from 'react-table';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import { documentMessages } from '../../i18n/messages';
import { Document, DocumentFilter } from '@/types/documents';

const lang = 'pt';

interface DocumentListProps {
  filters?: Partial<Document> & { search?: string; status?: string };
  isAdmin?: boolean;
  documents: Document[];
  onView: (doc: Document) => void;
  onDownload: (doc: Document) => void;
}

function buildQueryString(filters: DocumentFilter): string {
  const params = new URLSearchParams();
  
  if (filters.tipo) {
    params.append('tipo', filters.tipo);
  }
  
  if (filters.dataInicio) {
    params.append('dataInicio', filters.dataInicio.toISOString());
  }
  
  if (filters.dataFim) {
    params.append('dataFim', filters.dataFim.toISOString());
  }
  
  if (filters.nome) {
    params.append('nome', filters.nome);
  }
  
  return params.toString();
}

const getIcon = (type: string) => {
  switch (type) {
    case 'PDF': return <FaFilePdf color="#e74c3c" />;
    case 'Imagem': return <FaFileImage color="#29ABE2" />;
    case 'DOCX': return <FaFileWord color="#2980b9" />;
    case 'TXT': return <FaFileAlt color="#888" />;
    default: return <FaFileAlt color="#888" />;
  }
};

const getCategoryLabel = (category: Document['category']) => {
  switch (category) {
    case 'INSTITUCIONAL_TERMS_OF_USE': return 'Termos de Uso';
    case 'INSTITUCIONAL_PRIVACY_POLICY': return 'Política de Privacidade';
    case 'INSTITUCIONAL_PLANS': return 'Tabela de Planos';
    case 'INSTITUCIONAL_CANCELLATION_REFUND': return 'Cancelamento e Reembolso';
    case 'OUTROS': default: return 'Outros';
  }
};

const DocumentList: React.FC<DocumentListProps> = ({ filters, isAdmin = true, documents, onView, onDownload }) => {
  const query = buildQueryString(filters as DocumentFilter);
  const { data, error, isLoading } = useSWR(`/api/documents${query}`, async (url) => {
    const res = await fetch(url);
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  });

  if (isLoading) {
    return <Box sx={{ width: '100%', textAlign: 'center', py: 6 }}><CircularProgress aria-label={documentMessages[lang].loading} /></Box>;
  }
  if (error) {
    return <Alert severity="error">{documentMessages[lang].error}</Alert>;
  }
  if (!data || (Array.isArray(data) && data.length === 0)) {
    return <Alert severity="info">{documentMessages[lang].empty}</Alert>;
  }

  // Suporte tanto para array quanto para objeto único (caso API retorne findFirst)
  const documentsList = (Array.isArray(data) ? data : [data]).map((doc: any) => ({
    ...doc,
    dataUpload: new Date(doc.uploadedAt || doc.createdAt || ''),
  }));

  // Permissão: filtrar institucionais para não-admins
  const filteredDocuments = isAdmin
    ? documentsList
    : documentsList.filter((doc: Document) => doc.category === 'OUTROS');

  console.log('Documentos recebidos para exibição:', documentsList);

  function handleView(doc: Document) {
    onView(doc);
  }

  function handleDownload(doc: Document) {
    onDownload(doc);
  }

  // Renderização detalhada para debug
  return (
    <Box>
      {filteredDocuments.map(doc => (
        <div key={doc.id} style={{ borderBottom: '1px solid #eee', padding: 8 }}>
          <strong>{doc.name}</strong> | {doc.type} | {doc.dataUpload.toLocaleDateString()} | {doc.expiresAt ? doc.expiresAt.toLocaleDateString() : ''} | {doc.group} | {doc.status} | {doc.category}
          <button onClick={() => handleView(doc)} style={{ marginLeft: 8 }}>Visualizar</button>
          <button onClick={() => handleDownload(doc)} style={{ marginLeft: 8 }}>Baixar</button>
        </div>
      ))}
    </Box>
  );

  // return (
  //   <Box sx={{ width: '100%', overflowX: 'auto', p: { xs: 1, sm: 0 } }}>
  //     <DataTable ... />
  //   </Box>
  // );
};

export default DocumentList; 