import { DocumentService } from '@/services/DocumentService';
import { Document } from '@prisma/client';
import { api } from '@/services/api';

jest.mock('@/services/api');

describe('DocumentService', () => {
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

  const mockResponse = {
    documents: [mockDocument],
    total: 1,
    pages: 1,
  };

  beforeEach(() => {
    (api.get as jest.Mock).mockResolvedValue({ data: mockResponse });
    (api.post as jest.Mock).mockResolvedValue({ data: mockDocument });
    (api.put as jest.Mock).mockResolvedValue({ data: mockDocument });
    (api.delete as jest.Mock).mockResolvedValue({ data: null });
  });

  describe('list', () => {
    it('should fetch documents with default parameters', async () => {
      const result = await DocumentService.list();

      expect(api.get).toHaveBeenCalledWith('/documents', {
        params: {
          page: 1,
          limit: 10,
        },
      });
      expect(result).toEqual(mockResponse);
    });

    it('should fetch documents with custom parameters', async () => {
      const params = {
        tipo: 'DOC_ADMISSAO_CPF',
        page: 2,
        limit: 20,
      };

      const result = await DocumentService.list(params);

      expect(api.get).toHaveBeenCalledWith('/documents', {
        params,
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle API errors', async () => {
      const error = new Error('API Error');
      (api.get as jest.Mock).mockRejectedValueOnce(error);

      await expect(DocumentService.list()).rejects.toThrow('API Error');
    });
  });

  describe('getById', () => {
    it('should fetch document by id', async () => {
      (api.get as jest.Mock).mockResolvedValueOnce({ data: mockDocument });

      const result = await DocumentService.getById('1');

      expect(api.get).toHaveBeenCalledWith('/documents/1');
      expect(result).toEqual(mockDocument);
    });

    it('should handle API errors', async () => {
      const error = new Error('API Error');
      (api.get as jest.Mock).mockRejectedValueOnce(error);

      await expect(DocumentService.getById('1')).rejects.toThrow('API Error');
    });
  });

  describe('create', () => {
    it('should create new document', async () => {
      const documentData = {
        nome: 'Novo Documento',
        tipo: 'DOC_ADMISSAO_CPF',
        url: 'http://example.com/novo.pdf',
        dataValidade: new Date(),
        isPublic: true,
      };

      const result = await DocumentService.create(documentData);

      expect(api.post).toHaveBeenCalledWith('/documents', documentData);
      expect(result).toEqual(mockDocument);
    });

    it('should handle API errors', async () => {
      const error = new Error('API Error');
      (api.post as jest.Mock).mockRejectedValueOnce(error);

      await expect(
        DocumentService.create({
          nome: 'Novo Documento',
          tipo: 'DOC_ADMISSAO_CPF',
          url: 'http://example.com/novo.pdf',
        }),
      ).rejects.toThrow('API Error');
    });
  });

  describe('update', () => {
    it('should update existing document', async () => {
      const documentData = {
        nome: 'Documento Atualizado',
        tipo: 'DOC_ADMISSAO_RG',
        url: 'http://example.com/atualizado.pdf',
        dataValidade: new Date(),
        isPublic: false,
      };

      const result = await DocumentService.update('1', documentData);

      expect(api.put).toHaveBeenCalledWith('/documents/1', documentData);
      expect(result).toEqual(mockDocument);
    });

    it('should handle API errors', async () => {
      const error = new Error('API Error');
      (api.put as jest.Mock).mockRejectedValueOnce(error);

      await expect(
        DocumentService.update('1', {
          nome: 'Documento Atualizado',
          tipo: 'DOC_ADMISSAO_RG',
          url: 'http://example.com/atualizado.pdf',
        }),
      ).rejects.toThrow('API Error');
    });
  });

  describe('delete', () => {
    it('should delete document', async () => {
      await DocumentService.delete('1');

      expect(api.delete).toHaveBeenCalledWith('/documents/1');
    });

    it('should handle API errors', async () => {
      const error = new Error('API Error');
      (api.delete as jest.Mock).mockRejectedValueOnce(error);

      await expect(DocumentService.delete('1')).rejects.toThrow('API Error');
    });
  });

  describe('download', () => {
    it('should download document', async () => {
      const mockBlob = new Blob(['test'], { type: 'application/pdf' });
      (api.get as jest.Mock).mockResolvedValueOnce({ data: mockBlob });

      const result = await DocumentService.download('http://example.com/doc.pdf');

      expect(api.get).toHaveBeenCalledWith('http://example.com/doc.pdf', {
        responseType: 'blob',
      });
      expect(result).toEqual(mockBlob);
    });

    it('should handle API errors', async () => {
      const error = new Error('API Error');
      (api.get as jest.Mock).mockRejectedValueOnce(error);

      await expect(DocumentService.download('http://example.com/doc.pdf')).rejects.toThrow(
        'API Error',
      );
    });
  });
}); 