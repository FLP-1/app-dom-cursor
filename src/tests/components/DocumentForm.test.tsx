import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { DocumentForm } from '@/components/DocumentForm';
import { useDocumentForm } from '@/hooks/useDocumentForm';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { Document } from '@prisma/client';

jest.mock('@/hooks/useDocumentForm');
jest.mock('next/router');
jest.mock('next-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe('DocumentForm', () => {
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

  const mockUseDocumentForm = {
    form: {
      control: {},
      handleSubmit: jest.fn(),
      formState: {
        errors: {},
      },
      getValues: jest.fn(),
      reset: jest.fn(),
    },
    loading: false,
    success: false,
    error: null,
    handleSubmit: jest.fn(),
  };

  beforeEach(() => {
    (useDocumentForm as jest.Mock).mockReturnValue(mockUseDocumentForm);
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    });
  });

  it('should render form fields correctly', () => {
    render(<DocumentForm />);

    expect(screen.getByLabelText('document.fields.name')).toBeInTheDocument();
    expect(screen.getByLabelText('document.fields.type')).toBeInTheDocument();
    expect(screen.getByLabelText('document.fields.url')).toBeInTheDocument();
    expect(screen.getByLabelText('document.fields.expirationDate')).toBeInTheDocument();
    expect(screen.getByLabelText('document.fields.isPublic')).toBeInTheDocument();
  });

  it('should initialize form with document values when document is provided', () => {
    render(<DocumentForm document={mockDocument} />);

    expect(mockUseDocumentForm.form.reset).toHaveBeenCalledWith({
      nome: mockDocument.nome,
      tipo: mockDocument.tipo,
      url: mockDocument.url,
      dataValidade: mockDocument.dataValidade,
      isPublic: mockDocument.isPublic,
    });
  });

  it('should handle form submission', async () => {
    const { push } = useRouter();
    render(<DocumentForm />);

    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);

    expect(mockUseDocumentForm.handleSubmit).toHaveBeenCalled();
  });

  it('should show loading state during submission', () => {
    (useDocumentForm as jest.Mock).mockReturnValue({
      ...mockUseDocumentForm,
      loading: true,
    });

    render(<DocumentForm />);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('should show success message and redirect after successful submission', async () => {
    const { push } = useRouter();
    (useDocumentForm as jest.Mock).mockReturnValue({
      ...mockUseDocumentForm,
      success: true,
    });

    render(<DocumentForm />);

    await waitFor(() => {
      expect(screen.getByText('document.messages.createSuccess')).toBeInTheDocument();
    });

    expect(push).toHaveBeenCalledWith('/documents');
  });

  it('should show error message when submission fails', async () => {
    const error = new Error('API Error');
    (useDocumentForm as jest.Mock).mockReturnValue({
      ...mockUseDocumentForm,
      error,
    });

    render(<DocumentForm />);

    await waitFor(() => {
      expect(screen.getByText('document.messages.error')).toBeInTheDocument();
    });
  });

  it('should handle form validation errors', () => {
    (useDocumentForm as jest.Mock).mockReturnValue({
      ...mockUseDocumentForm,
      form: {
        ...mockUseDocumentForm.form,
        formState: {
          errors: {
            nome: {
              message: 'Nome é obrigatório',
            },
          },
        },
      },
    });

    render(<DocumentForm />);

    expect(screen.getByText('Nome é obrigatório')).toBeInTheDocument();
  });
}); 