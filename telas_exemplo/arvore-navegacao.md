# Árvore de Navegação do Sistema DOM

> **Atenção:** Utilize sempre o componente `Link` do Next.js para navegação entre páginas.

---

## Estrutura de Páginas

- [Dashboard](/dashboard)
- [Parceiros](/parceiros)
  - [Listagem](/parceiros)
  - [Novo Parceiro](/parceiros/novo)
  - [Detalhes do Parceiro](/parceiros/[id])
  - [Editar Parceiro](/parceiros/[id]/editar)
- [Empregados Domésticos](/empregados-domesticos)
  - [Listagem](/empregados-domesticos)
  - [Novo Empregado](/empregados-domesticos/novo)
  - [Detalhes do Empregado](/empregados-domesticos/[id])
  - [Editar Empregado](/empregados-domesticos/[id]/editar)
- [Compras](/compras)
  - [Listagem](/compras)
  - [Nova Compra](/compras/nova)
  - [Detalhes da Compra](/compras/[id])
- [Tarefas](/tarefas)
  - [Listagem](/tarefas)
- [Ponto](/ponto)
  - [Listagem](/ponto)
- [Documentos](/documents)
  - [Listagem](/documents)
- [Alertas](/alerts)
  - [Listagem](/alerts)
- [eSocial](/esocial)
  - [Eventos](/esocial/eventos)
    - [Listagem](/esocial/eventos)
    - [Novo Evento](/esocial/eventos/novo)
    - [Detalhes do Evento](/esocial/eventos/[id])
    - [Editar Evento](/esocial/eventos/[id]/editar)
  - [Configuração](/esocial/configuracao)
- [Chat](/chat)
  - [Listagem](/chat)
- [Login](/login)
- [Seleção de Grupo](/selecionar-grupo)
- [Política de Privacidade](/privacy-policy)
- [Termos de Uso](/terms-of-use)
- [Página Inicial](/index)

---

## Vínculos e Dependências entre Módulos

- **Empregado Doméstico**
  - Vinculado a: [Ponto](/ponto), [Tarefas](/tarefas), [Documentos](/documents), [Alertas](/alerts), [Compras](/compras), [Chat](/chat), [eSocial](/esocial/eventos)
  - Dependências:
    - Só pode ser cadastrado se houver pelo menos um empregador.
    - Pode ser vinculado a um usuário do sistema (User).
    - Participa de registros de ponto, tarefas, compras e documentos.
    - Pode receber alertas automáticos (ex: ponto, documentos vencidos, etc).

- **Empregador**
  - Vinculado a: [Empregados Domésticos](/empregados-domesticos), [Ponto](/ponto), [eSocial](/esocial/configuracao)
  - Dependências:
    - Pode cadastrar e gerenciar empregados domésticos.
    - Responsável por validar registros de ponto e aprovar tarefas.

- **Ponto**
  - Vinculado a: [Empregado Doméstico](/empregados-domesticos), [Alertas](/alerts)
  - Dependências:
    - Cada registro de ponto pertence a um empregado doméstico.
    - Pode gerar alertas automáticos (ex: horas extras, fora do local esperado).

- **Tarefas**
  - Vinculado a: [Empregado Doméstico](/empregados-domesticos), [Chat](/chat)
  - Dependências:
    - Tarefas podem ser atribuídas a empregados domésticos.
    - Mensagens podem ser vinculadas a tarefas.

- **Documentos**
  - Vinculado a: [Empregado Doméstico](/empregados-domesticos), [eSocial](/esocial/eventos), [Alertas](/alerts)
  - Dependências:
    - Documentos podem ser anexados a eventos do eSocial, tarefas e alertas.
    - Documentos vencidos geram alertas.

- **Alertas**
  - Vinculado a: [Ponto](/ponto), [Documentos](/documents), [eSocial](/esocial/eventos)
  - Dependências:
    - Gerados automaticamente por regras de negócio (ponto, documentos, eventos do eSocial).

- **eSocial**
  - Vinculado a: [Empregador](/empregadores), [Empregado Doméstico](/empregados-domesticos), [Documentos](/documents), [Alertas](/alerts)
  - Dependências:
    - Eventos do eSocial podem exigir documentos e gerar alertas.
    - Configuração do eSocial depende do empregador.

- **Chat**
  - Vinculado a: [Empregado Doméstico](/empregados-domesticos), [Tarefas](/tarefas), [Documentos](/documents)
  - Dependências:
    - Mensagens podem ser vinculadas a tarefas e documentos.

---

> **Dica:** Consulte sempre este arquivo para entender a navegação e as integrações entre módulos. Atualize-o sempre que houver mudanças relevantes na estrutura do sistema. 