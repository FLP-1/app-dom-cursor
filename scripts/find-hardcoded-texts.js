/**
 * Arquivo: find-hardcoded-texts.js
 * Caminho: scripts/find-hardcoded-texts.js
 * Criado em: 2025-01-27
 * Última atualização: 2025-01-27
 * Descrição: Script para encontrar textos hardcoded no projeto
 */

const fs = require('fs');
const path = require('path');

// Padrões para buscar textos hardcoded
const patterns = [
  { regex: /label=["']([^"']+)["']/g, type: 'label' },
  { regex: /placeholder=["']([^"']+)["']/g, type: 'placeholder' },
  { regex: /title=["']([^"']+)["']/g, type: 'title' },
  { regex: /aria-label=["']([^"']+)["']/g, type: 'aria-label' },
  { regex: />([^<>{}\n]+[a-zA-ZÀ-ÿ][^<>{}\n]*)</g, type: 'text content' },
];

// Diretórios para ignorar
const ignoreDirs = [
  'node_modules',
  '.next',
  '.git',
  'dist',
  'build',
  'coverage',
];

// Extensões de arquivo para processar
const fileExtensions = ['.tsx', '.ts', '.jsx', '.js'];

function findHardcodedTexts(dir, results = []) {
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      if (!ignoreDirs.includes(item)) {
        findHardcodedTexts(fullPath, results);
      }
    } else if (fileExtensions.some(ext => item.endsWith(ext))) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const lines = content.split('\n');
      
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const lineNumber = i + 1;
        
        patterns.forEach(pattern => {
          let match;
          while ((match = pattern.regex.exec(line)) !== null) {
            const text = match[1];
            
            // Filtrar textos que parecem ser variáveis ou imports
            if (text && 
                text.length > 2 && 
                !text.startsWith('{') && 
                !text.startsWith('$') &&
                !text.includes('import') &&
                !text.includes('export') &&
                !text.includes('require') &&
                !text.match(/^[A-Z_]+$/) && // Constantes
                !text.match(/^[a-z][a-zA-Z]*\.[a-zA-Z]+$/) && // Objeto.propriedade
                !text.match(/^[a-z][a-zA-Z]*\(\)$/) // Função()
            ) {
              results.push({
                file: fullPath,
                line: lineNumber,
                type: pattern.type,
                text: text.trim(),
                fullLine: line.trim()
              });
            }
          }
        });
      }
    }
  }
  
  return results;
}

function main() {
  console.log('🔍 Buscando textos hardcoded no projeto...\n');
  
  const results = findHardcodedTexts('./src');
  
  if (results.length === 0) {
    console.log('✅ Nenhum texto hardcoded encontrado!');
    return;
  }
  
  console.log(`📊 Encontrados ${results.length} possíveis textos hardcoded:\n`);
  
  // Agrupar por arquivo
  const grouped = results.reduce((acc, item) => {
    if (!acc[item.file]) {
      acc[item.file] = [];
    }
    acc[item.file].push(item);
    return acc;
  }, {});
  
  Object.keys(grouped).forEach(file => {
    console.log(`📁 ${file}:`);
    grouped[file].forEach(item => {
      console.log(`  Linha ${item.line} (${item.type}): "${item.text}"`);
      console.log(`    ${item.fullLine}`);
    });
    console.log('');
  });
  
  console.log('💡 Dica: Verifique se estes textos devem ser movidos para o sistema de mensagens centralizadas.');
}

if (require.main === module) {
  main();
}

module.exports = { findHardcodedTexts }; 