/**
 * Arquivo: TextareaAutosize.js
 * Caminho: src/__mocks__/@mui/base/TextareaAutosize.js
 * Criado em: 2025-06-03
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

const React = require('react');
const filterProps = (props) => {
  const { maxRows, minRows, onResize, ...rest } = props;
  return rest;
};
const TextareaAutosize = React.forwardRef((props, ref) => React.createElement('textarea', { ...filterProps(props), ref }));
module.exports = TextareaAutosize;
module.exports.TextareaAutosize = TextareaAutosize; 