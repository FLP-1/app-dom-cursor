import { renderHook, act } from '@testing-library/react-hooks';
import { useDocumentForm } from '@/hooks/useDocumentForm';
import { DocumentService } from '@/services/DocumentService';
import { Document } from '@prisma/client';

jest.mock('@/services/DocumentService');

describe('useDocumentForm', () => {
  const mockDocument: Document = {
    id: '1',
    nome: 'Documento Teste',
    tipo: 'DOC_ADMISSAO_CPF',
    url: 'http://example.com/doc.pdf',
    dataUpload: new Date(),
    dataValidade: new Date(),
    isPublic: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(() => {
    (DocumentService.create as jest.Mock).mockResolvedValue(mockDocument);
    (DocumentService.update as jest.Mock).mockResolvedValue(mockDocument);
  });

  it('should initialize form with default values when no document is provided', () => {
    const { result } = renderHook(() => useDocumentForm());

    expect(result.current.form.getValues()).toEqual({
      nome: '',
      tipo: '',
      url: '',
      dataValidade: null,
      isPublic: false,
    });
  });

  it('should initialize form with document values when document is provided', () => {
    const { result } = renderHook(() => useDocumentForm(mockDocument));

    expect(result.current.form.getValues()).toEqual({
      nome: mockDocument.nome,
      tipo: mockDocument.tipo,
      url: mockDocument.url,
      dataValidade: mockDocument.dataValidade,
      isPublic: mockDocument.isPublic,
    });
  });

  it('should handle form submission for new document', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useDocumentForm());

    const formData = {
      nome: 'Novo Documento',
      tipo: 'DOC_ADMISSAO_CPF',
      url: 'http://example.com/novo.pdf',
      dataValidade: new Date(),
      isPublic: true,
    };

    act(() => {
      result.current.form.reset(formData);
    });

    act(() => {
      result.current.handleSubmit(result.current.form.getValues());
    });

    expect(result.current.loading).toBe(true);
    await waitForNextUpdate();

    expect(DocumentService.create).toHaveBeenCalledWith(formData);
    expect(result.current.loading).toBe(false);
    expect(result.current.success).toBe(true);
  });

  it('should handle form submission for existing document', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useDocumentForm(mockDocument));

    const formData = {
      nome: 'Documento Atualizado',
      tipo: 'DOC_ADMISSAO_RG',
      url: 'http://example.com/atualizado.pdf',
      dataValidade: new Date(),
      isPublic: false,
    };

    act(() => {
      result.current.form.reset(formData);
    });

    act(() => {
      result.current.handleSubmit(result.current.form.getValues());
    });

    expect(result.current.loading).toBe(true);
    await waitForNextUpdate();

    expect(DocumentService.update).toHaveBeenCalledWith(mockDocument.id, formData);
    expect(result.current.loading).toBe(false);
    expect(result.current.success).toBe(true);
  });

  it('should handle form validation errors', async () => {
    const { result } = renderHook(() => useDocumentForm());

    act(() => {
      result.current.handleSubmit({});
    });

    expect(result.current.form.formState.errors).toBeDefined();
    expect(result.current.loading).toBe(false);
    expect(result.current.success).toBe(false);
  });

  it('should handle API errors during submission', async () => {
    const error = new Error('API Error');
    (DocumentService.create as jest.Mock).mockRejectedValueOnce(error);

    const { result, waitForNextUpdate } = renderHook(() => useDocumentForm());

    const formData = {
      nome: 'Novo Documento',
      tipo: 'DOC_ADMISSAO_CPF',
      url: 'http://example.com/novo.pdf',
      dataValidade: new Date(),
      isPublic: true,
    };

    act(() => {
      result.current.form.reset(formData);
    });

    act(() => {
      result.current.handleSubmit(result.current.form.getValues());
    });

    await waitForNextUpdate();

    expect(result.current.error).toBe(error);
    expect(result.current.loading).toBe(false);
    expect(result.current.success).toBe(false);
  });
}); 