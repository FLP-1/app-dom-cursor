import axios from 'axios';
import { LogService, TipoLog, CategoriaLog } from './log.service';
import { cpf, cnpj } from 'cpf-cnpj-validator';
import { isValidPhoneNumber } from 'react-phone-number-input';
import { isValidEmail } from '@/utils/validations/email';
import { isValidCEP } from '@/utils/validations/cep';
import { isValidPassword } from '@/utils/validations/password';
import { isValidURL } from '@/utils/validations/url';
import { isValidFile } from '@/utils/validations/file';
import { isValidDate, isValidTime } from '@/utils/validations/date';

export interface ValidacaoPonto {
  valido: boolean;
  mensagens: string[];
  atraso?: number;
  horaExtra?: number;
}

export interface ValidacaoOcorrencia {
  valido: boolean;
  mensagens: string[];
  sobreposicao?: boolean;
  documentos?: boolean;
}

export interface ValidacaoDocumento {
  valido: boolean;
  mensagens: string[];
  tipo?: boolean;
  tamanho?: boolean;
  formato?: boolean;
}

export interface ValidacaoEsocial {
  valido: boolean;
  mensagens: string[];
  schema?: boolean;
  regras?: boolean;
  datas?: boolean;
}

export class ValidationError extends Error {
  constructor(
    public campo: string,
    public mensagem: string,
    public codigo: string
  ) {
    super(mensagem);
    this.name = 'ValidationError';
  }
}

export class ValidationService {
  static validateCPF(value: string): boolean {
    return cpf.isValid(value);
  }

  static validateCNPJ(value: string): boolean {
    return cnpj.isValid(value);
  }

  static validateEmail(value: string): boolean {
    return isValidEmail(value);
  }

  static validatePhone(value: string): boolean {
    return isValidPhoneNumber(value);
  }

  static validateCEP(value: string): boolean {
    return isValidCEP(value);
  }

  static validateDate(value: string): boolean {
    return isValidDate(value);
  }

  static validateTime(value: string): boolean {
    return isValidTime(value);
  }

  static validatePassword(value: string): boolean {
    return isValidPassword(value);
  }

  static validateURL(value: string): boolean {
    return isValidURL(value);
  }

  static validateFile(file: File): boolean {
    return isValidFile(file);
  }

  static validateDocument(value: string): boolean {
    // Remove caracteres não numéricos
    const cleanValue = value.replace(/\D/g, '');
    
    // Verifica se é CPF ou CNPJ baseado no tamanho
    if (cleanValue.length === 11) {
      return this.validateCPF(cleanValue);
    } else if (cleanValue.length === 14) {
      return this.validateCNPJ(cleanValue);
    }
    
    return false;
  }

  static validateRequired(value: unknown): boolean {
    if (value === null || value === undefined) return false;
    if (typeof value === 'string') return value.trim().length > 0;
    if (Array.isArray(value)) return value.length > 0;
    return true;
  }

  static validateMinLength(value: string, min: number): boolean {
    return value.length >= min;
  }

  static validateMaxLength(value: string, max: number): boolean {
    return value.length <= max;
  }

  static validateMinValue(value: number, min: number): boolean {
    return value >= min;
  }

  static validateMaxValue(value: number, max: number): boolean {
    return value <= max;
  }

  static validateRange(value: number, min: number, max: number): boolean {
    return value >= min && value <= max;
  }

  static validatePattern(value: string, pattern: RegExp): boolean {
    return pattern.test(value);
  }

  static validateMatch(value: string, matchValue: string): boolean {
    return value === matchValue;
  }

  static validateCustom<T>(value: T, validator: (value: T) => boolean): boolean {
    return validator(value);
  }

  async validarPonto(
    empregadoDomesticoId: string,
    data: Date,
    tipo: string,
    latitude?: number,
    longitude?: number,
    wifiSSID?: string
  ): Promise<ValidacaoPonto> {
    const { data: validacao } = await axios.post<ValidacaoPonto>('/api/validation/ponto', {
      empregadoDomesticoId,
      data,
      tipo,
      latitude,
      longitude,
      wifiSSID,
    });
    return validacao;
  }

