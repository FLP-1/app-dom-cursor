import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  const { category, isPublic, type, status, group, expiresAt, search } = req.query;

  try {
    // Monta o filtro dinâmico de forma robusta
    const where: any = {};
    if (category && category !== 'Todos') where.category = category;
    if (isPublic !== undefined) where.isPublic = isPublic === 'true';
    if (type && type !== 'Todos' && type !== '') where.type = { equals: type, mode: 'insensitive' };
    if (status && status !== 'Todos' && status !== '') where.status = status;
    if (group && group !== 'Todos' && group !== '') where.group = group;
    if (expiresAt && !isNaN(Date.parse(expiresAt as string))) {
      where.expiresAt = { lte: new Date(expiresAt as string) };
    }
    if (search && search.trim() !== '') where.name = { contains: search, mode: 'insensitive' };

    // Log detalhado dos filtros recebidos e filtro final
    console.log('Filtros recebidos na API:', {
      category, isPublic, type, status, group, expiresAt, search,
      where
    });

    const documents = await prisma.document.findMany({
      where,
      orderBy: { updatedAt: 'desc' },
    });

    // Exibe no terminal as informações buscadas
    console.log('Busca de documentos:', {
      filtros: where,
      quantidade: documents.length,
      nomes: documents.map(d => d.name),
    });

    return res.status(200).json(documents);
  } catch (error) {
    console.error('Erro ao buscar documentos:', error);
    return res.status(500).json({ message: 'Erro ao buscar documentos' });
  }
} 