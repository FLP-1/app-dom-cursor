/**
 * Arquivo: remove-grid-item-prop.js
 * Caminho: remove-grid-item-prop.js
 * Criado em: 2025-06-11
 * Última atualização: 2025-06-11
 * Descrição: Arquivo do projeto.
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

glob('src/**/*.tsx', (err, files) => {
  if (err) throw err;
  files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    // Remove apenas a prop item (com ou sem espaço antes/depois)
    const newContent = content.replace(/<Grid([^>]*?)\sitem(\s|>)/g, '<Grid$1$2');
    if (content !== newContent) {
      fs.writeFileSync(file, newContent, 'utf8');
      console.log(`Atualizado: ${file}`);
    }
  });
});