  async validarOcorrencia(
    empregadoDomesticoId: string,
    tipo: string,
    dataInicio: Date,
    dataFim: Date,
    documentos?: File[]
  ): Promise<ValidacaoOcorrencia> {
    const form = new FormData();
    form.append('empregadoDomesticoId', empregadoDomesticoId);
    form.append('tipo', tipo);
    form.append('dataInicio', dataInicio.toISOString());
    form.append('dataFim', dataFim.toISOString());
    if (documentos) {
      documentos.forEach((file, index) => {
        form.append(`documentos[${index}]`, file);
      });
    }

    const { data: validacao } = await axios.post<ValidacaoOcorrencia>('/api/validation/ocorrencia', form, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return validacao;
  }

  async validarDocumento(
    tipo: string,
    arquivo: File
  ): Promise<ValidacaoDocumento> {
    const form = new FormData();
    form.append('tipo', tipo);
    form.append('arquivo', arquivo);

    const { data: validacao } = await axios.post<ValidacaoDocumento>('/api/validation/documento', form, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return validacao;
  }

  async validarEsocial(
    tipo: string,
    payload: Record<string, unknown>
  ): Promise<ValidacaoEsocial> {
    const { data: validacao } = await axios.post<ValidacaoEsocial>('/api/validation/esocial', {
      tipo,
      payload,
    });
    return validacao;
  }

  /**
   * Valida um CPF
   * @param cpf CPF a ser validado
   * @returns true se o CPF for válido
   */
  async validarCPF(cpf: string): Promise<boolean> {
    const { data: validacao } = await axios.post<boolean>('/api/validation/cpf', { cpf });
    return validacao;
  }

  /**
   * Valida um CNPJ
   * @param cnpj CNPJ a ser validado
   * @returns true se o CNPJ for válido
   */
  async validarCNPJ(cnpj: string): Promise<boolean> {
    const { data: validacao } = await axios.post<boolean>('/api/validation/cnpj', { cnpj });
    return validacao;
  }

  /**
   * Valida um e-mail
   * @param email E-mail a ser validado
   * @returns true se o e-mail for válido
   */
  async validarEmail(email: string): Promise<boolean> {
    const { data: validacao } = await axios.post<boolean>('/api/validation/email', { email });
    return validacao;
  }

  /**
   * Valida um número de telefone
   * @param telefone Número de telefone a ser validado
   * @returns true se o número for válido
   */
  async validarTelefone(telefone: string): Promise<boolean> {
    const { data: validacao } = await axios.post<boolean>('/api/validation/telefone', { telefone });
    return validacao;
  }

  /**
   * Valida uma data
   * @param data Data a ser validada
   * @returns true se a data for válida
   */
  async validarData(data: string): Promise<boolean> {
    const { data: validacao } = await axios.post<boolean>('/api/validation/data', { data });
    return validacao;
  }

  /**
   * Valida uma senha
   * @param senha Senha a ser validada
   * @returns true se a senha for válida
   */
  async validarSenha(senha: string): Promise<boolean> {
    const { data: validacao } = await axios.post<boolean>('/api/validation/senha', { senha });
    return validacao;
  }

  /**
   * Valida um CEP
   * @param cep CEP a ser validado
   * @returns true se o CEP for válido
   */
  async validarCEP(cep: string): Promise<boolean> {
    const { data: validacao } = await axios.post<boolean>('/api/validation/cep', { cep });
    return validacao;
  }

  /**
   * Valida um PIS/PASEP
   * @param pis PIS/PASEP a ser validado
   * @returns true se o PIS/PASEP for válido
   */
  async validarPIS(pis: string): Promise<boolean> {
    const { data: validacao } = await axios.post<boolean>('/api/validation/pis', { pis });
    return validacao;
  }

  /**
   * Valida um número de cartão de crédito
   * @param cartao Número do cartão a ser validado
   * @returns true se o número for válido
   */
  async validarCartaoCredito(cartao: string): Promise<boolean> {
    const { data: validacao } = await axios.post<boolean>('/api/validation/cartao-credito', { cartao });
    return validacao;
  }

  /**
   * Valida um arquivo
   * @param arquivo Arquivo a ser validado
   * @param tiposPermitidos Tipos MIME permitidos
   * @param tamanhoMaximo Tamanho máximo em bytes
   * @returns true se o arquivo for válido
   */
  async validarArquivo(
    arquivo: File,
    tiposPermitidos: string[],
    tamanhoMaximo: number
  ): Promise<boolean> {
    const form = new FormData();
    form.append('arquivo', arquivo);
    form.append('tiposPermitidos', JSON.stringify(tiposPermitidos));
    form.append('tamanhoMaximo', tamanhoMaximo.toString());

    const { data: validacao } = await axios.post<boolean>('/api/validation/arquivo', form, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return validacao;
  }

  /**
   * Valida um número de IP
   * @param ip Número de IP a ser validado
   * @returns true se o IP for válido
   */
  async validarIP(ip: string): Promise<boolean> {
    const { data: validacao } = await axios.post<boolean>('/api/validation/ip', { ip });
    return validacao;
  }

  /**
   * Valida um número de MAC
   * @param mac Número de MAC a ser validado
   * @returns true se o MAC for válido
   */
  async validarMAC(mac: string): Promise<boolean> {
    const { data: validacao } = await axios.post<boolean>('/api/validation/mac', { mac });
    return validacao;
  }

  /**
   * Valida um número de CNH
   * @param cnh Número de CNH a ser validado
   * @returns true se a CNH for válida
   */
  async validarCNH(cnh: string): Promise<boolean> {
    const { data: validacao } = await axios.post<boolean>('/api/validation/cnh', { cnh });
    return validacao;
  }

  /**
   * Valida um número de título de eleitor
   * @param titulo Número de título a ser validado
   * @returns true se o título for válido
   */
  async validarTituloEleitor(titulo: string): Promise<boolean> {
    const { data: validacao } = await axios.post<boolean>('/api/validation/titulo-eleitor', { titulo });
    return validacao;
  }
} 