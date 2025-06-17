/**
 * Arquivo: Button.js
 * Caminho: src/__mocks__/@mui/material/Button.js
 * Criado em: 2025-06-03
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

const React = require('react');
const Button = React.forwardRef(({ children, ...props }, ref) =>
  React.createElement('button', { ...props, ref }, children)
);
module.exports = Button;
module.exports.Button = Button; 