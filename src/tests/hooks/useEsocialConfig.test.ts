import { renderHook, act } from '@testing-library/react';
import { useEsocialConfig } from '../../hooks/useEsocialConfig';

describe('useEsocialConfig', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('deve retornar o estado inicial corretamente', () => {
    const { result } = renderHook(() => useEsocialConfig());

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.success).toBeNull();
    expect(result.current.certificadoAtual).toEqual({
      nome: 'certificado_atual.pfx',
      validade: '2025-05-10',
    });
    expect(result.current.statusCertificado).toBe('válido');
    expect(result.current.alertasRecentes).toEqual([
      { tipo: 'expiracao_certificado', mensagem: 'Certificado expira em 30 dias', data: '2024-06-10' },
      { tipo: 'falha_envio', mensagem: 'Falha no envio do evento S-1200', data: '2024-06-09' },
    ]);
    expect(result.current.permissoes).toEqual({ podeEditar: true });
    expect(result.current.historicoAlteracoes).toEqual([
      { data: '2024-06-01 10:00', usuario: 'admin@empresa.com', acao: 'Alterou certificado digital' },
      { data: '2024-05-15 09:30', usuario: 'admin@empresa.com', acao: 'Atualizou e-mail de contato' },
    ]);
  });

  it('deve atualizar valores do formulário', () => {
    const { result } = renderHook(() => useEsocialConfig());

    act(() => {
      result.current.setValue('cnpj', '12345678901234');
      result.current.setValue('razaoSocial', 'Empresa Teste');
      result.current.setValue('endereco', 'Rua Teste, 123');
      result.current.setValue('emailContato', 'contato@empresa.com');
      result.current.setValue('ambiente', 'producao');
      result.current.setValue('urlWebservice', 'https://webservice.esocial.gov.br');
      result.current.setValue('timeout', 60);
      result.current.setValue('emailsNotificacao', ['notificacao@empresa.com']);
    });

    expect(result.current.control._formValues).toEqual({
      cnpj: '12345678901234',
      razaoSocial: 'Empresa Teste',
      endereco: 'Rua Teste, 123',
      emailContato: 'contato@empresa.com',
      ambiente: 'producao',
      certificado: null,
      urlWebservice: 'https://webservice.esocial.gov.br',
      timeout: 60,
      emailsNotificacao: ['notificacao@empresa.com'],
    });
  });

  it('deve lidar com envio do formulário com sucesso', async () => {
    const { result } = renderHook(() => useEsocialConfig());

    const formData = {
      cnpj: '12345678901234',
      razaoSocial: 'Empresa Teste',
      endereco: 'Rua Teste, 123',
      emailContato: 'contato@empresa.com',
      ambiente: 'producao' as const,
      certificado: null,
      urlWebservice: 'https://webservice.esocial.gov.br',
      timeout: 60,
      emailsNotificacao: ['notificacao@empresa.com'],
    };

    await act(async () => {
      await result.current.onSubmit(formData);
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.success).toBe('Configuração salva com sucesso!');
  });

  it('deve lidar com erro no envio do formulário', async () => {
    const { result } = renderHook(() => useEsocialConfig());

    const formData = {
      cnpj: '12345678901234',
      razaoSocial: 'Empresa Teste',
      endereco: 'Rua Teste, 123',
      emailContato: 'contato@empresa.com',
      ambiente: 'producao' as const,
      certificado: null,
      urlWebservice: 'https://webservice.esocial.gov.br',
      timeout: 60,
      emailsNotificacao: ['notificacao@empresa.com'],
    };

    // Simular erro
    jest.spyOn(global, 'setTimeout').mockImplementationOnce(() => {
      throw new Error('Erro simulado');
    });

    await act(async () => {
      await result.current.onSubmit(formData);
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe('Erro ao salvar configuração.');
    expect(result.current.success).toBeNull();
  });

  it('deve manter o estado de loading durante o envio', async () => {
    const { result } = renderHook(() => useEsocialConfig());

    const formData = {
      cnpj: '12345678901234',
      razaoSocial: 'Empresa Teste',
      endereco: 'Rua Teste, 123',
      emailContato: 'contato@empresa.com',
      ambiente: 'producao' as const,
      certificado: null,
      urlWebservice: 'https://webservice.esocial.gov.br',
      timeout: 60,
      emailsNotificacao: ['notificacao@empresa.com'],
    };

    act(() => {
      result.current.onSubmit(formData);
    });

    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeNull();
    expect(result.current.success).toBeNull();

    await act(async () => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.success).toBe('Configuração salva com sucesso!');
  });

  it('deve limpar mensagens de erro e sucesso ao iniciar novo envio', async () => {
    const { result } = renderHook(() => useEsocialConfig());

    const formData = {
      cnpj: '12345678901234',
      razaoSocial: 'Empresa Teste',
      endereco: 'Rua Teste, 123',
      emailContato: 'contato@empresa.com',
      ambiente: 'producao' as const,
      certificado: null,
      urlWebservice: 'https://webservice.esocial.gov.br',
      timeout: 60,
      emailsNotificacao: ['notificacao@empresa.com'],
    };

    // Primeiro envio com erro
    jest.spyOn(global, 'setTimeout').mockImplementationOnce(() => {
      throw new Error('Erro simulado');
    });

    await act(async () => {
      await result.current.onSubmit(formData);
    });

    expect(result.current.error).toBe('Erro ao salvar configuração.');

    // Segundo envio com sucesso
    jest.spyOn(global, 'setTimeout').mockImplementationOnce((cb) => {
      cb();
      return 0 as any;
    });

    await act(async () => {
      await result.current.onSubmit(formData);
    });

    expect(result.current.error).toBeNull();
    expect(result.current.success).toBe('Configuração salva com sucesso!');
  });

  it('deve lidar com valores undefined no formulário', () => {
    const { result } = renderHook(() => useEsocialConfig());

    act(() => {
      result.current.setValue('cnpj', undefined);
      result.current.setValue('razaoSocial', undefined);
      result.current.setValue('endereco', undefined);
      result.current.setValue('emailContato', undefined);
      result.current.setValue('ambiente', undefined);
      result.current.setValue('urlWebservice', undefined);
      result.current.setValue('timeout', undefined);
      result.current.setValue('emailsNotificacao', undefined);
    });

    expect(result.current.control._formValues).toEqual({
      cnpj: '',
      razaoSocial: '',
      endereco: '',
      emailContato: '',
      ambiente: 'homologacao',
      certificado: null,
      urlWebservice: '',
      timeout: 30,
      emailsNotificacao: [],
    });
  });

  it('deve lidar com valores null no formulário', () => {
    const { result } = renderHook(() => useEsocialConfig());

    act(() => {
      result.current.setValue('cnpj', null);
      result.current.setValue('razaoSocial', null);
      result.current.setValue('endereco', null);
      result.current.setValue('emailContato', null);
      result.current.setValue('ambiente', null);
      result.current.setValue('urlWebservice', null);
      result.current.setValue('timeout', null);
      result.current.setValue('emailsNotificacao', null);
    });

    expect(result.current.control._formValues).toEqual({
      cnpj: '',
      razaoSocial: '',
      endereco: '',
      emailContato: '',
      ambiente: 'homologacao',
      certificado: null,
      urlWebservice: '',
      timeout: 30,
      emailsNotificacao: [],
    });
  });

  it('deve lidar com valores vazios no formulário', () => {
    const { result } = renderHook(() => useEsocialConfig());

    act(() => {
      result.current.setValue('cnpj', '');
      result.current.setValue('razaoSocial', '');
      result.current.setValue('endereco', '');
      result.current.setValue('emailContato', '');
      result.current.setValue('urlWebservice', '');
      result.current.setValue('emailsNotificacao', []);
    });

    expect(result.current.control._formValues).toEqual({
      cnpj: '',
      razaoSocial: '',
      endereco: '',
      emailContato: '',
      ambiente: 'homologacao',
      certificado: null,
      urlWebservice: '',
      timeout: 30,
      emailsNotificacao: [],
    });
  });
}); 