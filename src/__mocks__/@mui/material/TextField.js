/**
 * Arquivo: TextField.js
 * Caminho: src/__mocks__/@mui/material/TextField.js
 * Criado em: 2025-06-03
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

const React = require('react');

const TextField = React.forwardRef(({ multiline, type = 'text', ...props }, ref) => {
  if (multiline) {
    return React.createElement('textarea', { ...props, ref });
  }
  return React.createElement('input', { type, ...props, ref });
});

module.exports = TextField;
module.exports.TextField = TextField; 