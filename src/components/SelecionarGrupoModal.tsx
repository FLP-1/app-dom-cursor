/**
 * Arquivo: SelecionarGrupoModal.tsx
 * Caminho: src/components/SelecionarGrupoModal.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-01-27
 * Descrição: Modal para seleção de grupo de acesso
 */

import React from 'react';
import { Dialog, DialogTitle, List, ListItemButton, ListItemText } from '@mui/material';
import { useMessages } from '@/hooks/useMessages';
import { commonMessages } from '@/i18n/messages';

interface Grupo {
  id: string;
  name: string;
  role: string;
}

interface SelecionarGrupoModalProps {
  open: boolean;
  grupos: Grupo[];
  onSelect: (grupo: Grupo) => void;
}

export default function SelecionarGrupoModal({ open, grupos, onSelect }: SelecionarGrupoModalProps) {
  const { messages } = useMessages(commonMessages);
  
  return (
    <Dialog open={open}>
      <DialogTitle>{messages.grupo.selectTitle}</DialogTitle>
      <List>
        {grupos.map((grupo) => (
          <ListItemButton key={grupo.id} onClick={() => onSelect(grupo)}>
            <ListItemText
              primary={grupo.name}
              secondary={`${messages.grupo.role}: ${grupo.role}`}
            />
          </ListItemButton>
        ))}
      </List>
    </Dialog>
  );
} 
