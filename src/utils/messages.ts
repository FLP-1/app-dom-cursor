/**
 * Arquivo: messages.ts
 * Caminho: src/utils/messages.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Mensagens de sucesso e erro
 */

export const messages = {
  perfil: {
    sucesso: {
      atualizado: 'Perfil atualizado com sucesso!',
      emailVerificado: 'Email verificado com sucesso!',
      celularVerificado: 'Celular verificado com sucesso!',
    },
    erro: {
      atualizacao: 'Erro ao atualizar perfil. Tente novamente.',
      emailJaExiste: 'Este email já está em uso.',
      telefoneJaExiste: 'Este telefone já está em uso.',
    },
    validacao: {
      nome: 'Nome deve ter no mínimo 3 caracteres',
      email: 'Email inválido',
      telefone: 'Telefone inválido',
      cep: 'CEP inválido',
      logradouro: 'Logradouro inválido',
      numero: 'Número é obrigatório',
      bairro: 'Bairro inválido',
      cidade: 'Cidade inválida',
      estado: 'Estado inválido',
    },
  },
  cep: {
    erro: {
      busca: 'Erro ao buscar CEP. Tente novamente.',
      naoEncontrado: 'CEP não encontrado.',
      formato: 'CEP deve conter 8 dígitos.',
    },
  },
  verificacao: {
    email: {
      sucesso: 'Código enviado com sucesso!',
      erro: 'Erro ao enviar código. Tente novamente.',
      codigoInvalido: 'Código inválido.',
      codigoExpirado: 'Código expirado.',
    },
    telefone: {
      sucesso: 'Código enviado com sucesso!',
      erro: 'Erro ao enviar código. Tente novamente.',
      codigoInvalido: 'Código inválido.',
      codigoExpirado: 'Código expirado.',
    },
  },
} as const; 
