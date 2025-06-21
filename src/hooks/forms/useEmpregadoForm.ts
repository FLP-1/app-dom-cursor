/**
 * Arquivo: useEmpregadoForm.ts
 * Caminho: src/hooks/forms/useEmpregadoForm.ts
 * Criado em: 2025-06-07
 * Última atualização: 2025-06-07
 * Descrição: Hook customizado para lógica do formulário de empregado, alternando entre modo simplificado e complementar.
 */
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { empregadoSchemaSimplificado, empregadoSchemaCompleto } from '@/components/forms/empregado/EmpregadoFormSchema';

export function useEmpregadoForm({ complementar }: { complementar: boolean }) {
  const schema = complementar ? empregadoSchemaCompleto : empregadoSchemaSimplificado;
  const methods = useForm({ resolver: zodResolver(schema) });
  return methods;
} 
