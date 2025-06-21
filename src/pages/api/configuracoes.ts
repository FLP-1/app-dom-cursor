/**
 * Arquivo: configuracoes.ts
 * Caminho: src/pages/api/configuracoes.ts
 * Criado em: 2025-06-12
 * Última atualização: 2025-06-13
 * Descrição: API para gerenciar configurações globais
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Listar todas as configurações
    try {
      const configs = await prisma.configuracaoGlobal.findMany();
      const result = configs.reduce((acc, curr) => {
        acc[curr.chave] = curr.valor;
        return acc;
      }, {} as Record<string, string>);
      return res.status(200).json(result);
    } catch (error) {
      console.error('Erro ao buscar configurações globais:', error);
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }

  if (req.method === 'POST') {
    // Criar nova configuração
    const { chave, valor, descricao } = req.body;
    if (!chave || typeof valor === 'undefined') {
      return res.status(400).json({ message: 'Chave e valor são obrigatórios.' });
    }
    try {
      const exists = await prisma.configuracaoGlobal.findUnique({ where: { chave } });
      if (exists) {
        return res.status(409).json({ message: 'Já existe uma configuração com essa chave.' });
      }
      const config = await prisma.configuracaoGlobal.create({
        data: { chave, valor, descricao },
      });
      return res.status(201).json(config);
    } catch (error) {
      console.error('Erro ao criar configuração:', error);
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }

  if (req.method === 'PUT') {
    // Atualizar configuração existente
    const { chave, valor, descricao } = req.body;
    if (!chave || typeof valor === 'undefined') {
      return res.status(400).json({ message: 'Chave e valor são obrigatórios.' });
    }
    try {
      const config = await prisma.configuracaoGlobal.update({
        where: { chave },
        data: { valor, descricao },
      });
      return res.status(200).json(config);
    } catch (error) {
      console.error('Erro ao atualizar configuração:', error);
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }

  if (req.method === 'DELETE') {
    // Remover configuração
    const { chave } = req.body;
    if (!chave) {
      return res.status(400).json({ message: 'Chave é obrigatória.' });
    }
    try {
      await prisma.configuracaoGlobal.delete({ where: { chave } });
      return res.status(200).json({ message: 'Configuração removida com sucesso.' });
    } catch (error) {
      console.error('Erro ao remover configuração:', error);
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }

  return res.status(405).json({ message: 'Método não permitido' });
} 
