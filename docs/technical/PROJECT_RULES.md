<!--
  Arquivo: PROJECT_RULES.md
  Caminho: PROJECT_RULES.md
  Criado em: 2025-06-01
  Última atualização: 2025-06-13
  Descrição: Arquivo do projeto.
-->

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

## 11. Estrutura e Organização
- O sistema é multi-grupo, multi-perfil e multi-parceiro.
- Usuários podem pertencer a vários grupos e ter diferentes papéis.
- Parceiros podem gerenciar múltiplos empregadores.

## 12. Acessibilidade e Responsividade
- Todos os formulários e componentes devem ser acessíveis (labels, aria, etc).
- O layout deve ser responsivo e funcionar bem em mobile e desktop.

## 13. Tema e Estilo
- Sempre use o tema do Material UI (`theme.palette`, `theme.spacing`, etc).
- Não use estilos inline, exceto em casos muito específicos e justificados.
- Padronize o uso de cores, espaçamentos e fontes conforme o tema.

## 14. Documentação e Onboarding
- Consulte sempre o README.md, DOCUMENTACAO.md e este arquivo antes de abrir PR.
- Siga o template de PR e o checklist obrigatório.
- Regras do arquivo `.cursorrules` são obrigatórias para todo o time e para a IA.

## 15. Mensagens e Internacionalização
- Mensagens de erro e sucesso devem ser centralizadas e internacionalizáveis.
- Evite textos soltos no código; use dicionários de mensagens.

## 16. Exemplo correto de formulário
```tsx
const { control, handleSubmit, onSubmit } = useLoginForm();
<form onSubmit={handleSubmit(onSubmit)}>
  <FormInput name="cpf" control={control} ... />
  <PasswordInput name="password" control={control} ... />
</form>
```

## 17. O que NÃO fazer
```tsx
<FormInput name="cpf" /> // ERRADO
<FormProvider {...methods}>
  <FormInput name="cpf" control={methods.control} /> // ERRADO
</FormProvider>
```

## 18. Comandos de Terminal (PowerShell)
- Sempre que sugerir comandos de terminal, utilize a sintaxe do PowerShell, compatível com Windows.
- Explique o que cada comando faz e relacione ao contexto do projeto.
- Exemplo:
```powershell
Remove-Item -Recurse -Force .next
# Remove a pasta de build do Next.js para forçar uma recompilação limpa
```

## 19. Regras de Tipagem
- É proibido o uso de 'any' em todo o projeto. Utilize tipos específicos ou 'unknown'.
- Exceções só são permitidas em casos extremamente justificados e documentados no próprio código, explicando o motivo da escolha.
- Exemplo de justificativa:
  // Justificativa: integração com biblioteca externa sem tipos disponíveis
  const valor: any = obterValorExterno(); 

## Manual de Cadastro de Empregador e Empregado Doméstico

> **Atenção:**
> Todas as regras, campos obrigatórios, opcionais, tooltips e funções permitidas para empregador e empregado doméstico estão detalhadas no manual:
>
> [`/docs/manual-cadastro-domestico.md`](docs/manual-cadastro-domestico.md)
>
> **É obrigatório que todo o time consulte e siga este manual ao implementar ou revisar cadastros relacionados ao eSocial Doméstico.**
>
> Dúvidas ou sugestões devem ser discutidas com o time de produto e arquitetura.

## Tamanho e Organização de Arquivos

### Limites de Tamanho
- Arquivos de código: máximo 400 linhas
- Arquivos de teste: máximo 200 linhas
- Arquivos de configuração: máximo 100 linhas

### Estrutura de Diretórios
```
src/
  ├── components/
  │   └── forms/
  │       └── empregado/
  │           ├── EmpregadoForm.tsx
  │           ├── EmpregadoFormFields.tsx
  │           ├── EmpregadoFormTypes.ts
  │           └── EmpregadoFormUtils.ts
  │
  ├── hooks/
  │   └── esocial/
  │       ├── useEsocialEventForm.ts
  │       ├── useEsocialEventTypes.ts
  │       ├── useEsocialEventUtils.ts
  │       └── useEsocialEventSchema.ts
  │
  └── tests/
      └── components/
          └── form/
              ├── FormInput.test.tsx
              ├── FormInput.snapshot.test.tsx
              └── FormInput.integration.test.tsx
```

### Regras de Divisão
1. **Coesão:**
   - Funções relacionadas devem ficar juntas
   - Separe por responsabilidade
   - Evite acoplamento desnecessário

2. **Nomenclatura:**
   - Use nomes descritivos
   - Mantenha padrão consistente
   - Agrupe por funcionalidade

3. **Estrutura:**
   - Mantenha estrutura clara
   - Use index.ts para exportações
   - Documente a estrutura

