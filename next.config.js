/**
 * Arquivo: next.config.js
 * Caminho: next.config.js
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-01
 * Descrição: Configuração do Next.js para o projeto, incluindo modo estrito, serverActions e configuração de imagens.
 * @type {import('next').NextConfig}
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000'],
      bodySizeLimit: '2mb'
    }
  },
  images: {
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  }
};

module.exports = nextConfig; 