/**
 * Arquivo: useForm.ts
 * Caminho: src/hooks/useForm.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

import { useCallback } from 'react';

interface UseFormOptions<T> {
  defaultValues?: T;
  resolver?: unknown;
}

export const useForm = <T extends Record<string, unknown>>(options: UseFormOptions<T> = {}) => {
  const { defaultValues = {} as T } = options;

  const register = useCallback((name: keyof T) => ({
    name,
    onChange: jest.fn(),
    onBlur: jest.fn(),
    ref: jest.fn(),
  }), []);

  const handleSubmit = useCallback((onSubmit: (data: T) => void) => (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(defaultValues);
  }, [defaultValues]);

  const setValue = useCallback((name: keyof T, value: unknown) => {
    defaultValues[name] = value;
  }, [defaultValues]);

  const getValues = useCallback(() => defaultValues, [defaultValues]);

  const reset = useCallback((values?: T) => {
    Object.assign(defaultValues, values || {});
  }, [defaultValues]);

  const formState = {
    errors: {},
    isSubmitting: false,
    isDirty: false,
    isSubmitted: false,
    submitCount: 0,
  };

  return {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState,
    control: {
      _formValues: defaultValues,
      _formState: formState,
    },
  };
}; 
