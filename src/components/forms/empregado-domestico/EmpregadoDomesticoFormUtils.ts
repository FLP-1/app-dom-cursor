/**
 * Arquivo: EmpregadoDomesticoFormUtils.ts
 * Caminho: src/components/forms/empregado-domestico/EmpregadoDomesticoFormUtils.ts
 * Criado em: 2025-06-06
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

import { IMaskInput } from 'react-imask';
import React from 'react';

export const CPFMask = React.forwardRef<HTMLInputElement>((props, ref) => (
  <IMaskInput
    {...props}
    mask="000.000.000-00"
    inputRef={ref}
  />
));
CPFMask.displayName = 'CPFMask';

export const CEPMask = React.forwardRef<HTMLInputElement>((props, ref) => (
  <IMaskInput
    {...props}
    mask="00000-000"
    inputRef={ref}
  />
));
CEPMask.displayName = 'CEPMask';

export const TelefoneMask = React.forwardRef<HTMLInputElement>((props, ref) => (
  <IMaskInput
    {...props}
    mask="(00) 00000-0000"
    inputRef={ref}
  />
));
TelefoneMask.displayName = 'TelefoneMask';

export const PISMask = React.forwardRef<HTMLInputElement>((props, ref) => (
  <IMaskInput
    {...props}
    mask="000.00000.00-0"
    inputRef={ref}
  />
));
PISMask.displayName = 'PISMask'; 
