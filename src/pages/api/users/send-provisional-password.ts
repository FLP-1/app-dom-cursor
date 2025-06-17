/**
 * Arquivo: send-provisional-password.ts
 * Caminho: src/pages/api/users/send-provisional-password.ts
 * Criado em: 2025-06-07
 * Última atualização: 2025-06-07
 * Descrição: API para geração e envio de senha provisória por e-mail e WhatsApp. Usa credenciais de integração do arquivo .env ou arquivo secreto.
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import { getSecret } from '@/utils/getSecret';
// import { sendWhatsMessage } from '@/services/whatsapp'; // mock

function gerarSenhaProvisoria() {
  return Math.random().toString(36).slice(-8) + Math.random().toString(36).toUpperCase().slice(-2);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }
  const { userId, userType, channels } = req.body;
  // Buscar usuário no banco (mock)
  const usuario = { id: userId, nome: 'Usuário Exemplo', email: 'usuario@email.com', phone: '+5511999999999' };
  if (!usuario) return res.status(404).json({ error: 'Usuário não encontrado' });
  const senha = gerarSenhaProvisoria();
  // Atualizar senha provisória no banco (mock)
  // await updateUserPassword(userId, senha, true);
  let emailOk = true, whatsOk = true, erros: string[] = [];
  if (channels?.email && usuario.email) {
    try {
      // Envio de e-mail (mock, usar credenciais do .env)
      const transporter = nodemailer.createTransport({
        host: getSecret('EMAIL_HOST'),
        port: Number(getSecret('EMAIL_PORT')),
        secure: false,
        auth: {
          user: getSecret('EMAIL_USER'),
          pass: getSecret('EMAIL_PASS')
        }
      });
      await transporter.sendMail({
        from: getSecret('EMAIL_FROM'),
        to: usuario.email,
        subject: 'Senha provisória de acesso',
        text: `Olá,\nSua senha provisória de acesso é: ${senha}\nAltere no primeiro acesso.`
      });
    } catch (e) {
      emailOk = false;
      erros.push('Erro ao enviar e-mail.');
    }
  }
  if (channels?.whatsapp && usuario.phone) {
    try {
      // Envio de WhatsApp (mock, usar credenciais do .env)
      // await sendWhatsMessage(usuario.phone, `Sua senha provisória: ${senha}`);
      // Simulação:
      if (!getSecret('WHATSAPP_API_KEY')) throw new Error('Credencial WhatsApp não configurada');
    } catch (e) {
      whatsOk = false;
      erros.push('Erro ao enviar WhatsApp.');
    }
  }
  if (emailOk || whatsOk) {
    return res.status(200).json({ success: true, email: emailOk, whatsapp: whatsOk, erros });
  } else {
    return res.status(500).json({ error: erros.join(' ') });
  }
} 
