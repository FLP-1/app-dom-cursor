/**
 * Arquivo: UsuarioParceiroFormTypes.ts
 * Caminho: src/components/forms/usuario-parceiro/UsuarioParceiroFormTypes.ts
 * Criado em: 2025-06-07
 * Última atualização: 2025-06-07
 * Descrição: Tipos e interfaces para o formulário de usuário de parceiro (PF), modo simplificado e complementar.
 */
import { z } from 'zod';
import { usuarioParceiroSchemaSimplificado, usuarioParceiroSchemaCompleto } from '@/components/forms/usuario-parceiro/UsuarioParceiroFormSchema';

export type UsuarioParceiroSimplificado = z.infer<typeof usuarioParceiroSchemaSimplificado>;
export type UsuarioParceiroCompleto = z.infer<typeof usuarioParceiroSchemaCompleto>; 
