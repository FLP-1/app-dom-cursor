<!--
  Arquivo: integracao_esocial_dom_instrucoes.md
  Caminho: docs/integracao_esocial_dom_instrucoes.md
  Criado em: 2025-06-01
  Última atualização: 2025-05-26
  Descrição: Arquivo do projeto.
-->

# Integração eSocial - Sistema DOM

## 1. Visão Geral

Este documento orienta a implementação da integração do sistema DOM com o eSocial, seguindo as diretrizes do projeto (README, .cursorrules, etc), as melhores práticas de mercado, LGPD, reuso de componentes e **uso do Prisma como ORM**.

**Objetivo:**
- Permitir que o sistema DOM envie, consulte e gerencie eventos do eSocial (admissão, remuneração, desligamento, etc.), garantindo conformidade legal, segurança e rastreabilidade.

---

## 2. Diretrizes do Projeto DOM

- **Componentização e Reutilização:**
  - Sempre crie componentes e hooks reutilizáveis.
  - Centralize lógica de formulário/listagem em hooks customizados.
  - Não misture `<FormProvider>` e prop `control` no mesmo formulário.
- **Tipagem:**
  - Proibido uso de `any`. Use tipos específicos ou `unknown` com justificativa.
- **Acessibilidade e Responsividade:**
  - Use Material UI, labels, aria, e garanta responsividade.
- **Navegação:**
  - Use apenas `next/link` para navegação.
- **Banco de Dados:**
  - Use **Prisma + Postgres**. Nunca altere migrations manualmente.
- **LGPD e Segurança:**
  - Criptografe dados sensíveis, controle acesso por perfil, registre logs de acesso.
- **Testes:**
  - Implemente testes automatizados para todos os fluxos críticos.
- **Documentação:**
  - Documente endpoints, funções e fluxos críticos.
- **CI/CD:**
  - Configure pipeline para rodar testes e deploy automático.

---

## 3. Estrutura do Banco de Dados (PostgreSQL + Prisma)

### 3.1. Models Prisma Sugeridos

```prisma
// schema.prisma
model Employer {
  id         String   @id @default(uuid())
  cnpj       String   @unique
  name       String
  address    String?
  createdAt  DateTime @default(now())
  events     Event[]
}

model User {
  id         String   @id @default(uuid())
  uid        String?  @unique
  cpf        String   @unique
  name       String
  email      String   @unique
  phone      String?
  role       String
  createdAt  DateTime @default(now())
}

model Event {
  id          String   @id @default(uuid())
  eventType   String
  xmlPayload  String
  status      String   @default("PENDING")
  employerId  String
  employer    Employer @relation(fields: [employerId], references: [id])
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  logs        Log[]
}

model Log {
  id        String   @id @default(uuid())
  eventId   String
  event     Event    @relation(fields: [eventId], references: [id])
  logMessage String
  createdAt DateTime @default(now())
}
```

- Rode as migrations com:
  ```powershell
  npx prisma migrate dev --name esocial-integration
  ```
- Use o Prisma Client para acessar os dados na API.
- Crie índices e campos extras conforme necessidade do projeto.
- Proteja dados sensíveis (CPF, email) conforme LGPD.

---

## 4. Desenvolvimento da API (Node.js + TypeScript + Prisma)

### 4.1. Estrutura do Projeto

```
/src
  /controllers
    esocialController.ts
  /services
    esocialService.ts
    xmlService.ts
  /models
    prismaClient.ts // Importa o Prisma Client
  /middlewares
    auth.ts
    lgpd.ts
    logger.ts
  /utils
    cpfValidator.ts
    xmlTemplates.ts
  /routes
    esocialRoutes.ts
/docs
  Integração eSocial.txt
  manual-do-esocial-empregador-domestico-versao-08-05-2025.pdf.txt
  manualorientacaodesenvolvedoresocialv1-15.pdf.txt
  MANUAL DE ORIENTAÇÃO DO eSOCIAL Versão S-1.3 - (Consol. até a NO S-1.3 – 03.2025).pdf.txt
```

### 4.2. Endpoints Sugeridos

- `POST /esocial/events` — Criação de evento (gera XML, armazena, status PENDING)
- `GET /esocial/events/:id` — Consulta de evento
- `PUT /esocial/events/:id` — Atualização de status/XML do evento
- `GET /esocial/logs` — Consulta de logs

### 4.3. Geração e Validação de XML

- Use biblioteca como `xmlbuilder2` para montar o XML conforme os schemas do eSocial.
- Crie funções reutilizáveis para cada parte do XML (ex: ideEvento, ideEmpregador).
- Valide o XML gerado contra o XSD oficial (manual e arquivos na pasta `/docs`).
- Implemente logs detalhados de cada operação.

### 4.4. Segurança e LGPD

- Implemente autenticação JWT (ou Firebase Auth) e controle de acesso por roles.
- Criptografe dados sensíveis no banco.
- Implemente middleware para logging e rastreabilidade.
- Garanta que CPF e dados pessoais sejam imutáveis após cadastrados.

---

## 5. Boas Práticas e Checklist

- **Reutilização:**
  - Crie funções e componentes reutilizáveis para geração de XML, validação, logging e autenticação.
- **Testes:**
  - Implemente testes unitários e de integração para todos os módulos críticos.
- **Documentação:**
  - Documente endpoints com Swagger/OpenAPI.
  - Comente funções e fluxos críticos.
- **CI/CD:**
  - Configure pipeline para rodar testes e deploy automático.
- **Monitoramento:**
  - Implemente logs e monitore o status dos eventos enviados ao eSocial.

---

## 6. Passos para o Programador Júnior

1. **Leia o README.txt e os manuais do eSocial na pasta `/docs`** para entender regras, nomenclatura e detalhes dos schemas.
2. **Implemente o banco de dados** usando Prisma e rode as migrations.
3. **Desenvolva a API** seguindo a estrutura modular, Prisma Client e endpoints sugeridos.
4. **Implemente a geração e validação do XML** conforme o manual do eSocial.
5. **Garanta segurança, LGPD e controle de acesso** em todos os endpoints.
6. **Implemente testes e documentação**.
7. **Solicite revisão de código** e ajuste conforme feedback.

---

## 7. Checklist Final

- [ ] Banco de dados criado e testado com Prisma
- [ ] API RESTful implementada e testada usando Prisma Client
- [ ] Geração e validação de XML conforme manual
- [ ] Segurança, LGPD e controle de acesso implementados
- [ ] Testes automatizados e documentação prontos
- [ ] Código revisado e aprovado

---

**Dica:**
- Compartilhe este arquivo com o time e mantenha-o atualizado conforme novas regras ou ajustes do projeto.
- Consulte sempre os manuais oficiais do eSocial e as regras do projeto DOM para garantir conformidade e qualidade. 