/**
 * Arquivo: date.ts
 * Caminho: src/utils/validations/date.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Funções para validar datas e horários
 */

export const isValidDate = (date: string): boolean => {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(date)) return false;
  
  const [year, month, day] = date.split('-').map(Number);
  const dateObj = new Date(year, month - 1, day);
  
  return dateObj.getFullYear() === year &&
         dateObj.getMonth() === month - 1 &&
         dateObj.getDate() === day;
};

export const isValidTime = (time: string): boolean => {
  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
  if (!timeRegex.test(time)) return false;
  
  const [hours, minutes] = time.split(':').map(Number);
  return hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59;
}; 
