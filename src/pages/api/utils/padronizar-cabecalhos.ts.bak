/**
 * Arquivo: padronizar-cabecalhos.ts
 * Caminho: src/pages/api/utils/padronizar-cabecalhos.ts
 * Criado em: 2025-06-13
 * Última atualização: 2025-06-13
 * Descrição: API para padronizar cabeçalhos de arquivos
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

// Extensões suportadas e seus formatos de comentário
const EXTENSIONS = {
  ts:  'block',
  tsx: 'block',
  js:  'block',
  jsx: 'block',
  mjs: 'block',
  css: 'css',
  scss:'css',
  html:'html',
  md:  'html',
};

// Pastas a serem ignoradas
const IGNORAR = [
  'node_modules', '.next', '.git', '.pnpm-store', 'dist', 'build', '.turbo', '.vercel', '.cache', 'coverage'
];

// Função utilitária para obter datas do sistema de arquivos
function getFileDates(filePath: string) {
  const stats = fs.statSync(filePath);
  return {
    created: stats.birthtime.toISOString().split('T')[0],
    updated: stats.mtime.toISOString().split('T')[0],
  };
}

// Função para gerar cabeçalho conforme o tipo
function gerarCabecalho({ nome, caminho, criado, atualizado, descricao, tipo }: { nome: string, caminho: string, criado: string, atualizado: string, descricao: string, tipo: string }) {
  const linhas = [
    `Arquivo: ${nome}`,
    `Caminho: ${caminho}`,
    `Criado em: ${criado}`,
    `Última atualização: ${atualizado}`,
    `Descrição: ${descricao}`
  ];
  if (tipo === 'block') {
    return `/**\n * ${linhas.join('\n * ')}\n */\n\n`;
  }
  if (tipo === 'css') {
    return `/*\n * ${linhas.join('\n * ')}\n */\n\n`;
  }
  if (tipo === 'html') {
    return `<!--\n  ${linhas.join('\n  ')}\n-->\n\n`;
  }
  return '';
}

// Função para detectar se já existe cabeçalho padronizado
function temCabecalhoPadrao(conteudo: string, tipo: string) {
  if (tipo === 'block') return conteudo.startsWith('/**') && conteudo.includes('Arquivo:') && conteudo.includes('Caminho:');
  if (tipo === 'css')   return conteudo.startsWith('/*')  && conteudo.includes('Arquivo:') && conteudo.includes('Caminho:');
  if (tipo === 'html')  return conteudo.startsWith('<!--')&& conteudo.includes('Arquivo:') && conteudo.includes('Caminho:');
  return false;
}

// Função para extrair descrição do arquivo (primeira linha de comentário ou export default...)
function extrairDescricao(conteudo: string) {
  const match = conteudo.match(/\/\*\*([^*]|\*(?!\/))*\*\//);
  if (match) {
    const linhas = match[0].split('\n').map(l => l.replace(/\* ?/, '').trim());
    return linhas.find(l => l && !l.startsWith('Arquivo:') && !l.startsWith('Caminho:') && !l.startsWith('Criado em:') && !l.startsWith('Última atualização:') && !l.startsWith('Descrição:')) || 'Arquivo do projeto.';
  }
  const exportMatch = conteudo.match(/export default function ([^(]+)/);
  if (exportMatch) return `Componente React: ${exportMatch[1]}`;
  return 'Arquivo do projeto.';
}

// Função recursiva para processar arquivos
function processarArquivos(diretorio: string, alterados: string[], erros: string[]) {
  const arquivos = fs.readdirSync(diretorio);
  for (const arquivo of arquivos) {
    if (arquivo.startsWith('.')) continue; // ignora arquivos e pastas ocultos
    const caminhoAbsoluto = path.join(diretorio, arquivo);
    const stat = fs.statSync(caminhoAbsoluto);
    if (stat.isDirectory()) {
      if (IGNORAR.includes(arquivo)) continue;
      processarArquivos(caminhoAbsoluto, alterados, erros);
    } else {
      const ext = arquivo.split('.').pop()?.toLowerCase();
      const tipo = ext && EXTENSIONS[ext as keyof typeof EXTENSIONS];
      if (!tipo) continue; // ignora extensões não suportadas
      try {
        let conteudo = fs.readFileSync(caminhoAbsoluto, 'utf-8');
        const relPath = path.relative(process.cwd(), caminhoAbsoluto).replace(/\\/g, '/');
        const { created, updated } = getFileDates(caminhoAbsoluto);
        const descricao = extrairDescricao(conteudo);
        const cabecalho = gerarCabecalho({ nome: arquivo, caminho: relPath, criado: created, atualizado: updated, descricao, tipo });
        if (temCabecalhoPadrao(conteudo, tipo)) {
          if (tipo === 'block') conteudo = conteudo.replace(/^\/\*\*([^*]|\*(?!\/))*\*\//, '');
          if (tipo === 'css')   conteudo = conteudo.replace(/^\/\*([^*]|\*(?!\/))*\*\//, '');
          if (tipo === 'html')  conteudo = conteudo.replace(/^<!--([^-]|-(?!->))*-->/, '');
        }
        fs.writeFileSync(caminhoAbsoluto, cabecalho + conteudo.trimStart());
        alterados.push(relPath);
      } catch (e) {
        erros.push(`${arquivo}: ${e}`);
      }
    }
  }
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // TODO: Adicionar autenticação/restrição de acesso
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }
  const alterados: string[] = [];
  const erros: string[] = [];
  try {
    processarArquivos(process.cwd(), alterados, erros);
    return res.status(200).json({ alterados, erros, total: alterados.length });
  } catch (e) {
    return res.status(500).json({ error: String(e) });
  }
} 
