import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import { getSession } from 'next-auth/react';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: 'Não autorizado' });
  }

  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'ID inválido' });
  }

  switch (req.method) {
    case 'GET':
      try {
        const document = await prisma.document.findUnique({
          where: { id },
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
        });

        if (!document) {
          return res.status(404).json({ error: 'Documento não encontrado' });
        }

        if (document.uploadedBy !== session.user.id && !document.isPublic) {
          return res.status(403).json({ error: 'Acesso negado' });
        }

        return res.status(200).json(document);
      } catch (error) {
        console.error('Erro ao buscar documento:', error);
        return res.status(500).json({ error: 'Erro ao buscar documento' });
      }

    case 'PUT':
      try {
        const { nome, tipo, url, dataValidade, empregadoDomesticoId, esocialEventId, isPublic } = req.body;

        const document = await prisma.document.findUnique({
          where: { id }
        });

        if (!document) {
          return res.status(404).json({ error: 'Documento não encontrado' });
        }

        if (document.uploadedBy !== session.user.id) {
          return res.status(403).json({ error: 'Acesso negado' });
        }

        const updatedDocument = await prisma.document.update({
          where: { id },
          data: {
            nome,
            tipo,
            url,
            dataValidade: dataValidade ? new Date(dataValidade) : null,
            empregadoDomesticoId: empregadoDomesticoId || null,
            esocialEventId: esocialEventId || null,
            isPublic: isPublic || false
          }
        });

        return res.status(200).json(updatedDocument);
      } catch (error) {
        console.error('Erro ao atualizar documento:', error);
        return res.status(500).json({ error: 'Erro ao atualizar documento' });
      }

    case 'DELETE':
      try {
        const document = await prisma.document.findUnique({
          where: { id }
        });

        if (!document) {
          return res.status(404).json({ error: 'Documento não encontrado' });
        }

        if (document.uploadedBy !== session.user.id) {
          return res.status(403).json({ error: 'Acesso negado' });
        }

        await prisma.document.delete({
          where: { id }
        });

        return res.status(204).end();
      } catch (error) {
        console.error('Erro ao excluir documento:', error);
        return res.status(500).json({ error: 'Erro ao excluir documento' });
      }

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      return res.status(405).json({ error: `Método ${req.method} não permitido` });
  }
} 