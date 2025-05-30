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

  static validateRequired(value: any): boolean {
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

  static validateCustom(value: any, validator: (value: any) => boolean): boolean {
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
    try {
      // Remove caracteres não numéricos
      const cpfLimpo = cpf.replace(/\D/g, '');

      // Verifica se tem 11 dígitos
      if (cpfLimpo.length !== 11) {
        return false;
      }

      // Verifica se todos os dígitos são iguais
      if (/^(\d)\1+$/.test(cpfLimpo)) {
        return false;
      }

      // Validação do primeiro dígito verificador
      let soma = 0;
      for (let i = 0; i < 9; i++) {
        soma += parseInt(cpfLimpo.charAt(i)) * (10 - i);
      }
      let resto = 11 - (soma % 11);
      const digito1 = resto > 9 ? 0 : resto;

      // Validação do segundo dígito verificador
      soma = 0;
      for (let i = 0; i < 10; i++) {
        soma += parseInt(cpfLimpo.charAt(i)) * (11 - i);
      }
      resto = 11 - (soma % 11);
      const digito2 = resto > 9 ? 0 : resto;

      return (
        digito1 === parseInt(cpfLimpo.charAt(9)) &&
        digito2 === parseInt(cpfLimpo.charAt(10))
      );
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.SISTEMA,
        mensagem: 'Erro ao validar CPF',
        detalhes: { cpf, error }
      });
      return false;
    }
  }

  /**
   * Valida um CNPJ
   * @param cnpj CNPJ a ser validado
   * @returns true se o CNPJ for válido
   */
  async validarCNPJ(cnpj: string): Promise<boolean> {
    try {
      // Remove caracteres não numéricos
      const cnpjLimpo = cnpj.replace(/\D/g, '');

      // Verifica se tem 14 dígitos
      if (cnpjLimpo.length !== 14) {
        return false;
      }

      // Verifica se todos os dígitos são iguais
      if (/^(\d)\1+$/.test(cnpjLimpo)) {
        return false;
      }

      // Validação do primeiro dígito verificador
      let soma = 0;
      let peso = 5;
      for (let i = 0; i < 12; i++) {
        soma += parseInt(cnpjLimpo.charAt(i)) * peso;
        peso = peso === 2 ? 9 : peso - 1;
      }
      let resto = 11 - (soma % 11);
      const digito1 = resto > 9 ? 0 : resto;

      // Validação do segundo dígito verificador
      soma = 0;
      peso = 6;
      for (let i = 0; i < 13; i++) {
        soma += parseInt(cnpjLimpo.charAt(i)) * peso;
        peso = peso === 2 ? 9 : peso - 1;
      }
      resto = 11 - (soma % 11);
      const digito2 = resto > 9 ? 0 : resto;

      return (
        digito1 === parseInt(cnpjLimpo.charAt(12)) &&
        digito2 === parseInt(cnpjLimpo.charAt(13))
      );
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.SISTEMA,
        mensagem: 'Erro ao validar CNPJ',
        detalhes: { cnpj, error }
      });
      return false;
    }
  }

  /**
   * Valida um e-mail
   * @param email E-mail a ser validado
   * @returns true se o e-mail for válido
   */
  async validarEmail(email: string): Promise<boolean> {
    try {
      const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return regex.test(email);
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.SISTEMA,
        mensagem: 'Erro ao validar e-mail',
        detalhes: { email, error }
      });
      return false;
    }
  }

  /**
   * Valida um número de telefone
   * @param telefone Número de telefone a ser validado
   * @returns true se o número for válido
   */
  async validarTelefone(telefone: string): Promise<boolean> {
    try {
      const regex = /^\+?[1-9]\d{1,14}$/;
      return regex.test(telefone.replace(/\D/g, ''));
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.SISTEMA,
        mensagem: 'Erro ao validar telefone',
        detalhes: { telefone, error }
      });
      return false;
    }
  }

  /**
   * Valida uma data
   * @param data Data a ser validada
   * @returns true se a data for válida
   */
  async validarData(data: string): Promise<boolean> {
    try {
      const dataObj = new Date(data);
      return dataObj instanceof Date && !isNaN(dataObj.getTime());
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.SISTEMA,
        mensagem: 'Erro ao validar data',
        detalhes: { data, error }
      });
      return false;
    }
  }

  /**
   * Valida uma senha
   * @param senha Senha a ser validada
   * @returns true se a senha for válida
   */
  async validarSenha(senha: string): Promise<boolean> {
    try {
      // Mínimo 8 caracteres
      // Pelo menos uma letra maiúscula
      // Pelo menos uma letra minúscula
      // Pelo menos um número
      // Pelo menos um caractere especial
      const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      return regex.test(senha);
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.SISTEMA,
        mensagem: 'Erro ao validar senha',
        detalhes: { error }
      });
      return false;
    }
  }

  /**
   * Valida um CEP
   * @param cep CEP a ser validado
   * @returns true se o CEP for válido
   */
  async validarCEP(cep: string): Promise<boolean> {
    try {
      const regex = /^\d{5}-?\d{3}$/;
      return regex.test(cep);
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.SISTEMA,
        mensagem: 'Erro ao validar CEP',
        detalhes: { cep, error }
      });
      return false;
    }
  }

  /**
   * Valida um PIS/PASEP
   * @param pis PIS/PASEP a ser validado
   * @returns true se o PIS/PASEP for válido
   */
  async validarPIS(pis: string): Promise<boolean> {
    try {
      // Remove caracteres não numéricos
      const pisLimpo = pis.replace(/\D/g, '');

      // Verifica se tem 11 dígitos
      if (pisLimpo.length !== 11) {
        return false;
      }

      // Validação do dígito verificador
      const multiplicadores = [3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
      let soma = 0;
      for (let i = 0; i < 10; i++) {
        soma += parseInt(pisLimpo.charAt(i)) * multiplicadores[i];
      }
      let resto = 11 - (soma % 11);
      const digito = resto > 9 ? 0 : resto;

      return digito === parseInt(pisLimpo.charAt(10));
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.SISTEMA,
        mensagem: 'Erro ao validar PIS/PASEP',
        detalhes: { pis, error }
      });
      return false;
    }
  }

  /**
   * Valida um número de cartão de crédito
   * @param cartao Número do cartão a ser validado
   * @returns true se o número for válido
   */
  async validarCartaoCredito(cartao: string): Promise<boolean> {
    try {
      // Remove caracteres não numéricos
      const cartaoLimpo = cartao.replace(/\D/g, '');

      // Verifica se tem entre 13 e 19 dígitos
      if (cartaoLimpo.length < 13 || cartaoLimpo.length > 19) {
        return false;
      }

      // Algoritmo de Luhn
      let soma = 0;
      let deveDobrar = false;

      // Percorre o número do cartão de trás para frente
      for (let i = cartaoLimpo.length - 1; i >= 0; i--) {
        let digito = parseInt(cartaoLimpo.charAt(i));

        if (deveDobrar) {
          digito *= 2;
          if (digito > 9) {
            digito -= 9;
          }
        }

        soma += digito;
        deveDobrar = !deveDobrar;
      }

      return soma % 10 === 0;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.SISTEMA,
        mensagem: 'Erro ao validar cartão de crédito',
        detalhes: { cartao, error }
      });
      return false;
    }
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
    try {
      // Verifica o tipo do arquivo
      if (!tiposPermitidos.includes(arquivo.type)) {
        throw new ValidationError(
          'tipo',
          'Tipo de arquivo não permitido',
          'ARQUIVO_TIPO_INVALIDO'
        );
      }

      // Verifica o tamanho do arquivo
      if (arquivo.size > tamanhoMaximo) {
        throw new ValidationError(
          'tamanho',
          'Arquivo excede o tamanho máximo permitido',
          'ARQUIVO_TAMANHO_EXCEDIDO'
        );
      }

      return true;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.SISTEMA,
        mensagem: 'Erro ao validar arquivo',
        detalhes: { arquivo, error }
      });
      return false;
    }
  }

  /**
   * Valida um número de IP
   * @param ip Número de IP a ser validado
   * @returns true se o IP for válido
   */
  async validarIP(ip: string): Promise<boolean> {
    try {
      const regex = /^(\d{1,3}\.){3}\d{1,3}$/;
      if (!regex.test(ip)) {
        return false;
      }

      const partes = ip.split('.');
      return partes.every(parte => {
        const numero = parseInt(parte);
        return numero >= 0 && numero <= 255;
      });
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.SISTEMA,
        mensagem: 'Erro ao validar IP',
        detalhes: { ip, error }
      });
      return false;
    }
  }

  /**
   * Valida um número de MAC
   * @param mac Número de MAC a ser validado
   * @returns true se o MAC for válido
   */
  async validarMAC(mac: string): Promise<boolean> {
    try {
      const regex = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;
      return regex.test(mac);
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.SISTEMA,
        mensagem: 'Erro ao validar MAC',
        detalhes: { mac, error }
      });
      return false;
    }
  }

  /**
   * Valida um número de CNH
   * @param cnh Número de CNH a ser validado
   * @returns true se a CNH for válida
   */
  async validarCNH(cnh: string): Promise<boolean> {
    try {
      // Remove caracteres não numéricos
      const cnhLimpo = cnh.replace(/\D/g, '');

      // Verifica se tem 11 dígitos
      if (cnhLimpo.length !== 11) {
        return false;
      }

      // Validação do primeiro dígito verificador
      let soma = 0;
      let multiplicador = 9;
      for (let i = 0; i < 9; i++) {
        soma += parseInt(cnhLimpo.charAt(i)) * multiplicador;
        multiplicador--;
      }
      let resto = soma % 11;
      const digito1 = resto > 9 ? 0 : resto;

      // Validação do segundo dígito verificador
      soma = 0;
      multiplicador = 1;
      for (let i = 0; i < 9; i++) {
        soma += parseInt(cnhLimpo.charAt(i)) * multiplicador;
        multiplicador++;
      }
      resto = soma % 11;
      const digito2 = resto > 9 ? 0 : resto;

      return (
        digito1 === parseInt(cnhLimpo.charAt(9)) &&
        digito2 === parseInt(cnhLimpo.charAt(10))
      );
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.SISTEMA,
        mensagem: 'Erro ao validar CNH',
        detalhes: { cnh, error }
      });
      return false;
    }
  }

  /**
   * Valida um número de título de eleitor
   * @param titulo Número de título a ser validado
   * @returns true se o título for válido
   */
  async validarTituloEleitor(titulo: string): Promise<boolean> {
    try {
      // Remove caracteres não numéricos
      const tituloLimpo = titulo.replace(/\D/g, '');

      // Verifica se tem 12 dígitos
      if (tituloLimpo.length !== 12) {
        return false;
      }

      // Validação do primeiro dígito verificador
      let soma = 0;
      const multiplicadores = [2, 3, 4, 5, 6, 7, 8, 9];
      for (let i = 0; i < 8; i++) {
        soma += parseInt(tituloLimpo.charAt(i)) * multiplicadores[i];
      }
      let resto = soma % 11;
      const digito1 = resto > 9 ? 0 : resto;

      // Validação do segundo dígito verificador
      soma = 0;
      for (let i = 8; i < 10; i++) {
        soma += parseInt(tituloLimpo.charAt(i)) * multiplicadores[i - 8];
      }
      resto = soma % 11;
      const digito2 = resto > 9 ? 0 : resto;

      return (
        digito1 === parseInt(tituloLimpo.charAt(10)) &&
        digito2 === parseInt(tituloLimpo.charAt(11))
      );
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.SISTEMA,
        mensagem: 'Erro ao validar título de eleitor',
        detalhes: { titulo, error }
      });
      return false;
    }
  }
} 