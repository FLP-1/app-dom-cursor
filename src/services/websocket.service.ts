import { LogService, TipoLog, CategoriaLog } from './log.service';
import { CacheService } from './cache.service';
import { I18nService } from './i18n.service';

/**
 * Serviço de WebSocket
 * @description Gerencia as conexões em tempo real do sistema
 * @author DOM
 * @version 1.0.0
 * @since 2024-01-01
 */

export type TipoEvento = 'sistema' | 'usuario' | 'empresa' | 'ponto' | 'ocorrencia' | 'documento' | 'esocial' | 'backup' | 'seguranca';

export type StatusConexao = 'conectado' | 'desconectado' | 'reconectando' | 'erro';

export interface Evento {
  id: string;
  tipo: TipoEvento;
  acao: string;
  dados: Record<string, unknown>;
  origem: string;
  destino?: string;
  timestamp: Date;
}

export interface Conexao {
  id: string;
  usuarioId: string;
  status: StatusConexao;
  ultimaAtividade: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface WebSocketConfig {
  id: string;
  url: string;
  reconectar: boolean;
  maxTentativas: number;
  intervaloReconexao: number;
  timeout: number;
  createdAt: Date;
  updatedAt: Date;
}

export const WebSocketService = {
  private readonly CACHE_KEY = 'websocket:';
  private readonly CACHE_EXPIRACAO = 3600; // 1 hora
  private socket: WebSocket | null = null;
  private tentativas = 0;
  private reconectando = false;
  private handlers: Map<string, Set<(evento: Evento) => void>> = new Map();

  /**
   * Inicializa o serviço
   * @returns Promise<void>
   */
  async inicializar(): Promise<void> {
    try {
      const config = await this.obterConfiguracao();
      await this.conectar(config);
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.WEBSOCKET,
        mensagem: 'Erro ao inicializar websocket',
        detalhes: { error }
      });
      throw error;
    }
  },

  /**
   * Conecta ao servidor
   * @param config Configuração do websocket
   * @returns Promise<void>
   */
  private async conectar(config: WebSocketConfig): Promise<void> {
    try {
      this.socket = new WebSocket(config.url);

      this.socket.onopen = async () => {
        this.tentativas = 0;
        this.reconectando = false;

        await LogService.create({
          tipo: TipoLog.INFO,
          categoria: CategoriaLog.WEBSOCKET,
          mensagem: 'WebSocket conectado'
        });

        await this.registrarConexao();
      };

      this.socket.onclose = async () => {
        await LogService.create({
          tipo: TipoLog.INFO,
          categoria: CategoriaLog.WEBSOCKET,
          mensagem: 'WebSocket desconectado'
        });

        if (config.reconectar && !this.reconectando) {
          await this.reconectar(config);
        }
      };

      this.socket.onerror = async (error) => {
        await LogService.create({
          tipo: TipoLog.ERROR,
          categoria: CategoriaLog.WEBSOCKET,
          mensagem: 'Erro no WebSocket',
          detalhes: { error }
        });
      };

      this.socket.onmessage = async (event) => {
        try {
          const evento = JSON.parse(event.data) as Evento;
          await this.processarEvento(evento);
        } catch (error) {
          await LogService.create({
            tipo: TipoLog.ERROR,
            categoria: CategoriaLog.WEBSOCKET,
            mensagem: 'Erro ao processar mensagem do WebSocket',
            detalhes: { error, data: event.data }
          });
        }
      };
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.WEBSOCKET,
        mensagem: 'Erro ao conectar WebSocket',
        detalhes: { error }
      });
      throw error;
    }
  },

  /**
   * Reconecta ao servidor
   * @param config Configuração do websocket
   * @returns Promise<void>
   */
  private async reconectar(config: WebSocketConfig): Promise<void> {
    if (this.tentativas >= config.maxTentativas) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.WEBSOCKET,
        mensagem: 'Número máximo de tentativas de reconexão atingido',
        detalhes: { tentativas: this.tentativas }
      });
      return;
    }

    this.reconectando = true;
    this.tentativas++;

    await LogService.create({
      tipo: TipoLog.INFO,
      categoria: CategoriaLog.WEBSOCKET,
      mensagem: 'Tentando reconectar WebSocket',
      detalhes: { tentativa: this.tentativas }
    });

    setTimeout(async () => {
      await this.conectar(config);
    }, config.intervaloReconexao);
  },

  /**
   * Registra a conexão atual
   * @returns Promise<void>
   */
  private async registrarConexao(): Promise<void> {
    try {
      await axios.post('/api/websocket/conexao', {
        status: 'conectado',
        ultimaAtividade: new Date()
      });
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.WEBSOCKET,
        mensagem: 'Erro ao registrar conexão',
        detalhes: { error }
      });
    }
  },

  /**
   * Processa um evento recebido
   * @param evento Evento recebido
   * @returns Promise<void>
   */
  private async processarEvento(evento: Evento): Promise<void> {
    try {
      const handlers = this.handlers.get(evento.tipo) || new Set();
      handlers.forEach((handler) => handler(evento));

      await LogService.create({
        tipo: TipoLog.INFO,
        categoria: CategoriaLog.WEBSOCKET,
        mensagem: 'Evento processado',
        detalhes: { evento }
      });
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.WEBSOCKET,
        mensagem: 'Erro ao processar evento',
        detalhes: { evento, error }
      });
    }
  },

  /**
   * Envia um evento
   * @param evento Evento a ser enviado
   * @returns Promise<void>
   */
  async enviar(evento: Omit<Evento, 'id' | 'timestamp'>): Promise<void> {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
      throw new Error('WebSocket não está conectado');
    }

    try {
      const eventoCompleto: Evento = {
        ...evento,
        id: crypto.randomUUID(),
        timestamp: new Date()
      };

      this.socket.send(JSON.stringify(eventoCompleto));

      await LogService.create({
        tipo: TipoLog.INFO,
        categoria: CategoriaLog.WEBSOCKET,
        mensagem: 'Evento enviado',
        detalhes: { evento: eventoCompleto }
      });
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.WEBSOCKET,
        mensagem: 'Erro ao enviar evento',
        detalhes: { evento, error }
      });
      throw error;
    }
  },

  /**
   * Registra um handler para um tipo de evento
   * @param tipo Tipo do evento
   * @param handler Handler do evento
   * @returns Função para remover o handler
   */
  on(tipo: TipoEvento, handler: (evento: Evento) => void): () => void {
    if (!this.handlers.has(tipo)) {
      this.handlers.set(tipo, new Set());
    }

    this.handlers.get(tipo)!.add(handler);

    return () => {
      const handlers = this.handlers.get(tipo);
      if (handlers) {
        handlers.delete(handler);
      }
    };
  },

  /**
   * Obtém a configuração do serviço
   * @returns Configuração
   */
  async obterConfiguracao(): Promise<WebSocketConfig> {
    try {
      const { data } = await axios.get<WebSocketConfig>('/api/websocket/config');
      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.WEBSOCKET,
        mensagem: 'Erro ao obter configuração do WebSocket',
        detalhes: { error }
      });
      throw error;
    }
  },

  /**
   * Atualiza a configuração do serviço
   * @param config Novos dados da configuração
   * @returns Configuração atualizada
   */
  async atualizarConfiguracao(
    config: Partial<Omit<WebSocketConfig, 'id' | 'createdAt' | 'updatedAt'>>
  ): Promise<WebSocketConfig> {
    try {
      const { data } = await axios.patch<WebSocketConfig>('/api/websocket/config', config);

      await LogService.create({
        tipo: TipoLog.INFO,
        categoria: CategoriaLog.WEBSOCKET,
        mensagem: 'Configuração do WebSocket atualizada',
        detalhes: { config }
      });

      if (this.socket) {
        await this.conectar(data);
      }

      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.WEBSOCKET,
        mensagem: 'Erro ao atualizar configuração do WebSocket',
        detalhes: { config, error }
      });
      throw error;
    }
  },

  /**
   * Lista as conexões ativas
   * @returns Lista de conexões
   */
  async listarConexoes(): Promise<Conexao[]> {
    try {
      const { data } = await axios.get<Conexao[]>('/api/websocket/conexao');
      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.WEBSOCKET,
        mensagem: 'Erro ao listar conexões do WebSocket',
        detalhes: { error }
      });
      throw error;
    }
  },

  /**
   * Obtém estatísticas das conexões
   * @returns Estatísticas
   */
  async obterEstatisticas(): Promise<{
    total: number;
    ativas: number;
    porTipo: Record<TipoEvento, number>;
    porStatus: Record<StatusConexao, number>;
  }> {
    try {
      const { data } = await axios.get('/api/websocket/estatisticas');
      return data;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.WEBSOCKET,
        mensagem: 'Erro ao obter estatísticas do WebSocket',
        detalhes: { error }
      });
      throw error;
    }
  },

  /**
   * Desconecta o serviço
   * @returns Promise<void>
   */
  async desconectar(): Promise<void> {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }
}; 