import { renderHook } from '@testing-library/react';
import { usePermission } from '../../hooks/usePermission';
import { useAuth } from '../../hooks/useAuth';

// Mock do useAuth
jest.mock('../../hooks/useAuth', () => ({
  useAuth: jest.fn()
}));

describe('usePermission', () => {
  const mockUser = {
    id: 1,
    nome: 'João Silva',
    email: 'joao@email.com',
    perfil: 'admin',
    permissoes: [
      'usuarios.visualizar',
      'usuarios.criar',
      'usuarios.editar',
      'usuarios.excluir'
    ]
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve retornar false quando usuário não está autenticado', () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: null,
      isAuthenticated: false
    });

    const { result } = renderHook(() => usePermission());

    expect(result.current.hasPermission('usuarios.visualizar')).toBeFalsy();
  });

  it('deve retornar true para permissão que usuário possui', () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: mockUser,
      isAuthenticated: true
    });

    const { result } = renderHook(() => usePermission());

    expect(result.current.hasPermission('usuarios.visualizar')).toBeTruthy();
  });

  it('deve retornar false para permissão que usuário não possui', () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: mockUser,
      isAuthenticated: true
    });

    const { result } = renderHook(() => usePermission());

    expect(result.current.hasPermission('relatorios.gerar')).toBeFalsy();
  });

  it('deve retornar true para múltiplas permissões que usuário possui', () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: mockUser,
      isAuthenticated: true
    });

    const { result } = renderHook(() => usePermission());

    expect(result.current.hasAnyPermission([
      'usuarios.visualizar',
      'relatorios.gerar'
    ])).toBeTruthy();
  });

  it('deve retornar false para múltiplas permissões que usuário não possui', () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: mockUser,
      isAuthenticated: true
    });

    const { result } = renderHook(() => usePermission());

    expect(result.current.hasAnyPermission([
      'relatorios.gerar',
      'configuracoes.alterar'
    ])).toBeFalsy();
  });

  it('deve retornar true quando usuário possui todas as permissões', () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: mockUser,
      isAuthenticated: true
    });

    const { result } = renderHook(() => usePermission());

    expect(result.current.hasAllPermissions([
      'usuarios.visualizar',
      'usuarios.criar'
    ])).toBeTruthy();
  });

  it('deve retornar false quando usuário não possui todas as permissões', () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: mockUser,
      isAuthenticated: true
    });

    const { result } = renderHook(() => usePermission());

    expect(result.current.hasAllPermissions([
      'usuarios.visualizar',
      'relatorios.gerar'
    ])).toBeFalsy();
  });

  it('deve retornar true para perfil admin independente das permissões', () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: {
        ...mockUser,
        perfil: 'admin'
      },
      isAuthenticated: true
    });

    const { result } = renderHook(() => usePermission());

    expect(result.current.hasPermission('qualquer.permissao')).toBeTruthy();
    expect(result.current.hasAnyPermission(['qualquer.permissao'])).toBeTruthy();
    expect(result.current.hasAllPermissions(['qualquer.permissao'])).toBeTruthy();
  });

  it('deve retornar true para perfil superadmin independente das permissões', () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: {
        ...mockUser,
        perfil: 'superadmin'
      },
      isAuthenticated: true
    });

    const { result } = renderHook(() => usePermission());

    expect(result.current.hasPermission('qualquer.permissao')).toBeTruthy();
    expect(result.current.hasAnyPermission(['qualquer.permissao'])).toBeTruthy();
    expect(result.current.hasAllPermissions(['qualquer.permissao'])).toBeTruthy();
  });

  it('deve retornar false para perfil comum sem permissões', () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: {
        ...mockUser,
        perfil: 'usuario',
        permissoes: []
      },
      isAuthenticated: true
    });

    const { result } = renderHook(() => usePermission());

    expect(result.current.hasPermission('qualquer.permissao')).toBeFalsy();
    expect(result.current.hasAnyPermission(['qualquer.permissao'])).toBeFalsy();
    expect(result.current.hasAllPermissions(['qualquer.permissao'])).toBeFalsy();
  });

  it('deve lidar com permissões com wildcard', () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: {
        ...mockUser,
        permissoes: ['usuarios.*']
      },
      isAuthenticated: true
    });

    const { result } = renderHook(() => usePermission());

    expect(result.current.hasPermission('usuarios.visualizar')).toBeTruthy();
    expect(result.current.hasPermission('usuarios.criar')).toBeTruthy();
    expect(result.current.hasPermission('usuarios.editar')).toBeTruthy();
    expect(result.current.hasPermission('usuarios.excluir')).toBeTruthy();
    expect(result.current.hasPermission('relatorios.gerar')).toBeFalsy();
  });

  it('deve lidar com permissões aninhadas', () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: {
        ...mockUser,
        permissoes: ['usuarios.configuracoes.alterar']
      },
      isAuthenticated: true
    });

    const { result } = renderHook(() => usePermission());

    expect(result.current.hasPermission('usuarios.configuracoes.alterar')).toBeTruthy();
    expect(result.current.hasPermission('usuarios.configuracoes.visualizar')).toBeFalsy();
  });

  it('deve lidar com permissões case sensitive', () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: {
        ...mockUser,
        permissoes: ['Usuarios.Visualizar']
      },
      isAuthenticated: true
    });

    const { result } = renderHook(() => usePermission());

    expect(result.current.hasPermission('Usuarios.Visualizar')).toBeTruthy();
    expect(result.current.hasPermission('usuarios.visualizar')).toBeFalsy();
  });

  it('deve lidar com permissões vazias ou inválidas', () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: {
        ...mockUser,
        permissoes: ['usuarios.visualizar']
      },
      isAuthenticated: true
    });

    const { result } = renderHook(() => usePermission());

    expect(result.current.hasPermission('')).toBeFalsy();
    expect(result.current.hasPermission(null as any)).toBeFalsy();
    expect(result.current.hasPermission(undefined as any)).toBeFalsy();
  });

  it('deve lidar com array de permissões vazio ou inválido', () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: {
        ...mockUser,
        permissoes: ['usuarios.visualizar']
      },
      isAuthenticated: true
    });

    const { result } = renderHook(() => usePermission());

    expect(result.current.hasAnyPermission([])).toBeFalsy();
    expect(result.current.hasAnyPermission(null as any)).toBeFalsy();
    expect(result.current.hasAnyPermission(undefined as any)).toBeFalsy();

    expect(result.current.hasAllPermissions([])).toBeFalsy();
    expect(result.current.hasAllPermissions(null as any)).toBeFalsy();
    expect(result.current.hasAllPermissions(undefined as any)).toBeFalsy();
  });
}); 