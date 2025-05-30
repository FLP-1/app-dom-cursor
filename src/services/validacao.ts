import { api } from './api';

export interface ValidacaoResponse {
  codigo: string;
  mensagem: string;
  validado: boolean;
}

export async function validarEmail(email: string): Promise<ValidacaoResponse> {
  try {
    const response = await api.post('/validacao/email', { email });
    return response.data;
  } catch (error) {
    console.error('Erro ao validar email:', error);
    throw new Error('Não foi possível validar o email');
  }
}

export async function validarTelefone(telefone: string): Promise<ValidacaoResponse> {
  try {
    const response = await api.post('/validacao/telefone', { telefone });
    return response.data;
  } catch (error) {
    console.error('Erro ao validar telefone:', error);
    throw new Error('Não foi possível validar o telefone');
  }
} 