import React from 'react';
import { Dialog, DialogTitle, List, ListItem, ListItemText } from '@mui/material';

export default function SelecionarGrupoModal({ open, grupos, onSelect }) {
  return (
    <Dialog open={open}>
      <DialogTitle>Selecione o grupo que deseja acessar</DialogTitle>
      <List>
        {grupos.map((grupo) => (
          <ListItem button key={grupo.id} onClick={() => onSelect(grupo)}>
            <ListItemText
              primary={grupo.name}
              secondary={`Papel: ${grupo.role}`}
            />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
} 