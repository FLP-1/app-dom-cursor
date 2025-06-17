/**
 * Arquivo: PreviewESocial.tsx
 * Caminho: src/components/empregador/PreviewESocial.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

import { Box, Paper, Typography, Divider } from '@mui/material';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

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
            <strong>Tipo de Inscrição:</strong> CPF
          </Typography>
          <Typography>
            <strong>Número de Inscrição:</strong> {preview.ideEmpregador.nrInsc}
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
            <strong>CPF:</strong> {preview.dadosEmpregador.cpf}
          </Typography>
          <Typography>
            <strong>Nome:</strong> {preview.dadosEmpregador.nome}
          </Typography>
          <Typography>
            <strong>Data de Nascimento:</strong>{' '}
            {format(new Date(preview.dadosEmpregador.dataNascimento), 'dd/MM/yyyy', {
              locale: ptBR,
            })}
          </Typography>
          <Typography>
            <strong>Sexo:</strong> {preview.dadosEmpregador.sexo === 'M' ? 'Masculino' : 'Feminino'}
          </Typography>
          <Typography>
            <strong>Tipo de Empregador:</strong>{' '}
            {preview.dadosEmpregador.tipoEmpregador === '1'
              ? 'Empregador Doméstico'
              : 'Segurado Especial'}
          </Typography>
          {preview.dadosEmpregador.caepf && (
            <Typography>
              <strong>CAEPF:</strong> {preview.dadosEmpregador.caepf}
            </Typography>
          )}
          {preview.dadosEmpregador.telefone && (
            <Typography>
              <strong>Telefone:</strong> {preview.dadosEmpregador.telefone}
            </Typography>
          )}
          {preview.dadosEmpregador.email && (
            <Typography>
              <strong>Email:</strong> {preview.dadosEmpregador.email}
            </Typography>
          )}
        </Box>
      </Box>
    </Paper>
  );
} 
