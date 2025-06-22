# Sistema de Mensagens Centralizadas - DOM

## Status Atual do Projeto

### ✅ Implementado

#### 1. Arquivos de Mensagens Centralizadas
- ✅ `alert.messages.ts` - Mensagens para módulo de alertas
- ✅ `tarefa.messages.ts` - Mensagens para módulo de tarefas
- ✅ `document.messages.ts` - Mensagens para módulo de documentos
- ✅ `ponto.messages.ts` - Mensagens para módulo de ponto eletrônico
- ✅ `financeiro.messages.ts` - Mensagens para módulo financeiro
- ✅ `dashboard.messages.ts` - Mensagens para dashboard
- ✅ `familia.messages.ts` - Mensagens para módulo de família
- ✅ `auth.messages.ts` - Mensagens para autenticação
- ✅ `index.ts` - Arquivo de exportação centralizada

#### 2. Componentes Refatorados
- ✅ `src/pages/tarefas/index.tsx` - Página principal de tarefas
- ✅ `src/components/tarefas/TarefaFilter.tsx` - Filtros de tarefas
- ✅ `src/components/tarefas/TarefaList.tsx` - Lista de tarefas
- ✅ `src/components/documents/DocumentHeader.tsx` - Cabeçalho de documentos
- ✅ `src/components/documents/DocumentUploadModal.tsx` - Modal de upload
- ✅ `src/components/ponto/PontoFilter.tsx` - Filtros de ponto
- ✅ `src/components/ponto/PontoList.tsx` - Lista de ponto
- ✅ `src/components/operacoes-financeiras/OperacaoFinanceiraList.tsx` - Lista financeira
- ✅ `src/components/operacoes-financeiras/RegistrarPagamentoDialog.tsx` - Dialog de pagamento
- ✅ `src/components/operacoes-financeiras/RejeitarOperacaoDialog.tsx` - Dialog de rejeição
- ✅ `src/components/PhoneVerification.tsx` - Verificação de telefone
- ✅ `src/components/empregador/FormEmpregador.tsx` - Formulário de empregador

#### 3. Infraestrutura de Internacionalização
- ✅ `src/contexts/LanguageContext.tsx` - Contexto de idioma dinâmico
- ✅ `src/components/common/LanguageSelector.tsx` - Seletor de idioma
- ✅ `src/hooks/useMessages.ts` - Hook personalizado para mensagens

### 🔄 Em Andamento

#### Componentes Pendentes de Refatoração
- 🔄 Componentes de formulários de entrada (FormInput, FormSelect, etc.)
- 🔄 Componentes de layout e navegação
- 🔄 Componentes de dashboard e relatórios
- 🔄 Componentes de configurações e perfil
- 🔄 Componentes de comunicação e chat

### 📋 Próximos Passos

#### 1. Refatoração de Componentes Restantes (Prioridade Alta)
```bash
# Componentes de formulários
src/components/forms/inputs/FormInput.tsx
src/components/forms/inputs/FormSelect.tsx
src/components/forms/inputs/FormDatePicker.tsx
src/components/forms/inputs/CheckboxField.tsx
src/components/forms/inputs/PasswordInput.tsx

# Componentes de layout
src/components/layout/Header.tsx
src/components/layout/Sidebar.tsx
src/components/layout/Footer.tsx

# Componentes de dashboard
src/components/dashboard/DashboardCard.tsx
src/components/dashboard/StatCard.tsx
src/components/dashboard/ChartComponent.tsx
```

#### 2. Implementação do Contexto de Idioma (Prioridade Alta)
```typescript
// Integrar o LanguageProvider no _app.tsx
import { LanguageProvider } from '@/contexts/LanguageContext';

function MyApp({ Component, pageProps }) {
  return (
    <LanguageProvider defaultLanguage="pt">
      <Component {...pageProps} />
    </LanguageProvider>
  );
}
```

#### 3. Testes Automatizados (Prioridade Média)
```bash
# Criar testes para o sistema de mensagens
src/tests/i18n/messages.test.ts
src/tests/contexts/LanguageContext.test.tsx
src/tests/hooks/useMessages.test.ts

# Criar testes para componentes refatorados
src/tests/components/tarefas/TarefaList.test.tsx
src/tests/components/ponto/PontoFilter.test.tsx
```

#### 4. Documentação e Guias (Prioridade Média)
- 📝 Guia de uso do sistema de mensagens
- 📝 Padrões de nomenclatura para chaves de mensagens
- 📝 Processo de adição de novos idiomas
- 📝 Checklist para refatoração de componentes

#### 5. Otimizações e Melhorias (Prioridade Baixa)
- ⚡ Lazy loading de mensagens por módulo
- ⚡ Cache de mensagens no localStorage
- ⚡ Detecção automática de idioma do navegador
- ⚡ Suporte a mais idiomas (espanhol, francês)

## Estrutura de Arquivos

