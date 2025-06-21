/**
 * Arquivo: index.ts
 * Caminho: src/pages/api/documents/index.ts
 * Criado em: 2025-01-27
 * Última atualização: 2025-01-27
 * Descrição: Endpoint da API para fornecer dados de documentos.
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { DocumentsData } from '@/hooks/useDocumentsData';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<DocumentsData>
) {
  const mockData: DocumentsData = {
    documents: [
      {
        id: '1',
        name: 'Contrato de Trabalho.pdf',
        type: 'pdf',
        size: '2.5 MB',
        uploadDate: '2025-01-25',
        category: 'work',
        status: 'active',
        description: 'Contrato de trabalho assinado com a família Silva',
        tags: ['contrato', 'trabalho', 'importante'],
        url: '/documents/contrato-trabalho.pdf',
        thumbnail: '/thumbnails/pdf-thumb.png'
      },
      {
        id: '2',
        name: 'Exame de Sangue.jpg',
        type: 'jpg',
        size: '1.8 MB',
        uploadDate: '2025-01-24',
        category: 'medical',
        status: 'active',
        description: 'Resultado do exame de sangue de rotina',
        tags: ['saúde', 'exame', 'laboratório'],
        url: '/documents/exame-sangue.jpg',
        thumbnail: '/thumbnails/image-thumb.png'
      },
      {
        id: '3',
        name: 'Recibo de Aluguel.pdf',
        type: 'pdf',
        size: '850 KB',
        uploadDate: '2025-01-23',
        category: 'financial',
        status: 'active',
        description: 'Recibo do pagamento do aluguel de janeiro',
        tags: ['aluguel', 'pagamento', 'recibo'],
        url: '/documents/recibo-aluguel.pdf',
        thumbnail: '/thumbnails/pdf-thumb.png'
      },
      {
        id: '4',
        name: 'CNH Digital.pdf',
        type: 'pdf',
        size: '1.2 MB',
        uploadDate: '2025-01-20',
        category: 'personal',
        status: 'active',
        description: 'Carteira Nacional de Habilitação digital',
        tags: ['documento', 'identidade', 'veículo'],
        url: '/documents/cnh-digital.pdf',
        thumbnail: '/thumbnails/pdf-thumb.png'
      },
      {
        id: '5',
        name: 'Receita Médica.pdf',
        type: 'pdf',
        size: '650 KB',
        uploadDate: '2025-01-19',
        category: 'medical',
        status: 'active',
        description: 'Receita médica para medicamentos',
        tags: ['medicamento', 'receita', 'farmácia'],
        url: '/documents/receita-medica.pdf',
        thumbnail: '/thumbnails/pdf-thumb.png'
      },
      {
        id: '6',
        name: 'Comprovante de Residência.pdf',
        type: 'pdf',
        size: '1.1 MB',
        uploadDate: '2025-01-18',
        category: 'personal',
        status: 'active',
        description: 'Comprovante de residência atual',
        tags: ['residência', 'comprovante', 'endereço'],
        url: '/documents/comprovante-residencia.pdf',
        thumbnail: '/thumbnails/pdf-thumb.png'
      }
    ],
    recentUploads: [
      {
        id: '1',
        name: 'Contrato de Trabalho.pdf',
        type: 'pdf',
        size: '2.5 MB',
        uploadDate: '2025-01-25',
        category: 'work',
        status: 'active',
        description: 'Contrato de trabalho assinado com a família Silva',
        tags: ['contrato', 'trabalho', 'importante'],
        url: '/documents/contrato-trabalho.pdf',
        thumbnail: '/thumbnails/pdf-thumb.png'
      },
      {
        id: '2',
        name: 'Exame de Sangue.jpg',
        type: 'jpg',
        size: '1.8 MB',
        uploadDate: '2025-01-24',
        category: 'medical',
        status: 'active',
        description: 'Resultado do exame de sangue de rotina',
        tags: ['saúde', 'exame', 'laboratório'],
        url: '/documents/exame-sangue.jpg',
        thumbnail: '/thumbnails/image-thumb.png'
      }
    ],
    categories: [
      { name: 'Pessoal', count: 2, color: '#2196F3' },
      { name: 'Trabalho', count: 1, color: '#4CAF50' },
      { name: 'Médico', count: 2, color: '#F44336' },
      { name: 'Financeiro', count: 1, color: '#FF9800' },
      { name: 'Legal', count: 0, color: '#9C27B0' },
      { name: 'Outros', count: 0, color: '#757575' }
    ],
    storageStats: {
      used: 8.05,
      total: 10,
      percentage: 80.5
    }
  };

  res.status(200).json(mockData);
} 
