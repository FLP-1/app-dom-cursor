/**
 * Arquivo: cep.ts
 * Caminho: src/lib/cep.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

interface CEPResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}

export async function buscarCEP(cep: string): Promise<CEPResponse> {
  const cepLimpo = cep.replace(/\D/g, '');

  if (cepLimpo.length !== 8) {
    throw new Error('CEP inválido');
  }

  const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);

  if (!response.ok) {
    throw new Error('Erro ao buscar CEP');
  }

  const data = await response.json();

  if (data.erro) {
    throw new Error('CEP não encontrado');
  }

  return data;
} 
