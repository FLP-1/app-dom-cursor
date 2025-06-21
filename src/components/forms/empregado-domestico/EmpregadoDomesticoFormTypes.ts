/**
 * Arquivo: EmpregadoDomesticoFormTypes.ts
 * Caminho: src/components/forms/empregado-domestico/EmpregadoDomesticoFormTypes.ts
 * Criado em: 2025-06-06
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

import { CboCargo } from '@/types/empregado-domestico';
import { DependenteEmpregado } from '@/types/empregado-domestico';
import { EmpregadoDomesticoFormValues } from '@/hooks/forms/useEmpregadoDomesticoForm';

export interface EmpregadoDomesticoFormProps {
  initialValues?: Partial<EmpregadoDomesticoFormValues>;
  cargos: CboCargo[];
  onSubmitSuccess?: () => void;
  empregadores: { id: string; nomeCompleto: string }[];
} 
