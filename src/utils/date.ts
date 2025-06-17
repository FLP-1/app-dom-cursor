/**
 * Arquivo: date.ts
 * Caminho: src/utils/date.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Funções para manipulação de datas
 */

// Função para formatar data ISO ou Date para dd/mm/aaaa
export function formatDateBR(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  if (isNaN(d.getTime())) return '';
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

// Função para converter dd/mm/aaaa para ISO (yyyy-mm-dd)
export function parseDateBRtoISO(dateBR: string): string {
  const [day, month, year] = dateBR.split('/');
  if (!day || !month || !year) return '';
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
}

// Função para converter ISO (yyyy-mm-dd) para dd/mm/aaaa
export function parseISOtoDateBR(iso: string): string {
  if (!iso) return '';
  const [year, month, day] = iso.split('-');
  if (!year || !month || !day) return '';
  return `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year}`;
} 
