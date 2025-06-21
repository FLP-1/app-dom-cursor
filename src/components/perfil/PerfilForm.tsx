/**
 * Arquivo: PerfilForm.tsx
 * Caminho: src/components/perfil/PerfilForm.tsx
 * Criado em: 2025-06-02
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

import React from 'react';
import { Box } from '@mui/material';
import { Control } from 'react-hook-form';

// Justificativa: integração com react-hook-form, tipagem dinâmica dos campos
interface PerfilFormProps {
  control: Control<unknown>;
}

const PerfilForm: React.FC<PerfilFormProps> = ({ control }) => {
  return (
    <Box>
      {/* TODO: Implementar campos do formulário de perfil */}
    </Box>
  );
};

export default PerfilForm; 
