/**
 * Arquivo: next.config.mjs
 * Caminho: next.config.mjs
 * Criado em: 2025-06-01
 * Última atualização: 2025-05-31
 * Descrição: Configuração do Next.js
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  webpack: (config, { isServer, dev }) => {
    // Configurações de fallback
    config.resolve.fallback = {
      ...config.resolve.fallback,
      abab: false,
      domexception: false
    };
    
    // Configurações de cache
    config.cache = false;
    config.resolve.symlinks = false;
    config.resolve.cache = false;

    // Configurações de watch para desenvolvimento
    if (dev) {
      config.watchOptions = {
        aggregateTimeout: 300,
        poll: 1000,
        ignored: '**/node_modules/**'
      };
    }
    
    // Otimizações para reduzir o tamanho do bundle
    if (!isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        minSize: 20000,
        maxSize: 244000,
        minChunks: 1,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        cacheGroups: {
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            reuseExistingChunk: true,
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
        },
      };
    }
    
    return config;
  }
};

export default nextConfig; 