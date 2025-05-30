import { useState } from 'react';
import { useForm } from 'react-hook-form';

export interface EsocialConfigFormValues {
  cnpj: string;
  razaoSocial: string;
  endereco: string;
  emailContato: string;
  ambiente: 'producao' | 'homologacao';
  certificado: File | null;
  urlWebservice: string;
  timeout: number;
  emailsNotificacao: string[];
}

export interface CertificadoAtual {
  nome: string;
  validade: string;
}

export interface LogAlteracao {
  data: string;
  usuario: string;
  acao: string;
}

export function useEsocialConfig() {
  const initialValues: EsocialConfigFormValues = {
    cnpj: '',
    razaoSocial: '',
    endereco: '',
    emailContato: '',
    ambiente: 'homologacao',
    certificado: null,
    urlWebservice: '',
    timeout: 30,
    emailsNotificacao: [],
  };

  const { control, handleSubmit, setValue } = useForm<EsocialConfigFormValues>({
    defaultValues: initialValues,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Simular integração com gestão de documentos
  const certificadoAtual: CertificadoAtual | null = {
    nome: 'certificado_atual.pfx',
    validade: '2025-05-10',
  };
  // Simular status do certificado
  const statusCertificado: 'válido' | 'expirado' | 'ausente' = 'válido';

  // Simular integração com gestão de alertas
  const alertasRecentes = [
    { tipo: 'expiracao_certificado', mensagem: 'Certificado expira em 30 dias', data: '2024-06-10' },
    { tipo: 'falha_envio', mensagem: 'Falha no envio do evento S-1200', data: '2024-06-09' },
  ];

  // Simular permissões
  const permissoes = { podeEditar: true };

  // Simular histórico de alterações
  const historicoAlteracoes: LogAlteracao[] = [
    { data: '2024-06-01 10:00', usuario: 'admin@empresa.com', acao: 'Alterou certificado digital' },
    { data: '2024-05-15 09:30', usuario: 'admin@empresa.com', acao: 'Atualizou e-mail de contato' },
  ];

  const onSubmit = async (data: EsocialConfigFormValues) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      // Simular integração com gestão de documentos
      // Simular integração com gestão de alertas
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSuccess('Configuração salva com sucesso!');
    } catch (e) {
      setError('Erro ao salvar configuração.');
    } finally {
      setLoading(false);
    }
  };

  return {
    control,
    handleSubmit,
    onSubmit,
    loading,
    error,
    success,
    initialValues,
    setValue,
    certificadoAtual,
    statusCertificado,
    alertasRecentes,
    permissoes,
    historicoAlteracoes,
  };
} 