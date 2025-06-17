/**
 * Arquivo: s3.service.ts
 * Caminho: src/services/s3.service.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Serviço de armazenamento em S3
 */

import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { LogService, TipoLog, CategoriaLog } from '@/services/log.service';

export class S3Service {
  private static instance: S3Service;
  private s3Client: S3Client;
  private bucket: string;

  private constructor() {
    this.s3Client = new S3Client({
      region: process.env.AWS_REGION || 'us-east-1',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || ''
      }
    });
    this.bucket = process.env.AWS_S3_BUCKET || '';
  }

  static getInstance(): S3Service {
    if (!S3Service.instance) {
      S3Service.instance = new S3Service();
    }
    return S3Service.instance;
  }

  async uploadFile(file: File, key: string): Promise<string> {
    try {
      const command = new PutObjectCommand({
        Bucket: this.bucket,
        Key: key,
        Body: file,
        ContentType: file.type
      });

      await this.s3Client.send(command);

      await LogService.create({
        tipo: TipoLog.INFO,
        categoria: CategoriaLog.ARQUIVO,
        mensagem: 'Arquivo enviado com sucesso para o S3',
        detalhes: { key }
      });

      return key;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.ARQUIVO,
        mensagem: 'Erro ao enviar arquivo para o S3',
        detalhes: { error, key }
      });

      throw error;
    }
  }

  async getSignedUrl(key: string, expiresIn = 3600): Promise<string> {
    try {
      const command = new GetObjectCommand({
        Bucket: this.bucket,
        Key: key
      });

      const signedUrl = await getSignedUrl(this.s3Client, command, { expiresIn });

      await LogService.create({
        tipo: TipoLog.INFO,
        categoria: CategoriaLog.ARQUIVO,
        mensagem: 'URL assinada gerada com sucesso',
        detalhes: { key }
      });

      return signedUrl;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.ARQUIVO,
        mensagem: 'Erro ao gerar URL assinada',
        detalhes: { error, key }
      });

      throw error;
    }
  }

  async deleteFile(key: string): Promise<void> {
    try {
      const command = new DeleteObjectCommand({
        Bucket: this.bucket,
        Key: key
      });

      await this.s3Client.send(command);

      await LogService.create({
        tipo: TipoLog.INFO,
        categoria: CategoriaLog.ARQUIVO,
        mensagem: 'Arquivo deletado com sucesso do S3',
        detalhes: { key }
      });
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.ARQUIVO,
        mensagem: 'Erro ao deletar arquivo do S3',
        detalhes: { error, key }
      });

      throw error;
    }
  }

  async uploadDocument(file: File, userId: string, documentType: string): Promise<string> {
    const key = `documents/${userId}/${documentType}/${Date.now()}-${file.name}`;
    return this.uploadFile(file, key);
  }

  async uploadProfilePicture(file: File, userId: string): Promise<string> {
    const key = `profile-pictures/${userId}/${Date.now()}-${file.name}`;
    return this.uploadFile(file, key);
  }

  async uploadEventAttachment(file: File, eventId: string): Promise<string> {
    const key = `event-attachments/${eventId}/${Date.now()}-${file.name}`;
    return this.uploadFile(file, key);
  }
} 
