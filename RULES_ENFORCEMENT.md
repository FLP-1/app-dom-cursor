# Sistema de Controle de Regras do Projeto DOM

## 🎯 Objetivo

Este sistema garante que **todas as regras do projeto sejam sempre seguidas**, impedindo que sejam esquecidas ou renegadas através de verificações automatizadas.

## 🔧 Ferramentas Implementadas

### 1. **ESLint Configurado** (`.eslintrc.json`)
- ✅ **Proíbe uso de `any`**
- ✅ **Bloqueia imports de UI não-MUI** (Ant Design, Bootstrap, Chakra, etc)
- ✅ **Força uso de componentes MUI padrão** (ListItemButton vs ListItem button)
- ✅ **Obriga imports com alias `@/`**
- ✅ **Proíbe estilos inline** (força uso de `sx` prop)
- ✅ **Proíbe tooltips hardcoded** (força uso do dicionário central)
- ✅ **Força tipagem estrita**

### 2. **Husky Hooks** (`.husky/pre-commit`)
- ✅ **Verificação automática antes de cada commit**
- ✅ **Bloqueia commit se regras forem violadas**
- ✅ **Mensagens claras de erro**

### 3. **GitHub Actions** (`.github/workflows/rules-check.yml`)
- ✅ **Verificação automática em cada PR**
- ✅ **Bloqueia merge se regras forem violadas**
- ✅ **Relatórios detalhados de violações**

### 4. **Scripts NPM** (`package.json`)
- ✅ `npm run lint:strict` - ESLint sem warnings
- ✅ `npm run lint:fix` - Corrige problemas automaticamente
- ✅ `npm run type-check` - Verificação de tipos TypeScript
- ✅ `npm run rules:check` - Verificação completa de regras
- ✅ `npm run pre-commit` - Verificação antes do commit

## 🚀 Como Usar

### **Desenvolvimento Diário**

```bash
# Verificar regras antes de fazer commit
npm run rules:check

# Corrigir problemas automaticamente
npm run lint:fix

# Verificar tipos TypeScript
npm run type-check
```

### **Antes de Fazer Commit**

```bash
# O hook do Husky executa automaticamente
git add .
git commit -m "feat: nova funcionalidade"

# Se houver violações, o commit será bloqueado
```

### **Verificação Manual**

```bash
# Verificar todas as regras
npm run rules:check

# Verificar apenas ESLint
npm run lint:strict

# Verificar apenas TypeScript
npm run type-check
```

## 📋 Regras Verificadas Automaticamente

### **1. Tipagem**
- ❌ `: any` → ✅ `: unknown` ou tipo específico
- ❌ `any[]` → ✅ `unknown[]` ou tipo específico

### **2. UI Components**
- ❌ `import { Button } from 'antd'` → ✅ `import { Button } from '@mui/material'`
- ❌ `<ListItem button>` → ✅ `<ListItemButton>`
- ❌ `style={{ color: 'red' }}` → ✅ `sx={{ color: 'red' }}`

### **3. Imports**
- ❌ `import { Component } from '../components'` → ✅ `import { Component } from '@/components'`
- ❌ `import { Component } from './Component'` → ✅ `import { Component } from '@/components/Component'`

### **4. Internacionalização**
- ❌ `title="Tooltip texto"` → ✅ `title={tooltips.campo.pt}`
- ❌ `"Texto hardcoded"` → ✅ `messages.campo.texto`

### **5. Arquivos**
- ❌ `Component_old.tsx` → ✅ `Component.tsx`
- ❌ `Component-copia.tsx` → ✅ `Component.tsx`
- ❌ `Component.backup.tsx` → ✅ `Component.tsx`

### **6. Documentação**
- ❌ Arquivo sem cabeçalho → ✅ Cabeçalho obrigatório
- ❌ Data não atualizada → ✅ Data atualizada

## 🛠️ Configuração do Ambiente

### **Instalar Dependências**

```bash
npm install --save-dev @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-plugin-import husky
```

### **Configurar Husky**

```bash
npx husky install
npx husky add .husky/pre-commit "npm run pre-commit"
```

