import React, { useState } from 'react';
import { Box, Grid, Typography, Button, Modal, Checkbox, FormControlLabel, useTheme } from '@mui/material';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { usePlanosVigentes } from '@/hooks/usePlanosVigentes';
import { UserRole } from '@/lib/permissions/types';
import axios from 'axios';

// Mensagens centralizadas (exemplo simplificado)
const messages = {
  confirmTitle: 'Confirmação de Assinatura',
  confirmText: 'Para prosseguir, é necessário aceitar a Política de Cancelamento e Reembolso.',
  acceptLabel: 'Li e aceito a ',
  policyLink: 'Política de Cancelamento e Reembolso',
  confirmButton: 'Confirmar e Prosseguir para Pagamento',
  cancelButton: 'Cancelar',
  loading: 'Carregando planos...'
};

const PlanoCard = ({ plano, onSelect }: any) => {
  const theme = useTheme();
  return (
    <Box sx={{ border: `1px solid ${theme.palette.divider}`, borderRadius: 2, p: 3, mb: 2, bgcolor: 'background.paper' }}>
      <Typography variant="h6" color="primary">{plano.nome}</Typography>
      <Typography variant="body2" sx={{ mb: 1 }}>{plano.mensagem}</Typography>
      <ul>
        {plano.beneficios.map((b: string, i: number) => <li key={i}><Typography variant="body2">{b}</Typography></li>)}
      </ul>
      <Typography variant="subtitle2">R$ {Number(plano.valorMensal).toFixed(2)} / R$ {Number(plano.valorAnual).toFixed(2)}</Typography>
      <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={() => onSelect(plano)}>
        Assinar
      </Button>
    </Box>
  );
};

const ModalConfirmacaoPlano = ({ open, plano, onClose, onConfirm }: any) => {
  const [aceite, setAceite] = useState(false);
  return (
    <Modal open={open} onClose={onClose} aria-labelledby="modal-title" aria-describedby="modal-desc">
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', p: 4, borderRadius: 2, boxShadow: 24, minWidth: 320 }}>
        <Typography id="modal-title" variant="h6" sx={{ mb: 2 }}>{messages.confirmTitle}</Typography>
        {plano && (
          <>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>{plano.nome}</Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>{plano.mensagem}</Typography>
            <ul>
              {plano.beneficios.map((b: string, i: number) => <li key={i}><Typography variant="body2">{b}</Typography></li>)}
            </ul>
            <Typography variant="subtitle2" sx={{ mb: 2 }}>R$ {Number(plano.valorMensal).toFixed(2)} / R$ {Number(plano.valorAnual).toFixed(2)}</Typography>
          </>
        )}
        <FormControlLabel
          control={<Checkbox checked={aceite} onChange={e => setAceite(e.target.checked)} />}
          label={<span>{messages.acceptLabel}<Link href="/cancelamento-reembolso" target="_blank" style={{ color: '#1976d2', textDecoration: 'underline' }}>{messages.policyLink}</Link></span>}
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
          <Button onClick={onClose}>{messages.cancelButton}</Button>
          <Button variant="contained" color="primary" disabled={!aceite} onClick={onConfirm}>{messages.confirmButton}</Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default function PlanosAssinaturaPage() {
  const { user, loading } = useAuth();
  let perfil: 'EMPREGADOR' | 'PARCEIRO' | 'AMBOS' = 'AMBOS';
  if (user?.role === UserRole.EMPLOYER) perfil = 'EMPREGADOR';
  else if (user?.role === UserRole.PARTNER) perfil = 'PARCEIRO';

  const { planos, isLoading } = usePlanosVigentes(perfil);
  const [planoSelecionado, setPlanoSelecionado] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleSelectPlano = (plano: any) => {
    setPlanoSelecionado(plano);
    setModalOpen(true);
  };

  const handleConfirm = async () => {
    setModalOpen(false);
    try {
      const res = await axios.post('/api/assinatura', {
        planoId: planoSelecionado.id,
        usuarioId: user.id,
      });
      // Futuro: redirecionar para Stripe com res.data.checkoutUrl
      alert('Plano registrado! ID: ' + res.data.planoUsuarioId);
    } catch (err) {
      alert('Erro ao registrar plano. Tente novamente.');
    }
  };

  if (loading) return <Typography>{messages.loading}</Typography>;

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4, p: 2 }}>
      <Typography variant="h4" color="primary" sx={{ mb: 4 }}>Escolha seu plano de assinatura</Typography>
      {isLoading ? (
        <Typography>{messages.loading}</Typography>
      ) : (
        <Grid container spacing={2}>
          {planos.map((plano) => (
            <Grid item xs={12} md={6} key={plano.id}>
              <PlanoCard plano={plano} onSelect={handleSelectPlano} />
            </Grid>
          ))}
        </Grid>
      )}
      <ModalConfirmacaoPlano
        open={modalOpen}
        plano={planoSelecionado}
        onClose={() => setModalOpen(false)}
        onConfirm={handleConfirm}
      />
    </Box>
  );
} 