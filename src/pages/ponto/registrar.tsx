/**
 * Arquivo: registrar.tsx
 * Caminho: src/pages/ponto/registrar.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: 
 */

import React from 'react';
import { Box, Button, Card, CardContent, Typography, CircularProgress } from '@mui/material';
import { usePonto } from '@/hooks/usePonto';
import { useRouter } from 'next/router';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function RegistrarPonto() {
  const { registrarPonto, loading, ultimoRegistro } = usePonto();
  const router = useRouter();

  const handleRegistrar = async (tipo: 'ENTRADA' | 'SAIDA') => {
    await registrarPonto(tipo);
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Registro de Ponto
      </Typography>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Horário Atual
          </Typography>
          <Typography variant="h4" align="center" sx={{ mb: 2 }}>
            {format(new Date(), 'HH:mm:ss', { locale: ptBR })}
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center">
            {format(new Date(), "EEEE, d 'de' MMMM 'de' yyyy", { locale: ptBR })}
          </Typography>
        </CardContent>
      </Card>

      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          onClick={() => handleRegistrar('ENTRADA')}
          disabled={loading}
          sx={{ height: 100 }}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            <>
              <Typography variant="h6">Entrada</Typography>
              <Typography variant="body2">Registrar entrada</Typography>
            </>
          )}
        </Button>

        <Button
          variant="contained"
          color="secondary"
          size="large"
          fullWidth
          onClick={() => handleRegistrar('SAIDA')}
          disabled={loading}
          sx={{ height: 100 }}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            <>
              <Typography variant="h6">Saída</Typography>
              <Typography variant="body2">Registrar saída</Typography>
            </>
          )}
        </Button>
      </Box>

      {ultimoRegistro && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Último Registro
            </Typography>
            <Typography>
              Tipo: {ultimoRegistro.tipo === 'ENTRADA' ? 'Entrada' : 'Saída'}
            </Typography>
            <Typography>
              Horário: {format(new Date(ultimoRegistro.dataHora), 'HH:mm:ss', { locale: ptBR })}
            </Typography>
            <Typography>
              Data: {format(new Date(ultimoRegistro.dataHora), "dd/MM/yyyy", { locale: ptBR })}
            </Typography>
            <Typography>
              Status: {ultimoRegistro.validado ? 'Validado' : 'Pendente'}
            </Typography>
          </CardContent>
        </Card>
      )}
    </Box>
  );
} 
