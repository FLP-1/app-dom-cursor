# To Do - Melhorias e Dinamização do Dashboard DOM

## 1. Dashboard Dinâmico com Dados Reais

### Objetivo
Substituir os dados mockados do dashboard por informações reais vindas das tabelas do banco de dados (Postgres via Prisma).

### Tarefas
- [ ] Refatorar o endpoint `src/pages/api/dashboard/index.ts` para:
  - [ ] Buscar o total de pontos registrados (tabela de ponto/timeRecord)
  - [ ] Buscar o total de documentos (tabela de documentos)
  - [ ] Buscar o total de tarefas ativas/concluídas (tabela de tarefas)
  - [ ] Buscar o total de compras pendentes (tabela de compras)
  - [ ] Buscar atividades recentes reais (últimos registros de ponto, documentos, tarefas, etc)
  - [ ] Buscar progresso mensal (ex: % de tarefas concluídas no mês, pontos registrados, etc)
  - [ ] Buscar mensagens rápidas reais (ex: últimas mensagens do chat ou notificações)
- [ ] Montar o objeto de resposta do dashboard com os dados reais
- [ ] Garantir que o endpoint só retorne dados se o usuário estiver autenticado (token JWT)
- [ ] Adicionar tratamento de erros e loading adequado

### Exemplo de Queries (Prisma)
```ts
const totalPontos = await prisma.timeRecord.count({ where: { userId } });
const totalDocumentos = await prisma.document.count({ where: { userId } });
const tarefasAtivas = await prisma.task.count({ where: { status: 'PENDING', userId } });
// ... demais queries
```

---

## 2. Melhorias de Segurança e UX
- [ ] Garantir que todas as requisições do dashboard enviem o token JWT no header Authorization
- [ ] Redirecionar para login caso o token esteja ausente ou inválido
- [ ] Adicionar fallback seguro para todas as leituras de mensagens e dados

---

## 3. Internacionalização
- [ ] Garantir que todos os textos do dashboard estejam no dicionário central de mensagens
- [ ] Adicionar chaves faltantes no arquivo `dashboard.messages.ts` se necessário

---

## 4. Testes
- [ ] Criar testes automatizados para o fluxo do dashboard dinâmico
- [ ] Testar cenários de erro (sem dados, sem autenticação, etc)

---

## 5. Refino Visual
- [ ] Ajustar responsividade e layout dos cards para diferentes tamanhos de tela
- [ ] Garantir acessibilidade (labels, aria, contraste)

---

## 6. Outras Melhorias Futuras
- [ ] Permitir filtros dinâmicos no dashboard (por período, status, etc)
- [ ] Adicionar gráficos dinâmicos com dados reais
- [ ] Permitir customização dos widgets do dashboard por perfil de usuário

---

**Responsável:** [Preencher]
**Data de criação:** 2025-06-13 