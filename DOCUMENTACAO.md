# Organização do Projeto

## Estrutura de Diretórios

### Diretórios Principais
```
app-DOM/
├── src/                    # Código-fonte
│   ├── app/               # Páginas e rotas
│   ├── components/        # Componentes React
│   ├── config/           # Configurações específicas
│   ├── hooks/            # Hooks customizados
│   ├── i18n/             # Internacionalização
│   ├── scripts/          # Scripts e utilitários
│   ├── services/         # Serviços e APIs
│   ├── store/            # Gerenciamento de estado
│   ├── styles/           # Estilos globais
│   ├── tests/            # Testes
│   ├── types/            # Definições de tipos
│   └── utils/            # Funções utilitárias
├── docs/                  # Documentação
│   ├── technical/        # Documentação técnica
│   └── user/             # Documentação do usuário
├── public/               # Arquivos estáticos
├── prisma/               # Schema e migrations
└── [config files]        # Arquivos de configuração
```

### Arquivos na Raiz
Alguns arquivos DEVEM permanecer na raiz do projeto:

1. **Configuração de Ferramentas**
   - `.cursorrules` (configuração do Cursor IDE)
   - `project_rules` (regras do projeto)
   - `.eslintrc.json` (configuração do ESLint)
   - `.gitignore` (configuração do Git)
   - `.npmrc` (configuração do npm)
   - `tsconfig.json` (configuração do TypeScript)
   - `next.config.mjs` (configuração do Next.js)

2. **Documentação Principal**
   - `README.md` (documentação principal do projeto)
   - `LICENSE` (licença do projeto)

3. **Arquivos de Build e Cache**
   - `tsconfig.tsbuildinfo` (cache do TypeScript)
   - `.next/` (build do Next.js)
   - `node_modules/` (dependências)

## Regras de Organização

### 1. Código-fonte (`src/`)
- Todo código-fonte deve estar dentro do diretório `src/`
- Usar imports com alias '@/'
- Proibido usar caminhos relativos (../, ./)
- Manter arquivos com tamanho adequado
- Seguir padrões de nomenclatura

### 2. Documentação (`docs/`)
- Documentação técnica em `docs/technical/`
- Documentação de usuário em `docs/user/`
- README.md e LICENSE na raiz
- Documentar mudanças estruturais no CHANGELOG.md
- Incluir exemplos e casos de uso

### 3. Arquivos Estáticos (`public/`)
- Imagens, fontes e outros assets em `public/`
- Seguir padrão de nomenclatura
- Otimizar tamanho dos arquivos
- Organizar por tipo (imagens/, fonts/, etc)

### 4. Configuração
- Arquivos de configuração de ferramentas na raiz
- Configurações específicas em `src/config/`
- Manter apenas um arquivo por ferramenta
- Documentar alterações em configurações

### 5. Gerenciamento de Pacotes
- Usar apenas npm
- Manter package-lock.json
- Remover arquivos de outros gerenciadores
- Documentar dependências no README.md

## Padrões de Nomenclatura

### Arquivos
- Páginas: kebab-case (ex: `minha-pagina.tsx`)
- Componentes: PascalCase (ex: `MeuComponente.tsx`)
- Hooks: camelCase com prefixo 'use' (ex: `useMeuHook.ts`)
- Utilitários: camelCase (ex: `meuUtil.ts`)
- Testes: `.test.tsx` ou `.spec.tsx`

### Diretórios
- Componentes: PascalCase
- Páginas: kebab-case
- Utilitários: camelCase
- Configurações: camelCase

## Tamanho de Arquivos

### Limites
- Arquivos de código: 200-400 linhas
- Arquivos de teste: 100-200 linhas
- Arquivos de configuração: 50-100 linhas

### Divisão de Arquivos
Arquivos que excedam esses limites devem ser divididos seguindo estas regras:

