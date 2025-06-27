/**
 * Arquivo: index.ts
 * Caminho: src/pages/api/tarefas/index.ts
 * Criado em: 2025-01-27
 * Última atualização: 2025-01-27
 * Descrição: Endpoint da API para gerenciar tarefas com integração ao banco de dados via Prisma.
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import { getSession } from 'next-auth/react';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: 'Não autorizado' });
  }

  const userId = session.user?.id;

  if (!userId) {
    return res.status(401).json({ message: 'Usuário não identificado' });
  }

  try {
    switch (req.method) {
      case 'GET':
        return await handleGet(req, res, userId);
      case 'POST':
        return await handlePost(req, res, userId);
      case 'PUT':
        return await handlePut(req, res, userId);
      case 'DELETE':
        return await handleDelete(req, res, userId);
      default:
        return res.status(405).json({ message: 'Método não permitido' });
    }
  } catch (error) {
    console.error('Erro na API de tarefas:', error);
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
}

async function handleGet(req: NextApiRequest, res: NextApiResponse, userId: string) {
  const { status, prioridade, responsavelId, busca } = req.query;

  try {
    // Buscar tarefas do usuário
    const where: any = {
      createdBy: userId,
    };

    if (status && status !== 'all') {
      where.status = status;
    }

    if (prioridade && prioridade !== 'all') {
      where.prioridade = prioridade;
    }

    if (responsavelId) {
      where.assignedTo = responsavelId;
    }

    if (busca) {
      where.OR = [
        { title: { contains: String(busca), mode: 'insensitive' } },
        { description: { contains: String(busca), mode: 'insensitive' } },
      ];
    }

    const tasks = await prisma.task.findMany({
      where,
      include: {
        assigned: {
          select: {
            name: true,
          },
        },
        creator: {
          select: {
            name: true,
          },
        },
        group: {
          select: {
            name: true,
          },
        },
      },
      orderBy: [
        { prioridade: 'desc' },
        { dataVencimento: 'asc' },
        { createdAt: 'desc' },
      ],
    });

    // Processar dados para o formato esperado pelo frontend
    const processedTasks = tasks.map(task => ({
      id: task.id,
      title: task.title,
      description: task.description || '',
      priority: task.prioridade.toLowerCase(),
      status: task.status.toLowerCase(),
      category: 'personal', // Default category
      dueDate: task.dataVencimento?.toISOString().split('T')[0] || '',
      createdAt: task.createdAt.toISOString().split('T')[0],
      completedAt: task.dataConclusao?.toISOString().split('T')[0],
      assignedTo: task.assignedTo,
      tags: [],
      estimatedTime: '',
      actualTime: '',
      responsavelNome: task.assigned?.name || '-',
      criadorNome: task.creator?.name || '-',
    }));

    // Calcular estatísticas
    const today = new Date();
    const todayTasks = processedTasks.filter(task => 
      task.dueDate === today.toISOString().split('T')[0]
    );

    const upcomingTasks = processedTasks.filter(task => 
      new Date(task.dueDate) > today && task.status !== 'completed'
    );

    const completedTasks = processedTasks.filter(task => 
      task.status === 'completed'
    );

    // Categorias mockadas (pode ser expandido no futuro)
    const categories = [
      { name: 'Trabalho Doméstico', count: processedTasks.filter(t => t.category === 'housework').length, color: '#4CAF50' },
      { name: 'Compras', count: processedTasks.filter(t => t.category === 'shopping').length, color: '#FF9800' },
      { name: 'Saúde', count: processedTasks.filter(t => t.category === 'health').length, color: '#F44336' },
      { name: 'Pessoal', count: processedTasks.filter(t => t.category === 'personal').length, color: '#2196F3' },
      { name: 'Trabalho', count: processedTasks.filter(t => t.category === 'work').length, color: '#9C27B0' },
      { name: 'Outros', count: processedTasks.filter(t => !['housework', 'shopping', 'health', 'personal', 'work'].includes(t.category)).length, color: '#757575' }
    ];

    const stats = {
      total: processedTasks.length,
      pending: processedTasks.filter(t => t.status === 'pending').length,
      inProgress: processedTasks.filter(t => t.status === 'in_progress').length,
      completed: completedTasks.length,
      overdue: processedTasks.filter(t => new Date(t.dueDate) < today && t.status !== 'completed').length,
    };

    const response = {
      tasks: processedTasks,
      todayTasks,
      upcomingTasks,
      completedTasks,
      categories,
      stats,
    };

    return res.status(200).json(response);
  } catch (error) {
    console.error('Erro ao buscar tarefas:', error);
    return res.status(500).json({ message: 'Erro ao buscar tarefas' });
  }
}

async function handlePost(req: NextApiRequest, res: NextApiResponse, userId: string) {
  const { title, description, priority, status, dueDate, estimatedTime, category } = req.body;

  if (!title) {
    return res.status(400).json({ message: 'Título é obrigatório' });
  }

  try {
    // Buscar grupo do usuário (assumindo que o usuário tem um grupo)
    const userGroup = await prisma.userGroup.findFirst({
      where: { userId },
      include: { group: true },
    });

    if (!userGroup) {
      return res.status(400).json({ message: 'Usuário não está em nenhum grupo' });
    }

    const task = await prisma.task.create({
      data: {
        title,
        description,
        status: status?.toUpperCase() || 'PENDING',
        prioridade: priority?.toUpperCase() || 'MEDIA',
        dataVencimento: dueDate ? new Date(dueDate) : null,
        observacoes: estimatedTime,
        groupId: userGroup.groupId,
        createdBy: userId,
      },
    });

    return res.status(201).json(task);
  } catch (error) {
    console.error('Erro ao criar tarefa:', error);
    return res.status(500).json({ message: 'Erro ao criar tarefa' });
  }
}

async function handlePut(req: NextApiRequest, res: NextApiResponse, userId: string) {
  const { id, title, description, priority, status, dueDate, estimatedTime, category } = req.body;

  if (!id) {
    return res.status(400).json({ message: 'ID é obrigatório' });
  }

  try {
    // Verificar se a tarefa pertence ao usuário
    const existingTask = await prisma.task.findFirst({
      where: { id, createdBy: userId },
    });

    if (!existingTask) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }

    const updateData: any = {};

    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (priority !== undefined) updateData.prioridade = priority.toUpperCase();
    if (status !== undefined) updateData.status = status.toUpperCase();
    if (dueDate !== undefined) updateData.dataVencimento = dueDate ? new Date(dueDate) : null;
    if (estimatedTime !== undefined) updateData.observacoes = estimatedTime;

    // Se o status foi alterado para COMPLETED, definir dataConclusao
    if (status === 'completed' && existingTask.status !== 'COMPLETED') {
      updateData.dataConclusao = new Date();
    } else if (status !== 'completed' && existingTask.status === 'COMPLETED') {
      updateData.dataConclusao = null;
    }

    const task = await prisma.task.update({
      where: { id },
      data: updateData,
    });

    return res.status(200).json(task);
  } catch (error) {
    console.error('Erro ao atualizar tarefa:', error);
    return res.status(500).json({ message: 'Erro ao atualizar tarefa' });
  }
}

async function handleDelete(req: NextApiRequest, res: NextApiResponse, userId: string) {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: 'ID é obrigatório' });
  }

  try {
    // Verificar se a tarefa pertence ao usuário
    const existingTask = await prisma.task.findFirst({
      where: { id, createdBy: userId },
    });

    if (!existingTask) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }

    await prisma.task.delete({
      where: { id },
    });

    return res.status(200).json({ message: 'Tarefa removida com sucesso' });
  } catch (error) {
    console.error('Erro ao remover tarefa:', error);
    return res.status(500).json({ message: 'Erro ao remover tarefa' });
  }
} 