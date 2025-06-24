/**
 * Arquivo: next.config.mjs
 * Caminho: next.config.mjs
 * Criado em: 2024-03-19
 * Última atualização: 2025-01-27
 * Descrição: Configuração do Next.js 13 para resolver erro do Watchpack
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Configuração específica para Next.js 13
  webpack: (config, { dev }) => {
    if (dev) {
      // Configuração mais simples para evitar problemas do Watchpack
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
        ignored: ['**/node_modules', '**/.git', '**/.next'],
      };
    }
    return config;
  },
};

export default nextConfig; 