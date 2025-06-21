<!--
  Arquivo: README.md
  Caminho: README.md
  Criado em: 2025-06-01
  Última atualização: 2025-06-13
  Descrição: Arquivo do projeto.
-->

[![CI](https://github.com/${{github.repository}}/actions/workflows/ci.yml/badge.svg)](https://github.com/${{github.repository}}/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/${{github.repository}}/branch/main/graph/badge.svg)](https://codecov.io/gh/${{github.repository}})

# DOM - Sistema de Gestão

Sistema de Gestão de Documentos e Processos com foco em eventos do eSocial.

## 🚀 Tecnologias

- [Next.js 14](https://nextjs.org/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Material UI](https://mui.com/)
- [Prisma](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Jest](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/)

## 📋 Pré-requisitos

- Node.js 18.x ou superior
- PostgreSQL 14.x ou superior
- npm 11.x ou superior

## 🔧 Instalação

1. Clone o repositório:
```powershell
git clone https://github.com/seu-usuario/dom.git
cd dom
```

2. Instale as dependências:
```powershell
npm install
```

3. Configure as variáveis de ambiente:
```powershell
cp .env.example .env
```
Edite o arquivo `.env` com suas configurações.

4. Execute as migrações do banco de dados:
```powershell
npm run prisma migrate dev
```

5. Inicie o servidor de desenvolvimento:
```powershell
npm run dev
```

## 🧪 Testes

```powershell
# Executa todos os testes
npm test

# Executa testes em modo watch
npm run test:watch

# Executa testes com cobertura
npm run test:coverage
```

## 📦 Build

```powershell
# Cria build de produção
npm run build

# Inicia servidor de produção
npm start
```

## 📝 Convenções

- Commits seguem o padrão [Conventional Commits](https://www.conventionalcommits.org/)
- Branches seguem o padrão [Git Flow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)
- Código segue o padrão [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)

## 🤝 Contribuição

1. Faça o fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'feat: add some amazing feature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Autores

- Seu Nome - [@seu-usuario](https://github.com/seu-usuario)

## 📞 Suporte

Para suporte, envie um email para seu-email@exemplo.com ou abra uma issue no GitHub.

## Multi-grupo, Multi-perfil e Multi-parceiro

O sistema permite que um usuário pertença a múltiplos grupos (ex: famílias, empregadores, parceiros) e tenha diferentes papéis em cada grupo (ex: administrador, familiar, empregado). Também é possível que um parceiro (ex: escritório de contabilidade) gerencie vários empregadores.

### Funcionamento
- **Usuário pode pertencer a vários grupos** e ter diferentes permissões em cada um.
- **Empregado pode trabalhar para mais de um grupo**.
- **Parceiro pode gerenciar múltiplos empregadores**.
- Após o login, se o usuário tiver mais de um grupo, ele deve escolher em qual grupo deseja atuar (página `/selecionar-grupo`).
- As permissões e funcionalidades disponíveis dependem do papel do usuário no grupo selecionado.

### Exemplo de Fluxo
1. Usuário faz login normalmente.
2. Se possuir múltiplos grupos, é direcionado para a página de seleção de grupo.
3. Após escolher o grupo, o sistema carrega as permissões e dados referentes àquele grupo.

### Modelagem no Prisma
Veja o arquivo `prisma/schema.prisma` para detalhes das tabelas `UserGroup`, `Group`, `Partner` e `UserPartner`.

---

### Diretriz de Navegação (Next.js)
> **Sempre utilize o componente `Link` do Next.js (`next/link`) para navegação entre páginas.**
> Não utilize `react-router-dom` neste projeto, pois o roteamento é gerenciado pelo Next.js.
> Exemplo:
> ```tsx
> import Link from 'next/link';
> <Link href="/pagina">Ir para página</Link>
> ```

---

### Nomenclatura de Arquivos
> - **Páginas:** sempre em minúsculo e com hífen (`kebab-case`). Ex: `compras/index.tsx`, `compras/nova.tsx`, `login-old-validada.tsx`.
> - **Componentes:** sempre em PascalCase. Ex: `CompraList.tsx`, `CompraHeader.tsx`.
> - **Nunca use espaços, acentos, caracteres especiais ou letras maiúsculas em nomes de arquivos de página.**
> - **Exemplos válidos:** `compras/index.tsx`, `selecionar-grupo.tsx`, `CompraList.tsx`.
> - **Exemplos inválidos:** `Compras/Index.tsx`, `login Copia.tsx`, `compra_nova.tsx`, `compraçãõ.tsx`.

---

### Arquivos de Backup e Versões Antigas
> **Nunca analise, modifique ou utilize arquivos com sufixos como `_old`, `-old`, `Copia`, `-copia`, `-cópia`, `-copy` ou similares.**
> Esses arquivos são versões antigas, backups ou rascunhos e não fazem parte do código-fonte ativo do sistema.

## Padrão de Formulários com Hooks Customizados

Para garantir organização, escalabilidade e manutenção facilitada, cada formulário do projeto deve possuir seu próprio hook customizado, que encapsula toda a lógica de validação, submit e integração com APIs/contextos.

### Exemplo de uso

```tsx
// No hook customizado (ex: useCadastroForm)
const { control, handleSubmit, onSubmit } = useCadastroForm();

// No componente de página
<form onSubmit={handleSubmit(onSubmit)}>
  <FormInput name="email" control={control} label="E-mail" />
  {/* outros campos */}
</form>
```

Veja o template em `src/hooks/forms/useFormTemplate.ts`.

### Checklist para Pull Requests
- [ ] O formulário possui um hook customizado?
- [ ] A lógica de validação e submit está no hook?
- [ ] Campos reutilizáveis não possuem lógica de formulário?
- [ ] O padrão está documentado no README?
- [ ] Testes foram ajustados para consumir o hook?

## Regras do Projeto

Este projeto segue regras rígidas de padronização para garantir qualidade, escalabilidade e facilidade de manutenção. **Todas as regras são obrigatórias para o time e para a IA.**

- Consulte sempre o arquivo `PROJECT_RULES.md` para as regras detalhadas e exemplos.
- As regras também estão presentes no arquivo `.cursorrules`, lido automaticamente pela IA do Cursor.
- O checklist de PR e a documentação técnica reforçam essas diretrizes.

> **Resumo das principais regras:**
> - Sempre use hook customizado para cada formulário.
> - Todos os campos reutilizáveis DEVEM receber a prop `control` do hook customizado.
> - É proibido misturar `<FormProvider>` e prop `control` no mesmo formulário.
> - Use sempre Prisma + Postgres e nunca altere migrations manualmente.
> - Navegação apenas com `next/link`.
> - Nunca use arquivos de backup ou rascunho.
> - Siga o padrão de nomenclatura e tema do Material UI.
> - Consulte o checklist de PR antes de submeter qualquer alteração.

Consulte o `PROJECT_RULES.md` para detalhes, exemplos e regras completas.

---

### Comandos de Terminal (PowerShell)
> Sempre que sugerir comandos de terminal, utilize a sintaxe do PowerShell, compatível com Windows. Explique o que cada comando faz e relacione ao contexto do projeto. Exemplo:
> ```powershell
> Remove-Item -Recurse -Force .next
> # Remove a pasta de build do Next.js para forçar uma recompilação limpa
> ``` 

## Regras de Tipagem
- É proibido o uso de 'any' em todo o projeto. Utilize tipos específicos ou 'unknown'.
- Exceções só são permitidas em casos extremamente justificados e documentados no próprio código, explicando o motivo da escolha.
- Exemplo de justificativa:
  // Justificativa: integração com biblioteca externa sem tipos disponíveis
  const valor: any = obterValorExterno(); 

### Mecanismos de Controle de Tipagem
Para garantir a qualidade e segurança do código, implementamos os seguintes mecanismos:

1. **Configuração do ESLint**
   ```json
   {
     "rules": {
       "@typescript-eslint/no-explicit-any": "error"
     }
   }
   ```

2. **TypeScript Strict Mode**
   ```json
   {
     "compilerOptions": {
       "strict": true,
       "noImplicitAny": true,
       "strictNullChecks": true
     }
   }
   ```

3. **Validação de Tipos em Runtime**
   - Use Zod ou Yup para validação de dados
   - Implemente type guards para validação de tipos
   - Documente interfaces e tipos em arquivos .d.ts

4. **Processo de Code Review**
   - PRs com 'any' serão rejeitados sem justificativa documentada
   - Testes de tipo são obrigatórios
   - CI/CD verifica cobertura de tipos
   - Exceções são registradas e revisadas periodicamente

5. **Boas Práticas**
   - Crie interfaces para todas as estruturas de dados
   - Use tipos genéricos para funções reutilizáveis
   - Implemente testes de tipo com `tsc --noEmit`
   - Mantenha documentação de tipos atualizada

### Exemplos de Tipagem Correta

```typescript
// ❌ Errado
const dados: any = obterDados();

// ✅ Correto
interface Dados {
  id: number;
  nome: string;
  data: Date;
}
const dados: Dados = obterDados();

// ✅ Com validação em runtime
import { z } from 'zod';

const DadosSchema = z.object({
  id: z.number(),
  nome: z.string(),
  data: z.date()
});

const dados = DadosSchema.parse(obterDados());
```

## Manual de Cadastro de Empregador e Empregado Doméstico

> **Atenção:**
> Todas as regras, campos obrigatórios, opcionais, tooltips e funções permitidas para empregador e empregado doméstico estão detalhadas no manual:
>
> [`/docs/manual-cadastro-domestico.md`](docs/manual-cadastro-domestico.md)
>
> **É obrigatório que todo o time consulte e siga este manual ao implementar ou revisar cadastros relacionados ao eSocial Doméstico.**
>
> Dúvidas ou sugestões devem ser discutidas com o time de produto e arquitetura. 

# DOM - Documentação e Organização de Materiais

## Regras de Desenvolvimento

### Tamanho e Organização de Arquivos

#### Tamanho Ideal
- Arquivos de código: 200-400 linhas
- Arquivos de teste: 100-200 linhas
- Arquivos de configuração: 50-100 linhas

#### Divisão de Arquivos
Arquivos que excedam o tamanho ideal devem ser divididos seguindo estas regras:

1. **Por Responsabilidade:**
   - Componente principal
   - Campos do formulário
   - Tipos e interfaces
   - Funções utilitárias

2. **Por Funcionalidade:**
   - Hook principal
   - Tipos
   - Funções utilitárias
   - Schemas de validação

3. **Por Contexto:**
   - Testes unitários
   - Testes de snapshot
   - Testes de integração

#### Benefícios
- Melhor manutenibilidade
- Maior testabilidade
- Maior reusabilidade
- Melhor performance

#### Processo de Code Review
- Verificação de tamanho
- Verificação de estrutura
- Verificação de qualidade

#### Exceções
- Arquivos de configuração
- Arquivos de migração
- Arquivos de documentação

Para mais detalhes, consulte o arquivo `.cursorrules`. 

## Padrão de Imports

- Sempre utilize o alias `@/` para importar arquivos dentro da pasta `src/`.
- Exemplo: `import { MeuComponente } from '@/components/MeuComponente'`
- Não utilize caminhos relativos como `../` ou `./` para arquivos dentro de `src/`.
- O `tsconfig.json` já está configurado com `baseUrl` e `paths` para suportar esse padrão. 

## Regras de Duplicidade de Arquivos

- É proibido manter arquivos duplicados no projeto, incluindo:
  - Arquivos com nomes iguais em diretórios diferentes sem justificativa técnica clara.
  - Arquivos com sufixos como _old, -old, Copia, -copia, -copy, backup, etc.
  - Componentes, hooks ou utilitários que tenham a mesma responsabilidade em múltiplos lugares.
- Todo código duplicado deve ser centralizado e referenciado por import único.
- Pull Requests com duplicidade serão rejeitados.
- Justificativas para exceções devem ser documentadas no próprio código e aprovadas pelo time. 

## Regra de Tooltips Explicativos

- Todos os campos de input/output DEVEM possuir tooltips explicativos.
- O texto dos tooltips deve ser retirado do dicionário central de mensagens (`src/i18n/tooltips.ts`), nunca hardcoded.
- O dicionário deve ser internacionalizável e versionado.
- Tooltips devem ser acessíveis (aria-label, aria-describedby, etc).
- Campos obrigatórios devem indicar o motivo/exemplo no tooltip.
- PRs sem tooltips serão rejeitados, salvo exceção justificada. 

## Padrão de Navegação Responsiva

- Menu lateral fixo (Drawer) para desktop e telas grandes.
- Menu inferior fixo (BottomNavigation) para mobile, com até 5 módulos principais e overflow via 'Mais'.
- Itens do menu centralizados em um único arquivo/config.
- Cards do dashboard sempre clicáveis.
- Justificativa: padrão de mercado, melhor experiência e fácil manutenção. 

## 📝 Padronização do Gerenciador de Pacotes

> Este projeto utiliza **apenas o npm** como gerenciador de pacotes. Não utilize Yarn ou pnpm.
> O arquivo `package-lock.json` deve ser o único arquivo de lock presente no repositório.
> Caso encontre arquivos `yarn.lock` ou `pnpm-lock.yaml`, remova-os imediatamente.
> A versão recomendada do npm está definida no campo `packageManager` do `package.json`.

### Comando para remover locks antigos (PowerShell):
```powershell
Remove-Item yarn.lock -ErrorAction SilentlyContinue
Remove-Item pnpm-lock.yaml -ErrorAction SilentlyContinue
``` 

---

## Boas Práticas para Uso do Prisma, Seeds e Validação de Modelos

### 1. Alteração de Modelos (schema.prisma)
- Sempre edite o arquivo `prisma/schema.prisma` para criar, alterar ou remover campos/tabelas.
- Após qualquer alteração, execute:
  - `npx prisma migrate dev` — para aplicar as migrations no banco de dados.
  - `npx prisma generate` — para atualizar os tipos do Prisma Client.

### 2. Criação e Execução de Seeds
- Antes de criar ou alterar seeds, consulte o modelo no `schema.prisma` e utilize o autocomplete do Prisma Client no seu editor.
- No seed, **NUNCA** inclua campos que não existem no modelo Prisma.
- Utilize apenas os campos obrigatórios e opcionais definidos no modelo.
- Seeds devem ser pequenos, testáveis e idempotentes (podem ser rodados mais de uma vez sem corromper dados).

### 3. Validação e Debug
- Utilize o autocomplete do Prisma Client para garantir que está usando apenas campos válidos.
- Em caso de erro ao rodar o seed, leia atentamente a mensagem do Prisma — geralmente ela indica o campo inválido ou ausente.
- Utilize o Prisma Studio (`npx prisma studio`) para inspecionar os dados e modelos de forma visual.
- Adicione logs no seed para facilitar a identificação de onde ocorreu o erro.

### 4. Checklist Rápido
- [ ] Alterou o schema? Rode `npx prisma migrate dev` e `npx prisma generate`.
- [ ] Conferiu os campos do modelo antes de criar registros no seed?
- [ ] Usou o autocomplete do Prisma Client?
- [ ] Testou o seed em um banco de dados de desenvolvimento/limpo?
- [ ] Validou os dados no Prisma Studio?

### 5. Dicas Extras
- Seeds e scripts de banco devem ser escritos em TypeScript, aproveitando a tipagem do Prisma.
- Evite hardcode de campos dinâmicos; utilize tipos e interfaces.
- Documente erros comuns e soluções neste arquivo para consulta futura do time.

---

**Seguindo essas práticas, evitamos erros de validação, retrabalho e garantimos um fluxo de desenvolvimento mais ágil e padronizado para todo o time.** 

---

### Padrão obrigatório de Grid (Material UI v2)
> **Atenção:**
> A partir de 2024, todo uso do componente Grid do Material UI deve seguir o padrão do Grid v2:
> - Sempre utilize a prop `columns={12}` no container para garantir a lógica de 12 colunas.
> - Substitua as props `xs`, `sm`, `md`, `lg`, `xl` por `gridColumn` no formato objeto:
>   ```tsx
>   <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 4' }}>...</Grid>
>   ```
> - Exemplo de migração:
>   Antes:
>   ```tsx
>   <Grid xs={12} sm={6} md={4}>...</Grid>
>   ```
>   Depois:
>   ```tsx
>   <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 4' }}>...</Grid>
>   ```
> - O container deve ser:
>   ```tsx
>   <Grid container columns={12} spacing={2}>...</Grid>
>   ```
> - Nunca misture o padrão antigo (`xs`, `sm`, etc.) com o novo (`gridColumn`).
> - Revise a [documentação oficial do MUI Grid v2](https://mui.com/material-ui/react-grid/#migrating-from-v1) para detalhes.

--- 

## Regras obrigatórias de UI e Integração

### Grid Material UI v2
- É obrigatório utilizar apenas o padrão Grid v2 do Material UI.
- É proibido o uso das props antigas (`item`, `xs`, `sm`, etc.).
- Sempre utilize `<Grid container columns={12}>` para containers e `gridColumn={{ xs: 'span 12', ... }}` para itens.
- Consulte a documentação oficial do MUI Grid v2 para detalhes.

### Selects (Campos de Seleção)
- Todo campo select deve ser inicializado com um valor válido (ex: `''` para "Todos" ou o primeiro valor da lista).
- Nunca inicialize selects com `undefined`.
- Sempre inclua uma opção "Todos" ou equivalente, se aplicável.
- Garanta que o valor inicial do formulário nunca seja `undefined` para selects.

### Uso correto do Tooltip do MUI
- Sempre envolva o componente filho do `<Tooltip>` em um elemento que aceite refs e props, como `<span>`, quando necessário.
- Nunca envolva diretamente componentes que não aceitam refs (ex: `<DatePicker>`, `<ButtonGroup>`, etc.) com `<Tooltip>`.
- O texto do tooltip deve ser retirado do dicionário central de mensagens.

### Autenticação e tratamento de erros de API
- Toda chamada de API protegida deve garantir que o token de autenticação está presente e válido.
- Trate erros 401/403 exibindo mensagens amigáveis e orientando o usuário a fazer login novamente.
- Nunca exponha detalhes sensíveis de erro para o usuário final.

### Observação
Essas regras são obrigatórias para todo o time e para a IA. Pull Requests que não seguirem essas diretrizes devem ser rejeitados até a adequação. 

### Tooltips e Internacionalização

- Todo campo de formulário ou componente que exiba tooltip deve obrigatoriamente utilizar o dicionário central de tooltips (`src/i18n/tooltips.ts`).
- É proibido usar textos hardcoded em `title`, `tooltip` ou diretamente em `<Tooltip>`.
- Sempre que criar um novo campo ou formulário, adicione a chave correspondente no dicionário central de tooltips e utilize a prop `tooltip={tooltips.campo.pt}`.
- Antes de aprovar um PR, revise se todos os tooltips estão centralizados e internacionalizados. Busque por `title=", `tooltip=", ou textos hardcoded.
- Todos os textos do dicionário central de tooltips devem estar traduzidos para os idiomas suportados pelo sistema. 

### Tooltips em Componentes Reutilizáveis

- Todo componente reutilizável que aceite prop de tooltip (ex: `tooltip` em `BadgeIcon`, `IconButton`, etc.) deve aceitar **apenas textos vindos do dicionário central de tooltips** (`src/i18n/tooltips.ts`).
- É proibido passar texto hardcoded diretamente para tooltips nesses componentes.
- Sempre documente na interface/prop do componente que o valor deve vir do dicionário central.
- Pull Requests que não seguirem essa regra devem ser rejeitados. 

## Padrão obrigatório para ações em tabelas

Todo novo módulo que utilize ações em tabela deve obrigatoriamente seguir o padrão do componente `TableActions` (detalhado na DOCUMENTACAO.md). As ações devem ser passadas como array, com ícone, tooltip do dicionário central, função de clique, ariaLabel e estado de disabled. Tooltips devem ser sempre internacionalizados e centralizados. Veja exemplos e regras completas na seção específica da DOCUMENTACAO.md.

> PRs que não seguirem esse padrão serão rejeitados. 

## Regra obrigatória de cabeçalho de documentação em arquivos

Todo arquivo de código-fonte (.ts, .tsx, .js, .jsx, .mjs, .css, .scss, .html, .md) deve conter, no topo, um cabeçalho de documentação com as seguintes informações:

- Nome do arquivo com extensão
- Caminho relativo ao projeto
- Data de criação
- Data da última atualização
- Breve descrição do propósito/função do arquivo

**Exemplo de cabeçalho:**

```typescript
/**
 * Arquivo: EmpregadorForm.tsx
 * Caminho: src/components/forms/empregador/EmpregadorForm.tsx
 * Criado em: 2024-06-07
 * Última atualização: 2024-06-07
 * Descrição: Componente React de formulário adaptativo para cadastro de empregador, com modo simplificado e complementar.
 */
```

Essa regra é obrigatória para todo o time e para a IA. Pull Requests sem o cabeçalho padronizado serão rejeitados. 

## Regras obrigatórias de Material UI: estilos e selects

1. **Estilos**
   - É obrigatório utilizar a prop `sx` do Material UI para todos os estilos customizados em componentes do MUI.
   - É proibido o uso de `style={{ ... }}` (inline style) em componentes React, exceto em casos extremamente justificados e documentados no próprio código.
   - Exemplo correto:
     ```tsx
     <Box sx={{ backgroundColor: 'background.paper', borderRadius: 2, p: 3 }}>
       {/* ... */}
     </Box>
     ```
   - Exemplo incorreto:
     ```tsx
     <div style={{ background: '#fff', borderRadius: 10, padding: 24 }}>
       {/* ... */}
     </div>
     ```

2. **Selects**
   - Todo campo `select` do Material UI deve utilizar componentes `<MenuItem>` como filhos.
   - É proibido usar `<option>` dentro de `<TextField select>`.
   - Exemplo correto:
     ```tsx
     <TextField select label="Status" value={status}>
       <MenuItem value="ativo">Ativo</MenuItem>
       <MenuItem value="inativo">Inativo</MenuItem>
     </TextField>
     ```
   - Exemplo incorreto:
     ```tsx
     <TextField select label="Status" value={status}>
       <option value="ativo">Ativo</option>
       <option value="inativo">Inativo</option>
     </TextField>
     ```

3. **Acessibilidade**
   - O campo `label` do `TextField` já garante acessibilidade para selects do MUI.
   - É redundante adicionar `aria-label` em selects do Material UI quando o `label` já está presente.
   - Só adicione `aria-label` se o campo não tiver `label` visível.

## Regras obrigatórias de tipagem para componentes de formulário

- Todo componente de formulário reutilizável (ex: FormInput, PasswordInput, Checkbox) deve ser implementado como componente genérico, aceitando o tipo do formulário via parâmetro genérico (ex: <T extends FieldValues>).
- O parâmetro control deve ser tipado como Control<T> para garantir compatibilidade com o hook do formulário e evitar warnings de tipagem.
- Sempre passe explicitamente o tipo do formulário ao usar esses componentes em páginas ou outros componentes (ex: <PasswordInput<LoginForm> ... />).
- Exemplo correto:
  ```tsx
  <PasswordInput<LoginForm>
    name="password"
    control={control}
    ...
  />
  ```
- Exemplo de implementação:
  ```tsx
  export const PasswordInput = <T extends FieldValues = FieldValues>(props: PasswordInputProps<T>) => { ... }
  ```

## Padrão obrigatório de UI: apenas Material UI

Todos os componentes visuais do projeto devem ser implementados **exclusivamente** com Material UI (MUI). É proibido o uso de componentes de outras bibliotecas de UI (ex: Ant Design, Bootstrap, Chakra, PrimeReact, etc) ou componentes customizados de UI, exceto se baseados no MUI.

- PRs que incluam componentes visuais não-MUI devem ser rejeitados.
- Sempre consulte a documentação oficial do MUI para customizações e dúvidas.
- Em caso de necessidade de componente customizado, este deve ser construído a partir dos componentes do MUI.

Essa regra garante padronização visual, acessibilidade, manutenção e performance em todo o sistema.

# Regras Gerais do Projeto DOM

## 1. Padrão de UI: Material UI
- Todos os componentes visuais devem ser implementados exclusivamente com Material UI (MUI).
- É proibido o uso de componentes de outras bibliotecas de UI (ex: Ant Design, Bootstrap, Chakra, PrimeReact, etc) ou componentes customizados de UI, exceto se baseados no MUI.
- PRs que incluam componentes visuais não-MUI devem ser rejeitados.
- Consulte sempre a documentação oficial do MUI para customizações e dúvidas.

## 2. Formulários
- Cada formulário deve ter seu próprio hook customizado (ex: useLoginForm).
- Toda lógica de submit, validação e integração com API deve estar centralizada no hook.
- Campos reutilizáveis DEVEM receber a prop `control` do hook customizado.
- É proibido misturar <FormProvider> e prop `control` no mesmo formulário.
- Mensagens de erro e sucesso devem ser padronizadas, amigáveis e internacionalizáveis, sempre usando o dicionário central.
- Testes automatizados devem cobrir o fluxo dos formulários.
- Todos os campos e formulários devem ser acessíveis (labels, aria, etc) e responsivos.

## 3. Navegação
- Sempre use o componente Link do Next.js (next/link) para navegação.
- É proibido usar react-router-dom.

## 4. Nomenclatura e Organização
- Páginas: minúsculo e hífen (kebab-case).
- Componentes: PascalCase.
- Nunca use arquivos com sufixos de backup ou rascunho (_old, -old, Copia, etc).
- Estrutura de diretórios clara, com divisão por responsabilidade e tamanho ideal de arquivos (código: 200-400 linhas, teste: 100-200, config: 50-100).

## 5. Banco de Dados
- Use sempre Prisma + Postgres.
- Não altere migrations manualmente.
- Seeds devem ser pequenos, idempotentes e tipados.

## 6. Tipagem
- É proibido o uso de any (exceto com justificativa documentada).
- Use tipos específicos, unknown, type guards, zod/yup para validação runtime.
- Configure o ESLint para rejeitar any e use TypeScript strict mode.

## 7. Estilo e Tema
- Sempre use o tema do Material UI (theme.palette, theme.spacing, etc).
- Não use estilos inline, exceto em casos justificados e documentados.
- Padronize cores, espaçamentos e fontes conforme o tema.

## 8. Tooltips e Internacionalização
- Tooltips devem ser retirados do dicionário central (src/i18n/tooltips.ts), nunca hardcoded.
- Sempre envolver o filho do <Tooltip> em um elemento que aceite ref (ex: <span>).
- Todos os textos do dicionário devem estar traduzidos para os idiomas suportados.

## 9. Code Review e PR
- PRs devem seguir todas as regras acima.
- Checklist obrigatório de PR.
- Rejeite PRs que violem qualquer regra.
- Explique comandos de terminal sugeridos, sempre em PowerShell.

## 10. ESLint
- Bloqueie imports de bibliotecas de UI que não sejam Material UI.
- Rejeite uso de any e estilos inline.

## 11. Cabeçalho de Documentação Obrigatório
- Todo arquivo de código-fonte (.ts, .tsx, .js, .jsx, .mjs, .css, .scss, .html, .md) deve conter, no topo, um cabeçalho de documentação com as seguintes informações:
  - Nome do arquivo com extensão
  - Caminho relativo ao projeto
  - Data de criação
  - Data da última atualização
  - Breve descrição do propósito/função do arquivo
- Exemplo de cabeçalho:
```typescript
/**
 * Arquivo: EmpregadorForm.tsx
 * Caminho: src/components/forms/empregador/EmpregadorForm.tsx
 * Criado em: 2024-06-07
 * Última atualização: 2024-06-07
 * Descrição: Componente React de formulário adaptativo para cadastro de empregador, com modo simplificado e complementar.
 */
```
- PRs sem o cabeçalho padronizado devem ser rejeitados.

## 12. Imports Internos
- Todos os imports de arquivos dentro de src/ DEVEM usar o alias '@/'. Caminhos relativos como '../' ou './' são proibidos para arquivos dentro de src/.
- O tsconfig.json já está configurado com baseUrl e paths para suportar esse padrão.

## 13. Gerenciador de Pacotes
- O projeto utiliza **apenas o npm** como gerenciador de pacotes.
- É proibido utilizar Yarn ou pnpm neste repositório.
- O único arquivo de lock permitido é o package-lock.json.
- Caso encontre arquivos yarn.lock ou pnpm-lock.yaml, remova-os imediatamente.

## 14. Duplicidade de Arquivos
- É proibido manter arquivos duplicados no projeto, incluindo:
  - Arquivos com nomes iguais em diretórios diferentes sem justificativa técnica clara.
  - Arquivos com sufixos como _old, -old, Copia, -copia, -copy, backup, etc.
  - Componentes, hooks ou utilitários que tenham a mesma responsabilidade em múltiplos lugares.
- Todo código duplicado deve ser centralizado e referenciado por import único.
- Pull Requests com duplicidade serão rejeitados.
- Justificativas para exceções devem ser documentadas no próprio código e aprovadas pelo time.

## Regra obrigatória de atualização de data no cabeçalho

Sempre que qualquer alteração for realizada em um arquivo de código-fonte, a data da última atualização deve ser atualizada no cabeçalho do arquivo.

- O campo `Última atualização:` deve refletir a data da última modificação relevante no arquivo.
- O formato deve ser: `Última atualização: yyyy-mm-dd`
- Não é necessário alterar a data de criação (`Criado em:`), apenas a de atualização.
- Essa atualização é obrigatória para todos os arquivos `.ts`, `.tsx`, `.js`, `.jsx`, `.mjs`, `.css`, `.scss`, `.html` e `.md`.
- Pull Requests que não atualizarem a data de última atualização no cabeçalho dos arquivos modificados devem ser rejeitados.

**Exemplo de cabeçalho:**
```typescript
/**
 * Arquivo: MeuComponente.tsx
 * Caminho: src/components/MeuComponente.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-10
 * Descrição: Componente React para exibir informações do usuário.
 */
```