import { useState, useCallback } from 'react';
import { Document, TipoDocumentoEsocial } from '@prisma/client';
import { DocumentService, DocumentFilter } from '@/services/DocumentService';
import { useNotification } from '@/hooks/useNotification';
import { useTranslation } from 'next-i18next';

interface UseDocumentListProps {
  initialFilters?: DocumentFilter;
}

export function useDocumentList({ initialFilters = {} }: UseDocumentListProps = {}) {
  const { t } = useTranslation();
  const { showNotification } = useNotification();

  const [documents, setDocuments] = useState<Document[]>([]);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<DocumentFilter>({
    page: 1,
    limit: 10,
    ...initialFilters,
  });

  const loadDocuments = useCallback(async () => {
    try {
      setLoading(true);
      const response = await DocumentService.list(filters);
      setDocuments(response.documents);
      setTotal(response.total);
      setPages(response.pages);
    } catch (error) {
      console.error('Erro ao carregar documentos:', error);
      showNotification({
        type: 'error',
        message: t('document.messages.loadError'),
      });
    } finally {
      setLoading(false);
    }
  }, [filters, showNotification, t]);

  const handleFilterChange = useCallback((newFilters: Partial<DocumentFilter>) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters,
      page: 1, // Reset page when filters change
    }));
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setFilters(prev => ({
      ...prev,
      page,
    }));
  }, []);

  const handleDelete = useCallback(async (id: string) => {
    try {
      await DocumentService.delete(id);
      showNotification({
        type: 'success',
        message: t('document.messages.deleteSuccess'),
      });
      loadDocuments(); // Reload list after delete
    } catch (error) {
      console.error('Erro ao excluir documento:', error);
      showNotification({
        type: 'error',
        message: t('document.messages.deleteError'),
      });
    }
  }, [loadDocuments, showNotification, t]);

  return {
    documents,
    total,
    pages,
    loading,
    filters,
    loadDocuments,
    handleFilterChange,
    handlePageChange,
    handleDelete,
  };
} 