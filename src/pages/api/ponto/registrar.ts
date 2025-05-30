import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

// Schema de validação
const registroSchema = z.object({
  dataHora: z.date(),
  tipo: z.enum(['ENTRADA', 'SAIDA']),
  latitude: z.number(),
  longitude: z.number(),
  timezone: z.string(),
  dispositivo: z.string(),
  ip: z.string()
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  try {
    // Verifica autenticação
    const session = await getSession({ req });
    if (!session?.user) {
      return res.status(401).json({ message: 'Não autorizado' });
    }

    // Valida dados do registro
    const registro = registroSchema.parse(req.body);

    // Validações de segurança
    const validacoes = await Promise.all([
      // 1. Verifica se já existe registro no mesmo minuto
      prisma.registroPonto.findFirst({
        where: {
          usuarioId: session.user.id,
          dataHora: {
            gte: new Date(registro.dataHora.getTime() - 60000), // 1 minuto antes
            lte: new Date(registro.dataHora.getTime() + 60000)  // 1 minuto depois
          }
        }
      }),

      // 2. Verifica se o registro está dentro do horário permitido
      prisma.configuracaoPonto.findFirst({
        where: {
          usuarioId: session.user.id,
          ativo: true
        }
      })
    ]);

    const [registroExistente, configuracao] = validacoes;

    if (registroExistente) {
      return res.status(400).json({ 
        message: 'Já existe um registro de ponto neste horário' 
      });
    }

    if (!configuracao) {
      return res.status(400).json({ 
        message: 'Configuração de ponto não encontrada' 
      });
    }

    // Valida horário permitido
    const horaRegistro = registro.dataHora.getHours();
    const minutoRegistro = registro.dataHora.getMinutes();
    const horaMinima = configuracao.horaInicio.getHours();
    const minutoMinimo = configuracao.horaInicio.getMinutes();
    const horaMaxima = configuracao.horaFim.getHours();
    const minutoMaximo = configuracao.horaFim.getMinutes();

    const registroMinutos = horaRegistro * 60 + minutoRegistro;
    const inicioMinutos = horaMinima * 60 + minutoMinimo;
    const fimMinutos = horaMaxima * 60 + minutoMaximo;

    if (registroMinutos < inicioMinutos || registroMinutos > fimMinutos) {
      return res.status(400).json({ 
        message: 'Registro fora do horário permitido' 
      });
    }

    // 3. Valida geolocalização
    if (configuracao.latitude && configuracao.longitude && configuracao.raioMetros) {
      const distancia = calcularDistancia(
        configuracao.latitude,
        configuracao.longitude,
        registro.latitude,
        registro.longitude
      );

      if (distancia > configuracao.raioMetros) {
        return res.status(400).json({ 
          message: 'Registro fora da área permitida' 
        });
      }
    }

    // Cria o registro
    const novoRegistro = await prisma.registroPonto.create({
      data: {
        ...registro,
        usuarioId: session.user.id,
        validado: true // Pode ser false se precisar de aprovação
      }
    });

    return res.status(201).json(novoRegistro);
  } catch (error) {
    console.error('Erro ao registrar ponto:', error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        message: 'Dados inválidos', 
        errors: error.errors 
      });
    }
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
}

// Função auxiliar para calcular distância entre coordenadas
function calcularDistancia(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371e3; // Raio da Terra em metros
  const φ1 = lat1 * Math.PI/180;
  const φ2 = lat2 * Math.PI/180;
  const Δφ = (lat2-lat1) * Math.PI/180;
  const Δλ = (lon2-lon1) * Math.PI/180;

  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
          Math.cos(φ1) * Math.cos(φ2) *
          Math.sin(Δλ/2) * Math.sin(Δλ/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  return R * c; // Distância em metros
} 