import { renderHook, act } from '@testing-library/react-hooks';
import { useDocumentList } from '@/hooks/useDocumentList';
import { DocumentService } from '@/services/DocumentService';

jest.mock('@/services/DocumentService');

describe('useDocumentList', () => {
  const mockDocuments = [
    {
      id: '1',
      nome: 'Documento 1',
      tipo: 'DOC_ADMISSAO_CPF',
      url: 'http://example.com/doc1.pdf',
      dataUpload: new Date(),
      dataValidade: new Date(),
      isPublic: true,
    },
    {
      id: '2',
      nome: 'Documento 2',
      tipo: 'DOC_ADMISSAO_RG',
      url: 'http://example.com/doc2.pdf',
      dataUpload: new Date(),
      dataValidade: null,
      isPublic: false,
    },
  ];

  const mockResponse = {
    documents: mockDocuments,
    total: 2,
    pages: 1,
  };

  beforeEach(() => {
    (DocumentService.list as jest.Mock).mockResolvedValue(mockResponse);
    (DocumentService.delete as jest.Mock).mockResolvedValue(undefined);
  });

  it('should load documents on mount', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useDocumentList());

    expect(result.current.loading).toBe(true);
    await waitForNextUpdate();

    expect(result.current.documents).toEqual(mockDocuments);
    expect(result.current.total).toBe(2);
    expect(result.current.pages).toBe(1);
    expect(result.current.loading).toBe(false);
  });

  it('should handle filter change', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useDocumentList());

    await waitForNextUpdate();

    act(() => {
      result.current.handleFilterChange({ tipo: 'DOC_ADMISSAO_CPF' });
    });

    expect(result.current.loading).toBe(true);
    await waitForNextUpdate();

    expect(DocumentService.list).toHaveBeenCalledWith({
      tipo: 'DOC_ADMISSAO_CPF',
      page: 1,
      limit: 10,
    });
  });

  it('should handle page change', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useDocumentList());

    await waitForNextUpdate();

    act(() => {
      result.current.handlePageChange(2);
    });

    expect(result.current.loading).toBe(true);
    await waitForNextUpdate();

    expect(DocumentService.list).toHaveBeenCalledWith({
      page: 2,
      limit: 10,
    });
  });

  it('should handle document deletion', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useDocumentList());

    await waitForNextUpdate();

    act(() => {
      result.current.handleDelete('1');
    });

    expect(DocumentService.delete).toHaveBeenCalledWith('1');
    await waitForNextUpdate();

    expect(DocumentService.list).toHaveBeenCalledTimes(2);
  });

  it('should handle error when loading documents', async () => {
    const error = new Error('Failed to load documents');
    (DocumentService.list as jest.Mock).mockRejectedValueOnce(error);

    const { result, waitForNextUpdate } = renderHook(() => useDocumentList());

    await waitForNextUpdate();

    expect(result.current.error).toBe(error);
    expect(result.current.loading).toBe(false);
  });

  it('should handle error when deleting document', async () => {
    const error = new Error('Failed to delete document');
    (DocumentService.delete as jest.Mock).mockRejectedValueOnce(error);

    const { result, waitForNextUpdate } = renderHook(() => useDocumentList());

    await waitForNextUpdate();

    act(() => {
      result.current.handleDelete('1');
    });

    await waitForNextUpdate();

    expect(result.current.error).toBe(error);
  });
}); 