### Processo de Code Review
1. **Verificação de Tamanho:**
   - Rejeite PRs com arquivos grandes
   - Sugira divisão quando necessário
   - Verifique coesão

2. **Verificação de Estrutura:**
   - Confirme divisão correta
   - Verifique nomes
   - Confirme documentação

3. **Verificação de Qualidade:**
   - Confirme testes
   - Verifique dependências
   - Confirme sem duplicação

### Exceções
1. **Arquivos de Configuração:**
   - Podem exceder limite
   - Devem ser documentados
   - Dividir por contexto

2. **Arquivos de Migração:**
   - Podem exceder limite
   - Devem ser documentados
   - Dividir por versão

3. **Arquivos de Documentação:**
   - Podem exceder limite
   - Devem ser estruturados
   - Dividir por tópico

## Regra de Duplicidade de Arquivos

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

- O sistema adota dois layouts de navegação:
  - **Menu lateral fixo (Drawer)** para desktop e telas grandes.
  - **Menu inferior fixo (BottomNavigation)** para mobile e telas pequenas, com até 5 módulos principais visíveis.
  - Caso haja mais módulos, o último item do BottomNavigation será "Mais", abrindo um menu lateral ou modal com os módulos extras.
- Os itens do menu são definidos em um único local centralizado, facilitando manutenção e consistência.
- A escolha do layout é feita automaticamente via breakpoints do Material UI.
- Cards do dashboard são sempre clicáveis e levam para os módulos correspondentes.
- Justificativa: esta abordagem segue padrões de mercado (Material UI, Google, Apple), melhora a experiência do usuário e não prejudica a manutenção, pois a lógica dos menus é centralizada.

## 20. Gerenciador de Pacotes
- O projeto utiliza **apenas o npm** como gerenciador de pacotes.
- É proibido utilizar Yarn ou pnpm neste repositório.
- O único arquivo de lock permitido é o `package-lock.json`.
- O campo `packageManager` do `package.json` define a versão recomendada do npm.
- Caso encontre arquivos `yarn.lock` ou `pnpm-lock.yaml`, remova-os imediatamente.

## 21. Padrão obrigatório de Grid (Material UI v2)
- Todo uso do componente Grid do Material UI deve seguir o padrão do Grid v2:
  - Sempre utilize a prop `columns={12}` no container.
  - Substitua as props `xs`, `sm`, `md`, `lg`, `xl` por `gridColumn` no formato objeto:
    ```tsx
    <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 4' }}>...</Grid>
    ```
  - Exemplo de migração:
    Antes:
    ```tsx
    <Grid xs={12} sm={6} md={4}>...</Grid>
    ```
    Depois:
    ```tsx
    <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 4' }}>...</Grid>
    ```
  - O container deve ser:
    ```tsx
    <Grid container columns={12} spacing={2}>...</Grid>
    ```
  - Nunca misture o padrão antigo (`xs`, `sm`, etc.) com o novo (`gridColumn`).
  - Consulte a documentação oficial do MUI Grid v2 para detalhes.

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
- Todo novo módulo que utilize ações em tabela deve obrigatoriamente usar o componente TableActions seguindo o padrão de array de ações, com ícone, tooltip do dicionário central (src/i18n/tooltips.ts), função de clique, ariaLabel e disabled.
- É proibido usar textos hardcoded em tooltips ou passar ações fora desse padrão.
- Todos os tooltips devem ser internacionalizados e centralizados.
- Todos os botões devem ser acessíveis (aria-label, foco, etc.).
- PRs que não seguirem esse padrão devem ser rejeitados.

## Regras obrigatórias de Material UI: estilos e selects

- Utilize sempre a prop `sx` do Material UI para todos os estilos customizados em componentes do MUI.
- É proibido o uso de `style={{ ... }}` (inline style) em componentes React, exceto em casos extremamente justificados e documentados no próprio código.
- Todo campo `select` do Material UI deve utilizar componentes `<MenuItem>` como filhos.
- É proibido usar `<option>` dentro de `<TextField select>`.
- O campo `label` do `TextField` já garante acessibilidade para selects do MUI. Não use `aria-label` se já houver `label` visível.

## Regras obrigatórias de tipagem para componentes de formulário

- Todo componente de formulário reutilizável (ex: FormInput, PasswordInput, Checkbox) deve ser implementado como componente genérico, aceitando o tipo do formulário via parâmetro genérico (ex: <T extends FieldValues>).
- O parâmetro control deve ser tipado como Control<T> para garantir compatibilidade com o hook do formulário e evitar warnings de tipagem.
- Sempre passe explicitamente o tipo do formulário ao usar esses componentes em páginas ou outros componentes (ex: <PasswordInput<LoginForm> ... />).

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