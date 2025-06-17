/**
 * Arquivo: useFieldArray.ts
 * Caminho: src/hooks/useFieldArray.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

import { useCallback } from 'react';

interface UseFieldArrayOptions<T = unknown> {
  control: {
    _formValues: Record<string, T[]>;
  };
  name: string;
}

export function useFieldArray<T = unknown>({ control, name }: UseFieldArrayOptions<T>) {
  const fields: T[] = control._formValues[name] || [];

  const append = useCallback((value: T) => {
    if (!control._formValues[name]) {
      control._formValues[name] = [];
    }
    control._formValues[name].push(value);
  }, [control, name]);

  const remove = useCallback((index: number) => {
    if (control._formValues[name]) {
      control._formValues[name].splice(index, 1);
    }
  }, [control, name]);

  const update = useCallback((index: number, value: T) => {
    if (control._formValues[name]) {
      control._formValues[name][index] = value;
    }
  }, [control, name]);

  return {
    fields,
    append,
    remove,
    update,
  };
} 
