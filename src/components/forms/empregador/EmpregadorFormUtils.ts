/**
 * Arquivo: EmpregadorFormUtils.ts
 * Caminho: src/components/forms/empregador/EmpregadorFormUtils.ts
 * Criado em: 2025-06-07
 * Última atualização: 2025-06-07
 * Descrição: Funções utilitárias para validação de CNPJ e busca de CEP no formulário de empregador.
 */

interface CEPResponse {
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
}

/**
 * Valida um CNPJ usando o algoritmo oficial da Receita Federal
 * @param cnpj - CNPJ a ser validado (com ou sem máscara)
 * @returns boolean indicando se o CNPJ é válido
 */
export function validarCNPJ(cnpj: string): boolean {
  const cnpjLimpo = cnpj.replace(/\D/g, '');
  
  if (cnpjLimpo.length !== 14) return false;
  if (/^(\d)\1+$/.test(cnpjLimpo)) return false;

  let tamanho = cnpjLimpo.length - 2;
  let numeros = cnpjLimpo.substring(0, tamanho);
  let digitos = cnpjLimpo.substring(tamanho);
  let soma = 0;
  let pos = tamanho - 7;

  for (let i = tamanho; i >= 1; i--) {
    soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
    if (pos < 2) pos = 9;
  }

  let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado !== parseInt(digitos.charAt(0))) return false;

  tamanho = tamanho + 1;
  numeros = cnpjLimpo.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;

  for (let i = tamanho; i >= 1; i--) {
    soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
    if (pos < 2) pos = 9;
  }

  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado !== parseInt(digitos.charAt(1))) return false;

  return true;
}

/**
 * Busca informações de endereço a partir de um CEP usando a API ViaCEP
 * @param cep - CEP a ser consultado (com ou sem máscara)
 * @returns Promise com os dados do endereço ou null em caso de erro
 */
export async function buscarCEP(cep: string): Promise<CEPResponse | null> {
  try {
    const cepLimpo = cep.replace(/\D/g, '');
    const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
    
    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    
    if (data.erro) {
      return null;
    }

    return {
      logradouro: data.logradouro,
      bairro: data.bairro,
      localidade: data.localidade,
      uf: data.uf,
    };
  } catch (error) {
    console.error('Erro ao buscar CEP:', error);
    return null;
  }
} 
