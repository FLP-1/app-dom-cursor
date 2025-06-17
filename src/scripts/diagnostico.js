/**
 * Arquivo: diagnostico.js
 * Caminho: diagnostico.js
 * Criado em: 2025-06-01
 * Última atualização: 2025-05-31
 * Descrição: Arquivo de diagnóstico do Next.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔍 DIAGNÓSTICO NEXT.JS - Iniciando...\n');

// 1. Verificar versões
function checkVersions() {
  console.log('📋 VERSÕES:');
  try {
    const nodeVersion = execSync('node --version', { encoding: 'utf8' }).trim();
    const npmVersion = execSync('npm --version', { encoding: 'utf8' }).trim();
    console.log(`  Node.js: ${nodeVersion}`);
    console.log(`  NPM: ${npmVersion}`);
    
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    console.log(`  Next.js: ${packageJson.dependencies?.next || 'não encontrado'}`);
    console.log(`  React: ${packageJson.dependencies?.react || 'não encontrado'}`);
  } catch (e) {
    console.log('  ❌ Erro ao verificar versões:', e.message);
  }
  console.log('');
}

// 2. Verificar dependências conflitantes
function checkConflicts() {
  console.log('⚠️  DEPENDÊNCIAS PROBLEMÁTICAS:');
  try {
    const result = execSync('npm ls --depth=0', { encoding: 'utf8' });
    
    const problematicos = ['rimraf@3', 'glob@7', 'eslint@6', 'eslint@7', '@mui/base'];
    let encontrados = [];
    
    problematicos.forEach(pkg => {
      if (result.includes(pkg.split('@')[0])) {
        encontrados.push(pkg.split('@')[0]);
      }
    });
    
    if (encontrados.length > 0) {
      console.log(`  ❌ Encontrados: ${encontrados.join(', ')}`);
    } else {
      console.log('  ✅ Nenhum pacote problemático detectado');
    }
  } catch (e) {
    console.log('  ⚠️  Aviso: algumas dependências podem ter conflitos');
  }
  console.log('');
}

// 3. Verificar configurações
function checkConfigs() {
  console.log('⚙️  CONFIGURAÇÕES:');
  
  // next.config.js
  if (fs.existsSync('next.config.js')) {
    const config = fs.readFileSync('next.config.js', 'utf8');
    if (config.includes('webpackDevMiddleware')) {
      console.log('  ❌ next.config.js contém webpackDevMiddleware (REMOVIDO no Next 14)');
    } else if (config.includes('webpack')) {
      console.log('  ⚠️  next.config.js contém configuração webpack');
    } else {
      console.log('  ✅ next.config.js limpo');
    }
  }
  
  // tsconfig.json
  if (fs.existsSync('tsconfig.json')) {
    const tsconfig = JSON.parse(fs.readFileSync('tsconfig.json', 'utf8'));
    if (tsconfig.compilerOptions?.paths) {
      console.log('  ✅ tsconfig.json com paths configurados');
    }
  }
  console.log('');
}

// 4. Testar build mínimo
function testMinimalBuild() {
  console.log('🧪 TESTE MÍNIMO:');
  
  // Backup next.config.js
  let backupConfig = null;
  if (fs.existsSync('next.config.js')) {
    backupConfig = fs.readFileSync('next.config.js', 'utf8');
    console.log('  📦 Fazendo backup do next.config.js...');
  }
  
  // Criar config mínimo
  const minimalConfig = `/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true
};

module.exports = nextConfig;`;
  
  fs.writeFileSync('next.config.js', minimalConfig);
  
  try {
    console.log('  🚀 Testando next build...');
    execSync('npx next build', { 
      encoding: 'utf8', 
      timeout: 30000,
      stdio: 'pipe'
    });
    console.log('  ✅ Build funcionou com configuração mínima!');
  } catch (e) {
    console.log('  ❌ Build falhou mesmo com config mínima');
    console.log('  📄 Erro:', e.message.split('\n')[0]);
  }
  
  // Restaurar config original
  if (backupConfig) {
    fs.writeFileSync('next.config.js', backupConfig);
    console.log('  🔄 next.config.js restaurado');
  }
  console.log('');
}

// 5. Gerar solução automática
function generateSolution() {
  console.log('💡 SOLUÇÃO RECOMENDADA:');
  
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const nextVersion = packageJson.dependencies?.next;
  
  if (nextVersion?.includes('14.')) {
    console.log('  🎯 Para Next.js 14:');
    console.log('     1. npm install rimraf@latest glob@latest eslint@latest');
    console.log('     2. Remover webpackDevMiddleware do next.config.js');
    console.log('     3. Usar apenas webpack() se necessário');
  } else {
    console.log('  🎯 Atualizar para Next.js 14:');
    console.log('     1. npm install next@latest react@latest react-dom@latest');
    console.log('     2. Limpar node_modules e reinstalar');
  }
  
  console.log('\n  📋 Script de correção automática:');
  console.log('     npm run fix-dependencies');
}

// Executar diagnóstico
async function runDiagnostic() {
  checkVersions();
  checkConflicts();
  checkConfigs();
  testMinimalBuild();
  generateSolution();
}

runDiagnostic(); 