### **Configurar VS Code**

Adicione ao `.vscode/settings.json`:

```json
{
  "eslint.validate": ["typescript", "typescriptreact"],
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.preferences.importModuleSpecifier": "non-relative"
}
```

## 🔍 Exemplos de Violações

### **❌ Violação - Uso de 'any'**
```typescript
// ERRO: ESLint bloqueará
const data: any = response.data;
```

### **✅ Correção**
```typescript
// CORRETO
const data: unknown = response.data;
// ou
interface ResponseData {
  id: string;
  name: string;
}
const data: ResponseData = response.data;
```

### **❌ Violação - Import relativo**
```typescript
// ERRO: ESLint bloqueará
import { Component } from '../components/Component';
```

### **✅ Correção**
```typescript
// CORRETO
import { Component } from '@/components/Component';
```

### **❌ Violação - Tooltip hardcoded**
```tsx
// ERRO: ESLint bloqueará
<Tooltip title="Clique para editar">
  <Button>Editar</Button>
</Tooltip>
```

### **✅ Correção**
```tsx
// CORRETO
<Tooltip title={tooltips.editar.pt}>
  <Button>Editar</Button>
</Tooltip>
```

## 🚨 O que Acontece se Violar as Regras

### **Durante Desenvolvimento**
- ❌ **ESLint mostra erro** no editor
- ❌ **TypeScript mostra erro** de tipagem
- ❌ **Commit é bloqueado** pelo Husky

### **Durante PR**
- ❌ **GitHub Actions falha**
- ❌ **PR não pode ser mergeado**
- ❌ **Relatório detalhado** de violações

### **Como Corrigir**
1. Execute `npm run lint:fix` para correções automáticas
2. Corrija manualmente os problemas restantes
3. Execute `npm run rules:check` para verificar
4. Faça commit novamente

## 📊 Benefícios

### **Para o Time**
- ✅ **Consistência** no código
- ✅ **Qualidade** garantida
- ✅ **Manutenibilidade** melhorada
- ✅ **Onboarding** mais fácil

### **Para o Projeto**
- ✅ **Padrões** sempre seguidos
- ✅ **Refatoração** mais segura
- ✅ **Documentação** sempre atualizada
- ✅ **Internacionalização** consistente

## 🔄 Atualização de Regras

Para adicionar novas regras:

1. **Edite `.eslintrc.json`** para regras de código
2. **Edite `.husky/pre-commit`** para verificações de arquivos
3. **Edite `.github/workflows/rules-check.yml`** para CI/CD
4. **Atualize esta documentação**

## 📞 Suporte

Se encontrar problemas:

1. Execute `npm run rules:check` para diagnóstico
2. Consulte os logs de erro detalhados
3. Verifique esta documentação
4. Abra uma issue no repositório

---

**Lembre-se:** Este sistema existe para garantir a qualidade e consistência do projeto. Sempre execute as verificações antes de fazer commit! 🎯 

# Regras de UI2 para Grid (Material UI)

## Obrigatoriedade do Padrão UI2

- **É OBRIGATÓRIO** utilizar apenas o padrão Grid v2 do Material UI em todo o projeto.
- O container deve ser sempre:
  ```jsx
  <Grid container columns={12} spacing={...}>
  ```
- Os itens devem ser:
  ```jsx
  <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 4' }}>
  ```
- **É proibido** o uso das props antigas:
  - `item`, `xs=`, `sm=`, `md=`, `lg=`, `xl=`
- **Nunca misture** o padrão antigo (`xs`, `sm`, etc.) com o novo (`gridColumn`).
- O padrão antigo será rejeitado em code review e PR.

## Exemplo correto:
```jsx
<Grid container columns={12} spacing={2}>
  <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 4' }}>
    ...
  </Grid>
</Grid>
```

## Exemplo proibido:
```jsx
<Grid item xs={12} sm={6} md={4}>...</Grid>
```

## Justificativa
- Garante responsividade, padronização e compatibilidade futura.
- Facilita manutenção e code review.

**Todo PR que não seguir este padrão deve ser rejeitado.** 