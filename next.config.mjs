/**
 * Arquivo: next.config.mjs
 * Caminho: next.config.mjs
 * Criado em: 2024-03-19
 * Última atualização: 2025-01-27
 * Descrição: Configuração mínima do Next.js para resolver erro do Watchpack
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Desabilitar completamente o Watchpack para resolver o erro
  webpack: (config, { dev }) => {
    if (dev) {
      // Desabilitar file watching e usar apenas polling
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
        ignored: ['**/node_modules', '**/.git', '**/.next', '**/coverage', '**/dist'],
        followSymlinks: false,
      };
      
      // Desabilitar algumas otimizações que podem causar problemas
      config.optimization = {
        ...config.optimization,
        removeAvailableModules: false,
        removeEmptyChunks: false,
        splitChunks: false,
      };
    }
    return config;
  },
};

export default nextConfig; 