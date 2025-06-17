/**
 * Arquivo: upload.ts
 * Caminho: src/pages/api/documents/upload.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: API para upload de documentos
 */

import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { IncomingForm } from 'formidable';
import { promises as fs } from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Método ${req.method} não permitido` });
  }

  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: 'Não autorizado' });
  }

  try {
    const form = new IncomingForm({
      uploadDir: path.join(process.cwd(), 'public', 'uploads'),
      keepExtensions: true,
      maxFileSize: 10 * 1024 * 1024, // 10MB
    });

    const [fields, files] = await new Promise<[formidable.Fields, formidable.Files]>((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve([fields, files]);
      });
    });

    const file = files.file as formidable.File;
    if (!file) {
      return res.status(400).json({ error: 'Nenhum arquivo enviado' });
    }

    // Gera um nome único para o arquivo
    const fileExtension = path.extname(file.originalFilename || '');
    const newFileName = `${uuidv4()}${fileExtension}`;
    const newFilePath = path.join(process.cwd(), 'public', 'uploads', newFileName);

    // Move o arquivo para o local final
    await fs.rename(file.filepath, newFilePath);

    // Retorna a URL do arquivo
    const fileUrl = `/uploads/${newFileName}`;

    return res.status(200).json({
      url: fileUrl,
      name: file.originalFilename,
      size: file.size,
      type: file.mimetype
    });
  } catch (error) {
    console.error('Erro no upload:', error);
    return res.status(500).json({ error: 'Erro no upload do arquivo' });
  }
} 
