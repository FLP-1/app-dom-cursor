/**
 * Arquivo: DocumentList.tsx
 * Caminho: src/components/documents/DocumentList.tsx
 * Criado em: 2025-06-07
 * Última atualização: 2025-06-07
 * Descrição: Componente de listagem de documentos com suporte a filtros, visualização e download
 */

import React from 'react';
import useSWR from 'swr';
import { Box, Typography, Button, CircularProgress, Alert } from '@mui/material';
import { documentMessages } from '@/i18n/messages';
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

const getCategoryLabel = (category: Document['category']): string => {
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
    return (
      <Box sx={{ width: '100%', textAlign: 'center', py: 6 }}>
        <CircularProgress aria-label={documentMessages[lang].loading} />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{documentMessages[lang].error}</Alert>;
  }

  if (!data || (Array.isArray(data) && data.length === 0)) {
    return <Alert severity="info">{documentMessages[lang].empty}</Alert>;
  }

  const documentsList = (Array.isArray(data) ? data : [data]).map((doc: Partial<Document>) => ({
    ...doc,
    dataUpload: new Date(doc.uploadedAt || doc.createdAt || ''),
  }));

  const filteredDocuments = isAdmin
    ? documentsList
    : documentsList.filter((doc: Document) => doc.category === 'OUTROS');

  return (
    <Box sx={{ width: '100%' }}>
      {filteredDocuments.map((doc) => (
        <Box 
          key={doc.id} 
          sx={{ 
            borderBottom: '1px solid',
            borderColor: 'divider',
            padding: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body1">{doc.name}</Typography>
            <Typography variant="caption" color="text.secondary">
              {getCategoryLabel(doc.category)}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button 
              onClick={() => onView(doc)}
              variant="outlined"
              size="small"
            >
              Visualizar
            </Button>
            <Button 
              onClick={() => onDownload(doc)}
              variant="contained"
              size="small"
            >
              Baixar
            </Button>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default DocumentList; 
