/**
 * Arquivo: FamiliarFormUtils.ts
 * Caminho: src/components/forms/familiar/FamiliarFormUtils.ts
 * Criado em: 2025-06-07
 * Última atualização: 2025-06-07
 * Descrição: Funções utilitárias para validação de CPF e busca de CEP no formulário de familiar.
 */

export function validarCPF(cpf: string): boolean {
  // Validação simples de CPF (pode ser substituída por lib externa se necessário)
  cpf = cpf.replace(/\D/g, '');
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
  let soma = 0;
  let resto;
  for (let i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.substring(9, 10))) return false;
  soma = 0;
  for (let i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.substring(10, 11))) return false;
  return true;
}

export async function buscarCEP(cep: string): Promise<{logradouro: string; bairro: string; localidade: string; uf: string;} | null> {
  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();
    if (data.erro) return null;
    return {
      logradouro: data.logradouro,
      bairro: data.bairro,
      localidade: data.localidade,
      uf: data.uf,
    };
  } catch {
    return null;
  }
} 
