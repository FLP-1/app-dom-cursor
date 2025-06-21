/**
 * Arquivo: useEmpregadorForm.ts
 * Caminho: src/hooks/forms/useEmpregadorForm.ts
 * Criado em: 2025-06-07
 * Última atualização: 2025-06-07
 * Descrição: Hook customizado para lógica do formulário de empregador, alternando entre modo simplificado e complementar.
 */
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { empregadorSchemaSimplificado, empregadorSchemaCompleto } from '@/components/forms/empregador/EmpregadorFormSchema';

export function useEmpregadorForm({ complementar }: { complementar: boolean }) {
  const schema = complementar ? empregadorSchemaCompleto : empregadorSchemaSimplificado;
  const methods = useForm({ resolver: zodResolver(schema) });
  return methods;
} 