```
src/i18n/messages/
├── alert.messages.ts          # Mensagens de alertas
├── tarefa.messages.ts         # Mensagens de tarefas
├── document.messages.ts       # Mensagens de documentos
├── ponto.messages.ts          # Mensagens de ponto eletrônico
├── financeiro.messages.ts     # Mensagens financeiras
├── dashboard.messages.ts      # Mensagens de dashboard
├── familia.messages.ts        # Mensagens de família
├── auth.messages.ts           # Mensagens de autenticação
├── index.ts                   # Exportações centralizadas
└── README.md                  # Esta documentação
```

## Como Usar

### 1. Em Componentes Existentes
```typescript
import { tarefaMessages } from '@/i18n/messages';

const MyComponent = () => {
  const messages = tarefaMessages.pt; // Usar português por padrão
  
  return (
    <div>
      <h1>{messages.labels.titulo}</h1>
      <button>{messages.labels.novo}</button>
    </div>
  );
};
```

### 2. Com Hook Personalizado (Recomendado)
```typescript
import { useMessages } from '@/hooks/useMessages';

const MyComponent = () => {
  const { tarefas } = useMessages();
  
  return (
    <div>
      <h1>{tarefas.labels.titulo}</h1>
      <button>{tarefas.labels.novo}</button>
    </div>
  );
};
```

### 3. Com Contexto de Idioma (Para Troca Dinâmica)
```typescript
import { useLanguage } from '@/contexts/LanguageContext';
import { tarefaMessages } from '@/i18n/messages';

const MyComponent = () => {
  const { language, t } = useLanguage();
  
  return (
    <div>
      <h1>{t('labels.titulo', tarefaMessages)}</h1>
      <button>{t('labels.novo', tarefaMessages)}</button>
    </div>
  );
};
```

## Padrões de Nomenclatura

### Chaves de Mensagens
- **Labels**: `labels.campo` (ex: `labels.titulo`, `labels.nome`)
- **Status**: `status.valor` (ex: `status.pendente`, `status.ativo`)
- **Tooltips**: `tooltips.acao` (ex: `tooltips.editar`, `tooltips.excluir`)
- **Erros**: `erros.tipo` (ex: `erros.campoObrigatorio`, `erros.emailInvalido`)
- **Mensagens**: `mensagens.tipo` (ex: `mensagens.sucesso`, `mensagens.confirmacao`)

### Estrutura de Arquivo
```typescript
export const moduleMessages = {
  pt: {
    labels: { /* labels em português */ },
    status: { /* status em português */ },
    tooltips: { /* tooltips em português */ },
    erros: { /* erros em português */ },
    mensagens: { /* mensagens em português */ },
  },
  en: {
    labels: { /* labels em inglês */ },
    status: { /* status em inglês */ },
    tooltips: { /* tooltips em inglês */ },
    erros: { /* erros em inglês */ },
    mensagens: { /* mensagens em inglês */ },
  },
};
```

## Benefícios Alcançados

### ✅ Eliminação de Textos Hardcoded
- Todos os textos estão centralizados e organizados
- Facilita manutenção e atualizações
- Reduz duplicação de código

### ✅ Suporte a Múltiplos Idiomas
- Estrutura preparada para internacionalização
- Fácil adição de novos idiomas
- Troca dinâmica de idioma

### ✅ Padronização
- Nomenclatura consistente em todo o projeto
- Estrutura uniforme de mensagens
- Facilita onboarding de novos desenvolvedores

### ✅ Manutenibilidade
- Mudanças de texto centralizadas
- Fácil localização de mensagens
- Redução de bugs por inconsistências

## Comandos Úteis

### Buscar Textos Hardcoded
```bash
# Buscar textos hardcoded em componentes
grep -r "label=\"" src/components/ --include="*.tsx"
grep -r "placeholder=\"" src/components/ --include="*.tsx"
grep -r "title=\"" src/components/ --include="*.tsx"

# Buscar textos hardcoded em páginas
grep -r "label=\"" src/pages/ --include="*.tsx"
grep -r "placeholder=\"" src/pages/ --include="*.tsx"
```

### Verificar Imports
```bash
# Verificar se componentes estão usando mensagens centralizadas
grep -r "import.*messages" src/components/ --include="*.tsx"
grep -r "useMessages" src/components/ --include="*.tsx"
```

## Contribuição

### Para Refatorar um Componente

1. **Identificar textos hardcoded** no componente
2. **Verificar se existe arquivo de mensagens** para o módulo
3. **Criar/atualizar arquivo de mensagens** se necessário
4. **Refatorar componente** para usar mensagens centralizadas
5. **Atualizar cabeçalho** do arquivo com data de última atualização
6. **Testar** se tudo funciona corretamente
7. **Atualizar esta documentação** com o progresso

### Checklist de Refatoração

- [ ] Identificar todos os textos hardcoded
- [ ] Verificar/criar arquivo de mensagens do módulo
- [ ] Substituir textos por referências às mensagens
- [ ] Testar em português e inglês
- [ ] Atualizar cabeçalho do arquivo
- [ ] Verificar acessibilidade (aria-label, etc.)
- [ ] Testar funcionalidade do componente

---

**Última atualização**: 2025-01-27
**Status**: 40% concluído (8/20 componentes principais refatorados)
**Próxima meta**: Completar refatoração dos componentes de formulários 