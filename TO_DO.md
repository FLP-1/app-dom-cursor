<!--
  Arquivo: TO_DO.md
  Caminho: TO_DO.md
  Criado em: 2025-06-01
  Última atualização: 2025-06-12
  Descrição: Arquivo do projeto.
-->

# TODO List - DOM

## Integração e CI/CD
- [x] Badge de status do build do GitHub Actions adicionado ao README
- [x] Integração com Codecov para cobertura de testes automatizada no pipeline
- [ ] [Opcional] Deploy automático para homologação/produção (aguardando definição do ambiente)
- [ ] [Opcional] Notificações de build (Slack, Discord, Teams ou e-mail)
- [ ] [Opcional] Verificação de segurança automática (Dependabot, pnpm audit)
- [ ] [Opcional] Migrações Prisma automatizadas em staging/produção

## Prioridade Altíssima

### Padronização e Cobertura de Formulários
- [ ] Implementar validações específicas do S-1202
- [ ] Implementar integração com API para S-1202, S-1200, S-1207
- [ ] Criar testes unitários para todos os componentes de formulário (S-1202, S-1200, S-1207)
- [ ] Implementar schemas e componentes de formulário para S-1200 e S-1207
- [ ] Adicionar máscaras nos campos (CPF, CNPJ, datas, etc)
- [ ] Implementar validação de datas
- [ ] Implementar preview do XML nos eventos
- [ ] Garantir que todos os formulários utilizem hooks customizados e prop `control` corretamente
- [ ] Garantir que não há mistura de <FormProvider> e prop `control`

## Prioridade Alta

### Tooltips e Internacionalização
- [ ] Padronizar tooltips nos eventos do eSocial restantes (S1207, S3000, S5001, S5002, S5003, S5011, S5012, S5013, etc)
- [ ] Garantir que todos os campos de todos os eventos estejam cobertos pelo dicionário central
- [ ] Revisão final para garantir ausência de tooltips hardcoded

### Testes Automatizados
- [ ] Ampliar cobertura de testes para outros formulários e fluxos críticos
- [ ] Implementar testes E2E
- [ ] Adicionar testes de performance
- [ ] Garantir mocks adequados para todos componentes do MUI usados em formulários
- [ ] Documentar no README as práticas recomendadas para testes com MUI + Jest + Testing Library

## Prioridade Média

### Organização e Estrutura
- [ ] Dividir arquivos grandes de componentes e hooks conforme padrão (ex: EmpregadorForm, OperacaoFinanceiraForm)
- [ ] Garantir que diretórios como `empregado-domestico` estejam devidamente organizados e não vazios
- [ ] Centralizar e documentar todos os utilitários e tipos
- [ ] Remover qualquer arquivo duplicado, backup ou fora do padrão

### Acessibilidade e Responsividade
- [ ] Revisar todos os formulários e componentes para garantir acessibilidade (labels, aria, etc)
- [ ] Revisar responsividade em mobile e desktop

## Prioridade Baixa

### Documentação
- [ ] Atualizar documentação técnica e guias de uso
- [ ] Documentar processos de deploy
- [ ] Garantir que README e PROJECT_RULES.md estejam atualizados com exemplos reais do projeto

### Melhorias Gerais
- [ ] Implementar cache de dados
- [ ] Adicionar indicadores de carregamento
- [ ] Melhorar feedback de erros
- [ ] Implementar sistema de logs
- [ ] Adicionar documentação de API
- [ ] Otimizar performance
- [ ] Implementar temas

---

## O que já foi feito
- Refatoração dos formulários para uso exclusivo dos componentes reutilizáveis (`FormInput`, `FormSelect`) seguindo o padrão do projeto.
- Implementação de testes automatizados para o formulário de criação de alerta (`src/tests/pages/alerts/novo.test.tsx`) cobrindo:
  - Renderização dos campos
  - Validação de obrigatoriedade
  - Submissão com sucesso
  - Exibição de mensagens de erro
- Criação de mocks para componentes do MUI que causam problemas no ambiente de testes (JSDOM):
  - `TextareaAutosize` (mock global via moduleNameMapper)
  - `TextField` e `Button` (mocks explícitos no início do teste)
- Ajuste do setup do Jest para garantir que funções do navegador como `getComputedStyle` estejam sempre disponíveis e não quebrem os testes.
- Remoção de mocks globais conflitantes para evitar erros de redefinição de propriedades.
- Padronização completa dos tooltips nos principais formulários do sistema.
- Dicionário central de tooltips criado e atualizado para todos os campos desses formulários.
- Todos os campos reutilizáveis desses formulários já recebem a prop `tooltip` do dicionário central.
- Eventos do eSocial já padronizados com tooltips centralizados: S1000, S1200, S1202, S1210, S2200, S2205, S2206, S2210, S2230, S2240, S2250, S2299, S2220, S2235, S2300, S2399, S2400.
- Para todos os eventos acima, todos os campos principais e dinâmicos já possuem tooltip internacionalizável, com as chaves adicionadas ao dicionário central e os componentes atualizados.

---

## Boas Práticas e Processos
- Nunca mantenha arquivos duplicados (nomes iguais, sufixos -copy, -copia, _old, etc) no projeto.
- Centralize componentes e utilitários reutilizáveis.
- Justifique e documente qualquer exceção aprovada pelo time.
- Sempre utilize o dicionário central de tooltips (`src/i18n/tooltips.ts`) para textos de ajuda em campos.
- Nunca escreva tooltips hardcoded nos componentes.

- [ ] Avaliar migração do armazenamento do token de autenticação do localStorage para cookies HTTPOnly para maior segurança e compliance com a LGPD. Isso exigirá ajustes no backend (setar/ler/remover cookie, proteção CSRF) e no frontend (remover uso de localStorage, adaptar fetch/axios para usar cookies).

# Diagnóstico Atual

- [ ] **Revisão de Rotas e Navegação**: Garantir que não há mais redirecionamentos para `/login` (sem `/auth`). Revisar rotas protegidas e permissões.
- [ ] **Padronização e Refatoração**: Garantir uso de hooks customizados e prop `control` em todos os formulários, dividir arquivos grandes, remover duplicidades e centralizar utilitários/tipos.
- [ ] **Acessibilidade e Responsividade**: Revisar todos os formulários e componentes para garantir acessibilidade (labels, aria, roles, navegação por teclado) e responsividade.
- [ ] **Tooltips e Internacionalização**: Garantir que todos os campos estejam cobertos pelo dicionário central de tooltips e remover tooltips hardcoded.
- [ ] **Integração com APIs e Segurança**: Garantir envio correto do token em APIs protegidas, avaliar migração para cookies HTTPOnly, implementar proteção CSRF e tratar erros de autenticação/permissão.
- [ ] **Melhorias Gerais**: Implementar indicadores de carregamento, feedback de erros, otimização de performance, sistema de logs e temas.
- [ ] **Documentação**: Atualizar documentação técnica, guias de uso, processos de deploy e documentação de API/endpoints.

---