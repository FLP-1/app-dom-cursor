/**
 * Arquivo: file.ts
 * Caminho: src/utils/validations/file.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Função para validar arquivos
 */

export const isValidFile = (file: File): boolean => {
  // Tamanho máximo de 10MB
  const MAX_SIZE = 10 * 1024 * 1024;
  
  // Tipos de arquivo permitidos
  const ALLOWED_TYPES = [
    'application/pdf',
    'image/jpeg',
    'image/png',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  ];

  return file.size <= MAX_SIZE && ALLOWED_TYPES.includes(file.type);
}; 
