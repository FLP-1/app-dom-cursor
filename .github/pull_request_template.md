# Checklist de Pull Request (PR) - Projeto DOM

> Preencha todos os itens antes de solicitar o code review. PRs sem checklist completo podem ser rejeitados.

## UI e Componentização
- [ ] Todos os componentes visuais usam **exclusivamente Material UI (MUI)**
- [ ] Não há uso de componentes de outras bibliotecas de UI (Ant Design, Bootstrap, Chakra, PrimeReact, etc)
- [ ] Não há estilos inline (`style={{ ... }}`) em JSX
- [ ] Todos os estilos customizados usam a prop `sx` do MUI

## Formulários
- [ ] Cada formulário possui seu próprio hook customizado (ex: `useLoginForm`)
- [ ] Toda lógica de submit, validação e integração com API está centralizada no hook
- [ ] Todos os campos reutilizáveis recebem a prop `control` do hook customizado
- [ ] Não há mistura de `<FormProvider>` e prop `control` no mesmo formulário
- [ ] Mensagens de erro e sucesso são padronizadas e internacionalizáveis
- [ ] Testes automatizados cobrem o fluxo do formulário
- [ ] Todos os campos e formulários são acessíveis (labels, aria, etc) e responsivos

## Tipagem e Qualidade
- [ ] Não há uso de `any` (exceto com justificativa documentada)
- [ ] Tipos específicos, `unknown`, type guards, zod/yup são usados para validação runtime
- [ ] ESLint não acusa erros de tipagem ou UI proibida

## Tooltips e Internacionalização
- [ ] Todos os tooltips vêm do dicionário central (`src/i18n/tooltips.ts`), nunca hardcoded
- [ ] O filho do `<Tooltip>` é sempre um elemento que aceita ref (ex: `<span>`)
- [ ] Todos os textos do dicionário estão traduzidos para os idiomas suportados

## Organização e Estrutura
- [ ] Páginas em minúsculo e hífen (kebab-case), componentes em PascalCase
- [ ] Não há arquivos com sufixos de backup ou rascunho (`_old`, `-old`, `Copia`, etc)
- [ ] Estrutura de diretórios clara, arquivos dentro do tamanho ideal

## Banco de Dados
- [ ] Prisma + Postgres são usados
- [ ] Migrations não foram alteradas manualmente
- [ ] Seeds são pequenos, idempotentes e tipados

## Code Review e PR
- [ ] PR segue todas as regras acima
- [ ] Checklist preenchido e revisado
- [ ] Comandos de terminal sugeridos estão explicados e usam PowerShell

## Documentação
- [ ] Todo arquivo de código-fonte novo ou alterado possui cabeçalho de documentação padronizado (nome, caminho, datas, descrição)

## Imports e Gerenciador de Pacotes
- [ ] Todos os imports internos usam o alias `@/` (proibido `../` ou `./` para arquivos dentro de src/)
- [ ] Não há uso de Yarn, pnpm ou arquivos de lock alternativos (apenas `package-lock.json`)

## Duplicidade de Arquivos
- [ ] Não há arquivos duplicados, nomes iguais em diretórios diferentes sem justificativa, nem arquivos com sufixos como `_old`, `-old`, `Copia`, `-copy`, `backup`, etc
- [ ] Componentes, hooks ou utilitários reutilizáveis estão centralizados e não duplicados

## Atualização de Cabeçalho
- [ ] Atualizei o campo `Última atualização:` no cabeçalho de todos os arquivos de código-fonte modificados neste PR, conforme padrão do projeto.

---

> **Observação:** PRs que não seguirem as regras podem ser rejeitados até a adequação. Em caso de dúvida, consulte o README, DOCUMENTACAO.md, project_rules.md ou peça orientação ao time. 