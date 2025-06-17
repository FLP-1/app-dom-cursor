/**
 * Arquivo: SelecionarGrupoModal.tsx
 * Caminho: src/components/SelecionarGrupoModal.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

import React from 'react';
import { Dialog, DialogTitle, List, ListItemButton, ListItemText } from '@mui/material';

export default function SelecionarGrupoModal({ open, grupos, onSelect }) {
  return (
    <Dialog open={open}>
      <DialogTitle>Selecione o grupo que deseja acessar</DialogTitle>
      <List>
        {grupos.map((grupo) => (
          <ListItemButton key={grupo.id} onClick={() => onSelect(grupo)}>
            <ListItemText
              primary={grupo.name}
              secondary={`Papel: ${grupo.role}`}
            />
          </ListItemButton>
        ))}
      </List>
    </Dialog>
  );
} 
