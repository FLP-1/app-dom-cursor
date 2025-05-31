import { renderHook } from '@testing-library/react';
import { usePrevious } from '../../hooks/usePrevious';

describe('usePrevious', () => {
  it('deve retornar undefined na primeira renderização', () => {
    const { result } = renderHook(() => usePrevious(1));

    expect(result.current).toBeUndefined();
  });

  it('deve retornar o valor anterior após a primeira renderização', () => {
    const { result, rerender } = renderHook(
      ({ value }) => usePrevious(value),
      {
        initialProps: { value: 1 }
      }
    );

    expect(result.current).toBeUndefined();

    rerender({ value: 2 });

    expect(result.current).toBe(1);
  });

  it('deve lidar com valores numéricos', () => {
    const { result, rerender } = renderHook(
      ({ value }) => usePrevious(value),
      {
        initialProps: { value: 1 }
      }
    );

    rerender({ value: 2 });
    expect(result.current).toBe(1);

    rerender({ value: 3 });
    expect(result.current).toBe(2);

    rerender({ value: 4 });
    expect(result.current).toBe(3);
  });

  it('deve lidar com valores booleanos', () => {
    const { result, rerender } = renderHook(
      ({ value }) => usePrevious(value),
      {
        initialProps: { value: true }
      }
    );

    rerender({ value: false });
    expect(result.current).toBe(true);

    rerender({ value: true });
    expect(result.current).toBe(false);
  });

  it('deve lidar com strings', () => {
    const { result, rerender } = renderHook(
      ({ value }) => usePrevious(value),
      {
        initialProps: { value: 'hello' }
      }
    );

    rerender({ value: 'world' });
    expect(result.current).toBe('hello');

    rerender({ value: '!' });
    expect(result.current).toBe('world');
  });

  it('deve lidar com objetos', () => {
    const { result, rerender } = renderHook(
      ({ value }) => usePrevious(value),
      {
        initialProps: { value: { name: 'John' } }
      }
    );

    rerender({ value: { name: 'Jane' } });
    expect(result.current).toEqual({ name: 'John' });

    rerender({ value: { name: 'Bob' } });
    expect(result.current).toEqual({ name: 'Jane' });
  });

  it('deve lidar com arrays', () => {
    const { result, rerender } = renderHook(
      ({ value }) => usePrevious(value),
      {
        initialProps: { value: [1, 2, 3] }
      }
    );

    rerender({ value: [4, 5, 6] });
    expect(result.current).toEqual([1, 2, 3]);

    rerender({ value: [7, 8, 9] });
    expect(result.current).toEqual([4, 5, 6]);
  });

  it('deve lidar com null', () => {
    const { result, rerender } = renderHook(
      ({ value }) => usePrevious(value),
      {
        initialProps: { value: null }
      }
    );

    rerender({ value: 1 });
    expect(result.current).toBe(null);

    rerender({ value: null });
    expect(result.current).toBe(1);
  });

  it('deve lidar com undefined', () => {
    const { result, rerender } = renderHook(
      ({ value }) => usePrevious(value),
      {
        initialProps: { value: undefined }
      }
    );

    rerender({ value: 1 });
    expect(result.current).toBeUndefined();

    rerender({ value: undefined });
    expect(result.current).toBe(1);
  });

  it('deve lidar com funções', () => {
    const fn1 = () => 1;
    const fn2 = () => 2;
    const fn3 = () => 3;

    const { result, rerender } = renderHook(
      ({ value }) => usePrevious(value),
      {
        initialProps: { value: fn1 }
      }
    );

    rerender({ value: fn2 });
    expect(result.current).toBe(fn1);

    rerender({ value: fn3 });
    expect(result.current).toBe(fn2);
  });

  it('deve lidar com valores complexos', () => {
    const complex1 = {
      name: 'John',
      age: 30,
      address: {
        street: '123 Main St',
        city: 'New York'
      },
      hobbies: ['reading', 'gaming']
    };

    const complex2 = {
      name: 'Jane',
      age: 25,
      address: {
        street: '456 Oak St',
        city: 'Los Angeles'
      },
      hobbies: ['painting', 'dancing']
    };

    const { result, rerender } = renderHook(
      ({ value }) => usePrevious(value),
      {
        initialProps: { value: complex1 }
      }
    );

    rerender({ value: complex2 });
    expect(result.current).toEqual(complex1);
  });

  it('deve lidar com valores primitivos misturados', () => {
    const { result, rerender } = renderHook(
      ({ value }) => usePrevious(value),
      {
        initialProps: { value: 1 }
      }
    );

    rerender({ value: 'hello' });
    expect(result.current).toBe(1);

    rerender({ value: true });
    expect(result.current).toBe('hello');

    rerender({ value: null });
    expect(result.current).toBe(true);

    rerender({ value: undefined });
    expect(result.current).toBe(null);
  });

  it('deve lidar com valores de referência', () => {
    const obj1 = { id: 1 };
    const obj2 = { id: 2 };
    const obj3 = { id: 3 };

    const { result, rerender } = renderHook(
      ({ value }) => usePrevious(value),
      {
        initialProps: { value: obj1 }
      }
    );

    rerender({ value: obj2 });
    expect(result.current).toBe(obj1);

    rerender({ value: obj3 });
    expect(result.current).toBe(obj2);
  });

  it('deve lidar com valores de data', () => {
    const date1 = new Date('2023-01-01');
    const date2 = new Date('2023-02-01');
    const date3 = new Date('2023-03-01');

    const { result, rerender } = renderHook(
      ({ value }) => usePrevious(value),
      {
        initialProps: { value: date1 }
      }
    );

    rerender({ value: date2 });
    expect(result.current).toBe(date1);

    rerender({ value: date3 });
    expect(result.current).toBe(date2);
  });

  it('deve lidar com valores de regex', () => {
    const regex1 = /hello/;
    const regex2 = /world/;
    const regex3 = /!/;

    const { result, rerender } = renderHook(
      ({ value }) => usePrevious(value),
      {
        initialProps: { value: regex1 }
      }
    );

    rerender({ value: regex2 });
    expect(result.current).toBe(regex1);

    rerender({ value: regex3 });
    expect(result.current).toBe(regex2);
  });

  it('deve lidar com valores de símbolo', () => {
    const symbol1 = Symbol('hello');
    const symbol2 = Symbol('world');
    const symbol3 = Symbol('!');

    const { result, rerender } = renderHook(
      ({ value }) => usePrevious(value),
      {
        initialProps: { value: symbol1 }
      }
    );

    rerender({ value: symbol2 });
    expect(result.current).toBe(symbol1);

    rerender({ value: symbol3 });
    expect(result.current).toBe(symbol2);
  });
}); 