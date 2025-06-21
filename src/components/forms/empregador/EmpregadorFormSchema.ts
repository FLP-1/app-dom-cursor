/**
 * Arquivo: EmpregadorFormSchema.ts
 * Caminho: src/components/forms/empregador/EmpregadorFormSchema.ts
 * Criado em: 2025-06-07
 * Última atualização: 2025-06-07
 * Descrição: Schema de validação zod para o formulário de cadastro de empregador.
 */

import { z } from 'zod';
import { mensagens } from '@/i18n/mensagens';

const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/;
const telefoneRegex = /^\(\d{2}\)\s\d{4,5}\-\d{4}$/;
const cepRegex = /^\d{5}\-\d{3}$/;

export const empregadorFormSchema = z.object({
  nome: z.string()
    .min(3, mensagens.validacao.nome.min.pt)
    .max(100, mensagens.validacao.nome.max.pt),
  cnpj: z.string()
    .min(14, mensagens.validacao.cnpj.min.pt)
    .max(18, mensagens.validacao.cnpj.max.pt)
    .regex(cnpjRegex, mensagens.validacao.cnpj.formato.pt),
  email: z.string()
    .email(mensagens.validacao.email.formato.pt)
    .max(100, mensagens.validacao.email.max.pt),
  telefone: z.string()
    .min(8, mensagens.validacao.telefone.min.pt)
    .max(15, mensagens.validacao.telefone.max.pt)
    .regex(telefoneRegex, mensagens.validacao.telefone.formato.pt),
  cep: z.string()
    .min(8, mensagens.validacao.cep.min.pt)
    .max(9, mensagens.validacao.cep.max.pt)
    .regex(cepRegex, mensagens.validacao.cep.formato.pt),
  endereco: z.string()
    .min(3, mensagens.validacao.endereco.min.pt)
    .max(200, mensagens.validacao.endereco.max.pt),
  numero: z.string()
    .min(1, mensagens.validacao.numero.min.pt)
    .max(10, mensagens.validacao.numero.max.pt),
  complemento: z.string()
    .max(100, mensagens.validacao.complemento.max.pt)
    .optional(),
  bairro: z.string()
    .min(2, mensagens.validacao.bairro.min.pt)
    .max(100, mensagens.validacao.bairro.max.pt),
  cidade: z.string()
    .min(2, mensagens.validacao.cidade.min.pt)
    .max(100, mensagens.validacao.cidade.max.pt),
  estado: z.string()
    .min(2, mensagens.validacao.estado.min.pt)
    .max(2, mensagens.validacao.estado.max.pt),
}); 