1. **Por Responsabilidade:**
```
src/components/forms/empregado/
  ├── EmpregadoForm.tsx        // Componente principal
  ├── EmpregadoFormFields.tsx  // Campos do formulário
  ├── EmpregadoFormTypes.ts    // Tipos e interfaces
  └── EmpregadoFormUtils.ts    // Funções utilitárias
```

2. **Por Funcionalidade:**
```
src/hooks/esocial/
  ├── useEsocialEventForm.ts     // Hook principal
  ├── useEsocialEventTypes.ts    // Tipos
  ├── useEsocialEventUtils.ts    // Funções utilitárias
  └── useEsocialEventSchema.ts   // Schemas de validação
```

## Cabeçalho de Arquivos

Todo arquivo de código-fonte deve ter o seguinte cabeçalho:

```typescript
/**
 * Arquivo: NomeDoArquivo.tsx
 * Caminho: src/components/NomeDoArquivo.tsx
 * Criado em: YYYY-MM-DD
 * Última atualização: YYYY-MM-DD
 * Descrição: Breve descrição do propósito do arquivo
 */
```

## Checklist de PR

Antes de submeter um PR, verifique:

- [ ] Arquivos seguem estrutura correta
- [ ] Arquivos de configuração estão na raiz quando necessário
- [ ] Sem duplicidade de código
- [ ] Cabeçalhos atualizados
- [ ] Imports usando alias '@/'
- [ ] Tamanho de arquivos adequado
- [ ] Nomenclatura correta
- [ ] Documentação atualizada
- [ ] Sem arquivos temporários
- [ ] Apenas npm como gerenciador de pacotes

## Exemplos de Organização

### Componente de Formulário
```
src/components/forms/empregado/
  ├── EmpregadoForm.tsx           // Componente principal
  ├── EmpregadoFormFields.tsx     // Campos do formulário
  ├── EmpregadoFormTypes.ts       // Tipos e interfaces
  ├── EmpregadoFormUtils.ts       // Funções utilitárias
  ├── EmpregadoForm.test.tsx      // Testes do componente
  └── EmpregadoForm.stories.tsx   // Histórias do Storybook
```

### Hook Customizado
```
src/hooks/esocial/
  ├── useEsocialEventForm.ts      // Hook principal
  ├── useEsocialEventTypes.ts     // Tipos
  ├── useEsocialEventUtils.ts     // Funções utilitárias
  ├── useEsocialEventSchema.ts    // Schemas de validação
  └── useEsocialEvent.test.ts     // Testes do hook
```

### Página
```
src/app/empregados/
  ├── page.tsx                    // Página principal
  ├── layout.tsx                  // Layout da página
  ├── loading.tsx                 // Componente de loading
  ├── error.tsx                   // Tratamento de erros
  └── components/                 // Componentes específicos
      ├── EmpregadoList.tsx
      └── EmpregadoFilter.tsx
```

## Boas Práticas

1. **Organização de Código**
   - Manter arquivos pequenos e focados
   - Seguir princípio de responsabilidade única
   - Evitar duplicação de código
   - Usar imports absolutos

2. **Documentação**
   - Manter documentação atualizada
   - Incluir exemplos de uso
   - Documentar decisões importantes
   - Seguir padrão de cabeçalho

3. **Testes**
   - Manter testes próximos ao código
   - Seguir padrão de nomenclatura
   - Incluir casos de teste relevantes
   - Manter cobertura adequada

4. **Versionamento**
   - Seguir padrão de commits
   - Documentar mudanças
   - Manter histórico limpo
   - Usar branches adequadamente 

# Padrão Obrigatório de Grid (Material UI v2)

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

### Exemplo correto:
```jsx
<Grid container columns={12} spacing={2}>
  <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 4' }}>
    ...
  </Grid>
</Grid>
```

### Exemplo proibido:
```jsx
<Grid item xs={12} sm={6} md={4}>...</Grid>
```

### Justificativa
- Garante responsividade, padronização e compatibilidade futura.
- Facilita manutenção e code review.

**Todo PR que não seguir este padrão deve ser rejeitado.** 