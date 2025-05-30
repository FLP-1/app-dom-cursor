# Processo de Desenvolvimento DOM

Este documento descreve o fluxo de trabalho e as diretrizes para o desenvolvimento no projeto DOM, com base nas **Project Rules** definidas. O objetivo é garantir a consistência, a qualidade e a conformidade com os requisitos, as normas de segurança e privacidade, e a identidade visual do projeto.

## Nomenclatura de Arquivos
> - **Páginas:** sempre em minúsculo e com hífen (`kebab-case`). Ex: `compras/index.tsx`, `compras/nova.tsx`, `login-old-validada.tsx`.
> - **Componentes:** sempre em PascalCase. Ex: `CompraList.tsx`, `CompraHeader.tsx`.
> - **Nunca use espaços, acentos, caracteres especiais ou letras maiúsculas em nomes de arquivos de página.**
> - **Exemplos válidos:** `compras/index.tsx`, `selecionar-grupo.tsx`, `CompraList.tsx`.
> - **Exemplos inválidos:** `Compras/Index.tsx`, `login Copia.tsx`, `compra_nova.tsx`, `compraçãõ.tsx`.

## Diretriz de Navegação (Next.js)
> **Sempre utilize o componente `Link` do Next.js (`next/link`) para navegação entre páginas.**
> Não utilize `react-router-dom` neste projeto, pois o roteamento é gerenciado pelo Next.js.
> Exemplo:
> ```tsx
> import Link from 'next/link';
> <Link href="/pagina">Ir para página</Link>
> ```

## Arquivos de Backup e Versões Antigas
> **Nunca analise, modifique ou utilize arquivos com sufixos como `_old`, `-old`, `Copia`, `-copia`, `-cópia`, `-copy` ou similares.**
> Esses arquivos são versões antigas, backups ou rascunhos e não fazem parte do código-fonte ativo do sistema.

## 1. Análise e Documentação Inicial (Baseado em `AnalysisRules`)

Antes de iniciar qualquer implementação de código, é obrigatório realizar uma análise aprofundada dos documentos existentes na pasta `docs/`. Atualmente, isso inclui a análise dos arquivos `.txt`.

### 1.1. Passos da Análise:

-   Ler e compreender o conteúdo de todos os arquivos `.txt` relevantes em `docs/`.
-   Identificar requisitos, regras de negócio, fluxos e outras informações cruciais para a tarefa em mãos.
-   Documentar a análise, incluindo:
    -   **Motivação:** Quais os motivos e objetivos da tarefa a ser realizada, com base na análise da documentação.
    -   **Alternativas:** Apresentar pelo menos duas alternativas de solução para a tarefa.
    -   **Justificativa:** Justificar a escolha da solução proposta, explicando os prós e contras em relação às alternativas, considerando as Project Rules (inovação, reutilização, performance, etc.).
    -   **Aprendizado:** Registrar os principais aprendizados e insights obtidos durante a análise da documentação.

### 1.2. Formato da Documentação de Análise:

A documentação da análise deve ser clara, estruturada e de fácil acesso, preferencialmente em formato Markdown (`.md`). Pode ser um novo arquivo na pasta `docs/analise` ou adicionada como um cabeçalho relevante em um documento existente.

## 2. Processo de Aprovação (Baseado em `ApprovalRules`)

A codificação só pode ser iniciada após a aprovação explícita do usuário (empregador/responsável pelo projeto). O fluxo de aprovação segue os seguintes passos:

1.  **Proposta Inicial:** O desenvolvedor apresenta a proposta de solução, incluindo a documentação da análise conforme descrito na seção 1.
2.  **Aprovação do Usuário:** O usuário revisa a proposta e a documentação, e fornece uma aprovação explícita para prosseguir com a implementação.
3.  **Implementação:** Após a aprovação, o desenvolvedor inicia a codificação, seguindo as Project Rules de Código, Qualidade, Performance, etc.
4.  **Revisão:** A implementação passa por um processo de revisão (code review, testes, etc.) para garantir a qualidade e a conformidade.
5.  **Aprovação Final:** Após a revisão e validação, a funcionalidade implementada é apresentada ao usuário para aprovação final antes de ser integrada ao ambiente de produção.

### 2.1. Requisitos para Aprovação:

Para que uma proposta seja considerada para aprovação, os seguintes requisitos devem ser atendidos:

-   **Aprovação do Usuário:** A aprovação explícita do usuário é mandatória.
-   **Documentação:** A documentação da análise (Seção 1) deve estar completa e clara.
-   **Justificativa:** A justificativa para a solução proposta deve ser convincente e baseada nas Project Rules.

## 3. Iteração e Aprendizado Contínuo (Baseado em `LearningRules`)

Durante todo o processo de desenvolvimento, é fundamental documentar o aprendizado, o entendimento do negócio, os treinamentos realizados e as novas abordagens adotadas. Esta documentação deve ser clara, estruturada e acessível para auxiliar no aprendizado e crescimento de toda a equipe.

## 4. Conformidade e Melhores Práticas (Baseado em `ComplianceRules`, `InnovationRules`, `ReusabilityRules`, `VisualIdentityRules`, `LayoutRules`, `PersonaRules`, `ImplementationRules`)

Todas as demais Project Rules devem ser consideradas e aplicadas durante as fases de Implementação e Revisão. Isso inclui garantir a conformidade com a LGPD, buscar inovação, reutilizar componentes, manter a identidade visual, criar layouts elegantes e considerar a experiência das personas. 