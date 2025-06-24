/**
 * Arquivo: next.config.mjs
 * Caminho: next.config.mjs
 * Criado em: 2024-03-19
 * Última atualização: 2025-01-27
 * Descrição: Configuração do Next.js simplificada para resolver problemas do Watchpack
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Desabilitar funcionalidades que podem causar problemas com Watchpack
  experimental: {
    // Remover optimizePackageImports que estava causando erro
  },
  // Configuração específica para resolver problemas do Watchpack
  webpack: (config, { dev }) => {
    if (dev) {
      // Usar polling em vez de file system events para evitar problemas no Windows
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
        ignored: ['**/node_modules', '**/.git', '**/.next', '**/coverage'],
      };
    }
    return config;
  },
};

export default nextConfig; 