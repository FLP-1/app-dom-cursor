import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { DocumentList } from '@/components/DocumentList';
import { useDocumentList } from '@/hooks/useDocumentList';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

// Mock dos hooks
jest.mock('@/hooks/useDocumentList');
jest.mock('next/router');
jest.mock('next-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe('DocumentList', () => {
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

  const mockUseDocumentList = {
    documents: mockDocuments,
    total: 2,
    pages: 1,
    loading: false,
    filters: {},
    loadDocuments: jest.fn(),
    handleFilterChange: jest.fn(),
    handlePageChange: jest.fn(),
    handleDelete: jest.fn(),
  };

  beforeEach(() => {
    (useDocumentList as jest.Mock).mockReturnValue(mockUseDocumentList);
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    });
  });

  it('should render document list correctly', () => {
    render(<DocumentList />);

    expect(screen.getByText('document.list.title')).toBeInTheDocument();
    expect(screen.getByText('document.list.new')).toBeInTheDocument();
    expect(screen.getByText('Documento 1')).toBeInTheDocument();
    expect(screen.getByText('Documento 2')).toBeInTheDocument();
  });

  it('should handle new document button click', () => {
    const { push } = useRouter();
    render(<DocumentList />);

    fireEvent.click(screen.getByText('document.list.new'));
    expect(push).toHaveBeenCalledWith('/documents/novo');
  });

  it('should handle edit button click', () => {
    const { push } = useRouter();
    render(<DocumentList />);

    const editButtons = screen.getAllByRole('button', { name: /edit/i });
    fireEvent.click(editButtons[0]);

    expect(push).toHaveBeenCalledWith('/documents/1/editar');
  });

  it('should handle delete button click', async () => {
    render(<DocumentList />);

    const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
    fireEvent.click(deleteButtons[0]);

    await waitFor(() => {
      expect(screen.getByText('document.delete.title')).toBeInTheDocument();
    });

    const confirmButton = screen.getByText('common.delete');
    fireEvent.click(confirmButton);

    expect(mockUseDocumentList.handleDelete).toHaveBeenCalledWith('1');
  });

  it('should handle download button click', async () => {
    const mockBlob = new Blob(['test'], { type: 'application/pdf' });
    global.URL.createObjectURL = jest.fn(() => 'blob:test');
    global.URL.revokeObjectURL = jest.fn();

    render(<DocumentList />);

    const downloadButtons = screen.getAllByRole('button', { name: /download/i });
    fireEvent.click(downloadButtons[0]);

    await waitFor(() => {
      expect(global.URL.createObjectURL).toHaveBeenCalled();
      expect(global.URL.revokeObjectURL).toHaveBeenCalled();
    });
  });
}); 