import { renderHook, act } from '@testing-library/react';
import { useForm } from '../../hooks/useForm';
import { z } from 'zod';

describe('useForm', () => {
  const schema = z.object({
    name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
    email: z.string().email('Email inválido'),
    age: z.number().min(18, 'Idade deve ser maior que 18'),
    password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
    confirmPassword: z.string()
  }).refine((data) => data.password === data.confirmPassword, {
    message: 'Senhas não conferem',
    path: ['confirmPassword']
  });

  const initialValues = {
    name: '',
    email: '',
    age: 0,
    password: '',
    confirmPassword: ''
  };

  it('deve inicializar com valores padrão', () => {
    const { result } = renderHook(() => useForm({
      schema,
      initialValues
    }));

    expect(result.current.values).toEqual(initialValues);
    expect(result.current.errors).toEqual({});
    expect(result.current.touched).toEqual({});
    expect(result.current.isValid).toBeFalsy();
    expect(result.current.isDirty).toBeFalsy();
  });

  it('deve atualizar valor de campo', () => {
    const { result } = renderHook(() => useForm({
      schema,
      initialValues
    }));

    act(() => {
      result.current.setFieldValue('name', 'João');
    });

    expect(result.current.values.name).toBe('João');
    expect(result.current.isDirty).toBeTruthy();
  });

  it('deve validar campo ao alterar valor', () => {
    const { result } = renderHook(() => useForm({
      schema,
      initialValues
    }));

    act(() => {
      result.current.setFieldValue('email', 'email-invalido');
    });

    expect(result.current.errors.email).toBe('Email inválido');
    expect(result.current.isValid).toBeFalsy();
  });

  it('deve validar campo ao perder foco', () => {
    const { result } = renderHook(() => useForm({
      schema,
      initialValues
    }));

    act(() => {
      result.current.setFieldTouched('name');
    });

    expect(result.current.touched.name).toBeTruthy();
    expect(result.current.errors.name).toBe('Nome deve ter no mínimo 3 caracteres');
  });

  it('deve validar todo o formulário', () => {
    const { result } = renderHook(() => useForm({
      schema,
      initialValues
    }));

    act(() => {
      result.current.validateForm();
    });

    expect(result.current.errors).toEqual({
      name: 'Nome deve ter no mínimo 3 caracteres',
      email: 'Email inválido',
      age: 'Idade deve ser maior que 18',
      password: 'Senha deve ter no mínimo 6 caracteres',
      confirmPassword: 'Senhas não conferem'
    });
    expect(result.current.isValid).toBeFalsy();
  });

  it('deve limpar erros ao corrigir valores', () => {
    const { result } = renderHook(() => useForm({
      schema,
      initialValues
    }));

    act(() => {
      result.current.setFieldValue('email', 'email-invalido');
    });

    expect(result.current.errors.email).toBe('Email inválido');

    act(() => {
      result.current.setFieldValue('email', 'email@valido.com');
    });

    expect(result.current.errors.email).toBeUndefined();
  });

  it('deve resetar formulário', () => {
    const { result } = renderHook(() => useForm({
      schema,
      initialValues
    }));

    act(() => {
      result.current.setFieldValue('name', 'João');
      result.current.setFieldValue('email', 'email@valido.com');
    });

    expect(result.current.isDirty).toBeTruthy();

    act(() => {
      result.current.resetForm();
    });

    expect(result.current.values).toEqual(initialValues);
    expect(result.current.errors).toEqual({});
    expect(result.current.touched).toEqual({});
    expect(result.current.isDirty).toBeFalsy();
  });

  it('deve validar senhas iguais', () => {
    const { result } = renderHook(() => useForm({
      schema,
      initialValues
    }));

    act(() => {
      result.current.setFieldValue('password', '123456');
      result.current.setFieldValue('confirmPassword', '123456');
    });

    expect(result.current.errors.confirmPassword).toBeUndefined();
    expect(result.current.isValid).toBeFalsy(); // Ainda inválido por outros campos

    act(() => {
      result.current.setFieldValue('confirmPassword', '654321');
    });

    expect(result.current.errors.confirmPassword).toBe('Senhas não conferem');
  });

  it('deve lidar com valores iniciais personalizados', () => {
    const customInitialValues = {
      name: 'João',
      email: 'joao@email.com',
      age: 25,
      password: '123456',
      confirmPassword: '123456'
    };

    const { result } = renderHook(() => useForm({
      schema,
      initialValues: customInitialValues
    }));

    expect(result.current.values).toEqual(customInitialValues);
    expect(result.current.isValid).toBeTruthy();
  });

  it('deve validar formulário completo', () => {
    const { result } = renderHook(() => useForm({
      schema,
      initialValues
    }));

    act(() => {
      result.current.setFieldValue('name', 'João Silva');
      result.current.setFieldValue('email', 'joao@email.com');
      result.current.setFieldValue('age', 25);
      result.current.setFieldValue('password', '123456');
      result.current.setFieldValue('confirmPassword', '123456');
    });

    expect(result.current.isValid).toBeTruthy();
    expect(result.current.errors).toEqual({});
  });

  it('deve manter estado entre re-renderizações', () => {
    const { result, rerender } = renderHook(() => useForm({
      schema,
      initialValues
    }));

    act(() => {
      result.current.setFieldValue('name', 'João');
    });

    rerender();

    expect(result.current.values.name).toBe('João');
    expect(result.current.isDirty).toBeTruthy();
  });

  it('deve lidar com validação assíncrona', async () => {
    const asyncSchema = z.object({
      email: z.string().email('Email inválido')
        .refine(async (email) => {
          // Simula verificação de email disponível
          return email !== 'usado@email.com';
        }, 'Email já está em uso')
    });

    const { result } = renderHook(() => useForm({
      schema: asyncSchema,
      initialValues: { email: '' }
    }));

    act(() => {
      result.current.setFieldValue('email', 'usado@email.com');
    });

    await act(async () => {
      await result.current.validateForm();
    });

    expect(result.current.errors.email).toBe('Email já está em uso');
  });

  it('deve inicializar com valores padrão', () => {
    const { result } = renderHook(() => useForm());

    expect(result.current.formState.isSubmitting).toBe(false);
    expect(result.current.formState.errors).toEqual({});
  });

  it('deve inicializar com valores personalizados', () => {
    const defaultValues = {
      nome: 'Teste',
      email: 'teste@exemplo.com'
    };

    const { result } = renderHook(() => useForm({
      defaultValues
    }));

    expect(result.current.formState.values).toEqual(defaultValues);
  });
}); 