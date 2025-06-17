<!--
  Arquivo: DOCUMENTACAO.md
  Caminho: DOCUMENTACAO.md
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

# Regras de Formulários e Boas Práticas

Este projeto segue as regras detalhadas no arquivo `PROJECT_RULES.md`. Todas as regras são obrigatórias para o time e para a IA. Consulte também o `.cursorrules` para as regras lidas automaticamente pela IA do Cursor.

## Resumo das principais regras
- Sempre use hook customizado para cada formulário (ex: useLoginForm, useCompraForm).
- Todos os campos reutilizáveis DEVEM receber a prop `control` do hook customizado.
- Não misture `<FormProvider>` e prop `control` no mesmo formulário.
- Testes automatizados devem cobrir o fluxo dos formulários.
- Siga o checklist de PRs e corrija qualquer violação antes de submeter.
- O lint do projeto impede uso incorreto de campos reutilizáveis.

Consulte o `PROJECT_RULES.md` para detalhes, exemplos e regras completas.

## Padrão obrigatório
- Sempre use hook customizado para cada formulário (ex: useLoginForm, useCompraForm).
- Todos os campos reutilizáveis DEVEM receber a prop `control` do hook customizado.
- Não misture `<FormProvider>` e prop `control` no mesmo formulário.
- Siga o checklist de PRs e corrija qualquer violação antes de submeter.
- O lint do projeto impede uso incorreto de campos reutilizáveis.

## Padrão obrigatório de Grid (Material UI v2)
- Sempre utilize a prop `columns={12}` no container do Grid.
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

## Checklist de PR (resumido)
- [ ] Campos reutilizáveis recebem prop control?
- [ ] Sem uso misto de contextos?
- [ ] Lógica centralizada no hook?
- [ ] Testes cobrindo o fluxo?

## Exemplo correto
```tsx
const { control } = useLoginForm();
<FormInput name="cpf" control={control} />
```

## Exemplo incorreto
```tsx
<FormInput name="cpf" /> // ERRADO
```

## Comandos de Terminal (PowerShell)
- Sempre que sugerir comandos de terminal, utilize a sintaxe do PowerShell, compatível com Windows.
- Explique o que cada comando faz e relacione ao contexto do projeto.
- Exemplo:
```powershell
Remove-Item -Recurse -Force .next
# Remove a pasta de build do Next.js para forçar uma recompilação limpa
```

## Regras de Tipagem
- É proibido o uso de 'any' em todo o projeto. Utilize tipos específicos ou 'unknown'.
- Exceções só são permitidas em casos extremamente justificados e documentados no próprio código, explicando o motivo da escolha.
- Exemplo de justificativa:
  // Justificativa: integração com biblioteca externa sem tipos disponíveis
  const valor: any = obterValorExterno(); 

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

**Seguindo essas práticas, evitamos erros de validação, retrabalho e garantimos um fluxo de desenvolvimento mais ágil e padronizado para todo o time.**

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

## Padrão obrigatório para ações em tabelas (`TableActions`)

Todo novo módulo que utilize ações em tabela deve obrigatoriamente utilizar o componente `TableActions` seguindo o padrão abaixo:

- As ações devem ser passadas como um array de objetos, cada um contendo:
  - `icon`: ícone do Material UI correspondente à ação
  - `tooltip`: texto do dicionário central de tooltips (`src/i18n/tooltips.ts`), nunca hardcoded
  - `onClick`: função a ser executada ao clicar
  - `ariaLabel`: descrição acessível da ação
  - `disabled`: estado de desabilitado (opcional)
- Todos os tooltips devem ser internacionalizados e centralizados
- Todos os botões devem ser acessíveis (aria-label, foco, etc.)
- O padrão visual deve seguir o tema do Material UI

### Exemplo de uso:
```tsx
<TableActions
  actions={[
    {
      icon: <EditIcon color="primary" />, 
      tooltip: tooltips.editar.pt,
      onClick: () => handleEdit(item),
      disabled: loading,
      ariaLabel: 'Editar item'
    },
    {
      icon: <DeleteIcon color="error" />, 
      tooltip: tooltips.excluir.pt,
      onClick: () => handleDelete(item.id),
      disabled: loading,
      ariaLabel: 'Excluir item'
    }
  ]}
/>
```

> **Atenção:** É proibido usar textos hardcoded em tooltips ou passar ações fora desse padrão. Pull Requests que não seguirem essa diretriz devem ser rejeitados.

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

---

Esse padrão garante padronização visual, acessibilidade, internacionalização e facilita a manutenção do código.

## Padrão obrigatório de UI: apenas Material UI

Todos os componentes visuais do projeto devem ser implementados **exclusivamente** com Material UI (MUI). É proibido o uso de componentes de outras bibliotecas de UI (ex: Ant Design, Bootstrap, Chakra, PrimeReact, etc) ou componentes customizados de UI, exceto se baseados no MUI.

- PRs que incluam componentes visuais não-MUI devem ser rejeitados.
- Sempre consulte a documentação oficial do MUI para customizações e dúvidas.
- Em caso de necessidade de componente customizado, este deve ser construído a partir dos componentes do MUI.

Essa regra garante padronização visual, acessibilidade, manutenção e performance em todo o sistema.

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