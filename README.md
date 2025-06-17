<!--
  Arquivo: README.md
  Caminho: README.md
  Criado em: 2025-06-01
  Última atualização: 2025-06-13
  Descrição: Documentação principal do projeto DOM, incluindo organização, regras, padrões, instruções de uso, contribuição, tecnologias, acessibilidade e governança do repositório.
-->

[![CI](https://github.com/${{github.repository}}/actions/workflows/ci.yml/badge.svg)](https://github.com/${{github.repository}}/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/${{github.repository}}/branch/main/graph/badge.svg)](https://codecov.io/gh/${{github.repository}}/branch/main/graph/badge.svg)

# DOM - Sistema de Gestão

Sistema de Gestão de Documentos e Processos com foco em eventos do eSocial.

---

## 🚀 Tecnologias
- Next.js 14
- React
- TypeScript
- Material UI
- Prisma
- PostgreSQL
- Jest
- React Testing Library

---

## 📋 Pré-requisitos
- Node.js 18.x ou superior
- PostgreSQL 14.x ou superior
- npm 11.x ou superior

---

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

---

## 🧪 Testes
```powershell
# Executa todos os testes
npm test
# Executa testes em modo watch
npm run test:watch
# Executa testes com cobertura
npm run test:coverage
```

---

## 📦 Build
```powershell
# Cria build de produção
npm run build
# Inicia servidor de produção
npm start
```

---

## Organização do Projeto

### Estrutura de Diretórios
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
- `.cursorrules`, `project_rules`, `.eslintrc.json`, `.gitignore`, `.npmrc`, `tsconfig.json`, `next.config.mjs`, `README.md`, `LICENSE`, `tsconfig.tsbuildinfo`, `.next/`, `node_modules/`

---

## Regras de Organização e Checklist de PR
- Todo código deve estar em `src/`
- Documentação técnica em `docs/technical/`, de usuário em `docs/user/`, README.md e LICENSE na raiz
- Imagens, fontes e outros assets em `public/`
- Usar apenas npm (package-lock.json)
- Imports com alias '@/'
- Arquivos de código: 200-400 linhas; teste: 100-200; config: 50-100
- Páginas: kebab-case; Componentes: PascalCase; Hooks/utilitários: camelCase
- Todo arquivo de código-fonte deve ter cabeçalho padronizado (ver exemplo abaixo)
- PRs devem seguir checklist obrigatório

### Checklist de PR
- [ ] Estrutura correta
- [ ] Configuração na raiz
- [ ] Sem duplicidade de código
- [ ] Cabeçalhos atualizados
- [ ] Imports '@/'
- [ ] Tamanho adequado
- [ ] Nomenclatura correta
- [ ] Documentação atualizada
- [ ] Sem arquivos temporários
- [ ] Apenas npm

---

## Cabeçalho de Arquivos
```typescript
/**
 * Arquivo: NomeDoArquivo.tsx
 * Caminho: src/components/NomeDoArquivo.tsx
 * Criado em: YYYY-MM-DD
 * Última atualização: YYYY-MM-DD
 * Descrição: Breve descrição do propósito do arquivo
 */
```

---

## Acessibilidade em Formulários
- Todo campo de formulário (input, select, datepicker, number, etc) deve possuir um `id` único e um `label` visível associado.
- Se não for possível exibir um label visível, use `aria-label` ou `aria-labelledby` com texto descritivo.
- Wrappers e componentes customizados (ex: FormInput, FormDatePicker, FormNumberInput) DEVEM repassar corretamente as props `id`, `label` e `aria-label` para o componente MUI interno.
- O `label` deve ser passado para o componente MUI (`TextField`, `Select`, etc) e vinculado ao campo via `id`.
- Nunca use `<option>` dentro de `<TextField select>`, apenas `<MenuItem>`.

### Exemplo de uso correto:
```tsx
<TextField id="nome-usuario" label="Nome" />
<TextField id="email-usuario" aria-label="E-mail do usuário" /> // se não houver label visível
```

Consulte sempre a documentação oficial do Material UI e as recomendações do axe/wcag para dúvidas de acessibilidade.

---

## Padrão de Formulários com Hooks Customizados
- Cada formulário deve ter seu próprio hook customizado (ex: useLoginForm)
- Toda lógica de submit, validação e integração com API deve estar centralizada no hook
- Campos reutilizáveis DEVEM receber a prop `control` do hook customizado
- É proibido misturar <FormProvider> e prop `control` no mesmo formulário
- Mensagens de erro e sucesso devem ser padronizadas, amigáveis e internacionalizáveis, sempre usando o dicionário central
- Testes automatizados devem cobrir o fluxo dos formulários
- Todos os campos e formulários devem ser acessíveis (labels, aria, etc) e responsivos

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

---

## Regras do Projeto
- Consulte sempre o arquivo `project_rules` para as regras detalhadas e exemplos
- As regras também estão presentes no arquivo `.cursorrules`, lido automaticamente pela IA do Cursor
- O checklist de PR e a documentação técnica reforçam essas diretrizes

---

## Multi-grupo, Multi-perfil e Multi-parceiro
O sistema permite que um usuário pertença a múltiplos grupos (ex: famílias, empregadores, parceiros) e tenha diferentes papéis em cada grupo (ex: administrador, familiar, empregado). Também é possível que um parceiro (ex: escritório de contabilidade) gerencie vários empregadores.

### Funcionamento
- Usuário pode pertencer a vários grupos e ter diferentes permissões em cada um
- Empregado pode trabalhar para mais de um grupo
- Parceiro pode gerenciar múltiplos empregadores
- Após o login, se o usuário tiver mais de um grupo, ele deve escolher em qual grupo deseja atuar (página `/selecionar-grupo`)
- As permissões e funcionalidades disponíveis dependem do papel do usuário no grupo selecionado

---

## Convenções
- Commits seguem o padrão Conventional Commits
- Branches seguem o padrão Git Flow
- Código segue o padrão Airbnb JavaScript Style Guide

---

## 🤝 Contribuição
1. Faça o fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'feat: add some amazing feature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

---

## 📄 Licença
Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👥 Autores
- Seu Nome - [@seu-usuario](https://github.com/seu-usuario)

---

## 📞 Suporte
Para suporte, envie um email para seu-email@exemplo.com ou abra uma issue no GitHub.

---

## Regras de Tipagem
- É proibido o uso de 'any' em todo o projeto. Utilize tipos específicos ou 'unknown'.
- Exceções só são permitidas em casos extremamente justificados e documentados no próprio código, explicando o motivo da escolha.
- Exemplo de justificativa:
  // Justificativa: integração com biblioteca externa sem tipos disponíveis
  const valor: any = obterValorExterno();

### Mecanismos de Controle de Tipagem
1. ESLint: `@typescript-eslint/no-explicit-any: 'error'`
2. TypeScript Strict Mode: `strict: true, noImplicitAny: true, strictNullChecks: true`
3. Validação de Tipos em Runtime: Zod/Yup, type guards, interfaces em .d.ts
4. Processo de Code Review: PRs com 'any' sem justificativa serão rejeitados, testes de tipo obrigatórios, CI/CD verifica cobertura de tipos, exceções registradas

---

## Comandos de Terminal (PowerShell)
Sempre que sugerir comandos de terminal, utilize a sintaxe do PowerShell, compatível com Windows. Explique o que cada comando faz e relacione ao contexto do projeto.

---

## Observações Finais
- Nunca mantenha arquivos README.md duplicados em subdiretórios. Toda documentação principal deve estar centralizada neste arquivo na raiz do projeto.
- Documentação técnica detalhada pode ser mantida em `docs/technical/`, mas nunca como README.md separado.
- Atualize sempre este arquivo ao alterar regras, padrões ou processos do projeto. 