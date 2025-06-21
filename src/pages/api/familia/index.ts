/**
 * Arquivo: index.ts
 * Caminho: src/pages/api/familia/index.ts
 * Criado em: 2025-01-27
 * Última atualização: 2025-01-27
 * Descrição: Endpoint da API para fornecer dados de família.
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { FamilyData } from '@/hooks/useFamilyData';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<FamilyData>
) {
  const mockData: FamilyData = {
    members: [
      {
        id: '1',
        name: 'Maria Silva',
        relationship: 'spouse',
        age: 35,
        birthDate: '1989-05-15',
        phone: '(11) 99999-1111',
        email: 'maria.silva@email.com',
        address: 'Rua das Flores, 123 - São Paulo, SP',
        occupation: 'Professora',
        emergencyContact: true,
        medicalInfo: {
          bloodType: 'O+',
          allergies: ['Penicilina'],
          medications: ['Vitamina D'],
          conditions: []
        },
        documents: [
          { id: '1', name: 'RG', type: 'Identidade', expiryDate: '2030-12-31' },
          { id: '2', name: 'CPF', type: 'CPF' },
          { id: '3', name: 'CNH', type: 'Habilitação', expiryDate: '2028-06-15' }
        ],
        avatar: '/avatars/maria.jpg'
      },
      {
        id: '2',
        name: 'João Silva',
        relationship: 'child',
        age: 12,
        birthDate: '2012-08-22',
        phone: '(11) 99999-2222',
        address: 'Rua das Flores, 123 - São Paulo, SP',
        emergencyContact: false,
        medicalInfo: {
          bloodType: 'A+',
          allergies: ['Amendoim', 'Lactose'],
          medications: [],
          conditions: ['Asma']
        },
        documents: [
          { id: '4', name: 'Certidão de Nascimento', type: 'Nascimento' },
          { id: '5', name: 'RG', type: 'Identidade', expiryDate: '2032-08-22' }
        ],
        avatar: '/avatars/joao.jpg'
      },
      {
        id: '3',
        name: 'Ana Silva',
        relationship: 'child',
        age: 8,
        birthDate: '2016-03-10',
        phone: '(11) 99999-3333',
        address: 'Rua das Flores, 123 - São Paulo, SP',
        emergencyContact: false,
        medicalInfo: {
          bloodType: 'O+',
          allergies: [],
          medications: [],
          conditions: []
        },
        documents: [
          { id: '6', name: 'Certidão de Nascimento', type: 'Nascimento' }
        ],
        avatar: '/avatars/ana.jpg'
      },
      {
        id: '4',
        name: 'José Santos',
        relationship: 'parent',
        age: 68,
        birthDate: '1956-11-30',
        phone: '(11) 99999-4444',
        email: 'jose.santos@email.com',
        address: 'Rua dos Ipês, 456 - São Paulo, SP',
        occupation: 'Aposentado',
        emergencyContact: true,
        medicalInfo: {
          bloodType: 'B+',
          allergies: ['Sulfa'],
          medications: ['Pressão alta', 'Diabetes'],
          conditions: ['Hipertensão', 'Diabetes tipo 2']
        },
        documents: [
          { id: '7', name: 'RG', type: 'Identidade', expiryDate: '2026-11-30' },
          { id: '8', name: 'CPF', type: 'CPF' },
          { id: '9', name: 'Carteira de Aposentado', type: 'Aposentadoria' }
        ],
        avatar: '/avatars/jose.jpg'
      }
    ],
    emergencyContacts: [
      {
        id: '1',
        name: 'Maria Silva',
        relationship: 'spouse',
        age: 35,
        birthDate: '1989-05-15',
        phone: '(11) 99999-1111',
        email: 'maria.silva@email.com',
        address: 'Rua das Flores, 123 - São Paulo, SP',
        occupation: 'Professora',
        emergencyContact: true,
        medicalInfo: {
          bloodType: 'O+',
          allergies: ['Penicilina'],
          medications: ['Vitamina D'],
          conditions: []
        },
        documents: [],
        avatar: '/avatars/maria.jpg'
      },
      {
        id: '4',
        name: 'José Santos',
        relationship: 'parent',
        age: 68,
        birthDate: '1956-11-30',
        phone: '(11) 99999-4444',
        email: 'jose.santos@email.com',
        address: 'Rua dos Ipês, 456 - São Paulo, SP',
        occupation: 'Aposentado',
        emergencyContact: true,
        medicalInfo: {
          bloodType: 'B+',
          allergies: ['Sulfa'],
          medications: ['Pressão alta', 'Diabetes'],
          conditions: ['Hipertensão', 'Diabetes tipo 2']
        },
        documents: [],
        avatar: '/avatars/jose.jpg'
      }
    ],
    upcomingBirthdays: [
      {
        id: '3',
        name: 'Ana Silva',
        relationship: 'child',
        age: 8,
        birthDate: '2016-03-10',
        phone: '(11) 99999-3333',
        address: 'Rua das Flores, 123 - São Paulo, SP',
        emergencyContact: false,
        medicalInfo: {
          bloodType: 'O+',
          allergies: [],
          medications: [],
          conditions: []
        },
        documents: [],
        avatar: '/avatars/ana.jpg'
      },
      {
        id: '1',
        name: 'Maria Silva',
        relationship: 'spouse',
        age: 35,
        birthDate: '1989-05-15',
        phone: '(11) 99999-1111',
        email: 'maria.silva@email.com',
        address: 'Rua das Flores, 123 - São Paulo, SP',
        occupation: 'Professora',
        emergencyContact: true,
        medicalInfo: {
          bloodType: 'O+',
          allergies: ['Penicilina'],
          medications: ['Vitamina D'],
          conditions: []
        },
        documents: [],
        avatar: '/avatars/maria.jpg'
      }
    ],
    medicalAlerts: [
      {
        memberId: '2',
        memberName: 'João Silva',
        alert: 'Alergia a amendoim - sempre verificar rótulos',
        priority: 'high'
      },
      {
        memberId: '4',
        memberName: 'José Santos',
        alert: 'Medicamento para pressão alta deve ser tomado diariamente',
        priority: 'medium'
      },
      {
        memberId: '2',
        memberName: 'João Silva',
        alert: 'Inalador para asma deve estar sempre disponível',
        priority: 'high'
      }
    ],
    stats: {
      totalMembers: 4,
      children: 2,
      adults: 1,
      seniors: 1
    }
  };

  res.status(200).json(mockData);
} 