/**
 * Arquivo: PreviewESocial.tsx
 * Caminho: src/components/empregador/PreviewESocial.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-01-27
 * Descrição: Componente de preview do eSocial com mensagens centralizadas
 */

import { Box, Paper, Typography, Divider } from '@mui/material';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { interfaceMessages } from '@/i18n/messages/interface.messages';
import { useLanguage } from '@/hooks/useLanguage';

interface PreviewESocialProps {
  preview: {
    ideEmpregador: {
      tpInsc: number;
      nrInsc: string;
      tpInscEstab: number;
      nrInscEstab: string;
    };
    dadosEmpregador: {
      cpf: string;
      nome: string;
      dataNascimento: string;
      sexo: 'M' | 'F';
      tipoEmpregador: '1' | '22';
      caepf?: string;
      telefone?: string;
      email?: string;
    };
  };
}

export function PreviewESocial({ preview }: PreviewESocialProps) {
  const { language } = useLanguage();
  const messages = interfaceMessages[language].preview;

  return (
    <Paper sx={{ p: 3, mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        Preview do Evento S-1000 - Informações do Empregador/Contribuinte/Órgão Público
      </Typography>

      <Box sx={{ mt: 2 }}>
        <Typography variant="subtitle1" gutterBottom>
          Identificação do Empregador
        </Typography>
        <Box sx={{ pl: 2 }}>
          <Typography>
            <strong>{messages.inscriptionType}</strong> CPF
          </Typography>
          <Typography>
            <strong>{messages.inscriptionNumber}</strong> {preview.ideEmpregador.nrInsc}
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box>
        <Typography variant="subtitle1" gutterBottom>
          Dados do Empregador
        </Typography>
        <Box sx={{ pl: 2 }}>
          <Typography>
            <strong>{messages.cpf}:</strong> {preview.dadosEmpregador.cpf}
          </Typography>
          <Typography>
            <strong>{messages.name}:</strong> {preview.dadosEmpregador.nome}
          </Typography>
          <Typography>
            <strong>{messages.birthDate}:</strong>{' '}
            {format(new Date(preview.dadosEmpregador.dataNascimento), 'dd/MM/yyyy', {
              locale: ptBR,
            })}
          </Typography>
          <Typography>
            <strong>{messages.sex}:</strong> {preview.dadosEmpregador.sexo === 'M' ? interfaceMessages[language].common.masculine : interfaceMessages[language].common.feminine}
          </Typography>
          <Typography>
            <strong>{messages.employerType}:</strong>{' '}
            {preview.dadosEmpregador.tipoEmpregador === '1'
              ? 'Empregador Doméstico'
              : 'Segurado Especial'}
          </Typography>
          {preview.dadosEmpregador.caepf && (
            <Typography>
              <strong>{messages.caepf}:</strong> {preview.dadosEmpregador.caepf}
            </Typography>
          )}
          {preview.dadosEmpregador.telefone && (
            <Typography>
              <strong>{messages.phone}:</strong> {preview.dadosEmpregador.telefone}
            </Typography>
          )}
          {preview.dadosEmpregador.email && (
            <Typography>
              <strong>{messages.email}:</strong> {preview.dadosEmpregador.email}
            </Typography>
          )}
        </Box>
      </Box>
    </Paper>
  );
} 
