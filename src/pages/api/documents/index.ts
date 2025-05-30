import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import { getSession } from 'next-auth/react';
import { TipoDocumentoEsocial } from '@prisma/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: 'Não autorizado' });
  }

  switch (req.method) {
    case 'GET':
      try {
        const { tipo, empregadoId, esocialEventId, page = 1, limit = 10 } = req.query;
        
        const skip = (Number(page) - 1) * Number(limit);
        
        const where = {
          ...(tipo && { tipo: tipo as TipoDocumentoEsocial }),
          ...(empregadoId && { empregadoDomesticoId: String(empregadoId) }),
          ...(esocialEventId && { esocialEventId: String(esocialEventId) }),
          uploadedBy: session.user.id
        };

        const [documents, total] = await Promise.all([
          prisma.document.findMany({
            where,
            skip,
            take: Number(limit),
            orderBy: { dataUpload: 'desc' },
            include: {
              empregadoDomestico: {
                select: {
                  id: true,
                  nome: true
                }
              },
              esocialEvent: {
                select: {
                  id: true,
                  tipo: true
                }
              }
            }
          }),
          prisma.document.count({ where })
        ]);

        return res.status(200).json({
          documents,
          total,
          pages: Math.ceil(total / Number(limit))
        });
      } catch (error) {
        console.error('Erro ao buscar documentos:', error);
        return res.status(500).json({ error: 'Erro ao buscar documentos' });
      }

    case 'POST':
      try {
        const { nome, tipo, url, dataValidade, empregadoDomesticoId, esocialEventId, isPublic } = req.body;

        const document = await prisma.document.create({
          data: {
            nome,
            tipo,
            url,
            dataValidade: dataValidade ? new Date(dataValidade) : null,
            uploadedBy: session.user.id,
            empregadoDomesticoId: empregadoDomesticoId || null,
            esocialEventId: esocialEventId || null,
            isPublic: isPublic || false
          }
        });

        return res.status(201).json(document);
      } catch (error) {
        console.error('Erro ao criar documento:', error);
        return res.status(500).json({ error: 'Erro ao criar documento' });
      }

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).json({ error: `Método ${req.method} não permitido` });
  }
} 