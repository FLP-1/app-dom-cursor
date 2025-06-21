/**
 * Arquivo: UsuarioParceiroFormSchema.ts
 * Caminho: src/components/forms/usuario-parceiro/UsuarioParceiroFormSchema.ts
 * Criado em: 2025-06-07
 * Última atualização: 2025-06-07
 * Descrição: Schemas de validação Zod para cadastro de usuário de parceiro (PF), modo simplificado e complementar.
 */
import * as z from 'zod';

export const usuarioParceiroSchemaSimplificado = z.object({
  nome: z.string().min(3, 'Nome obrigatório'),
  apelido: z.string().min(2, 'Nome abreviado obrigatório'),
  email: z.string().email('E-mail inválido'),
  celular: z.string().min(10, 'Celular obrigatório'),
  cpf: z.string().length(11, 'CPF inválido'),
});

export const usuarioParceiroSchemaCompleto = usuarioParceiroSchemaSimplificado.extend({
  dataNascimento: z.string().min(10, 'Data de nascimento obrigatória'),
  sexo: z.string().min(1, 'Sexo obrigatório'),
  endereco: z.object({
    cep: z.string().min(8, 'CEP obrigatório'),
    logradouro: z.string(),
    numero: z.string(),
    bairro: z.string(),
    municipio: z.string(),
    uf: z.string(),
  }).optional(),
}); 
