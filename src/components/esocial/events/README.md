<!--
  Arquivo: README.md
  Caminho: src/components/esocial/events/README.md
  Criado em: 2025-06-01
  Última atualização: 2025-06-13
  Descrição: Componente React: CreateS1202Page
-->

# Componentes do eSocial

## S-1202 - Remuneração de Servidor Vinculado a Regime Próprio de Previdência Social

### Descrição
O evento S-1202 é utilizado para informar a remuneração de servidor vinculado a Regime Próprio de Previdência Social (RPPS).

### Estrutura de Arquivos
```
src/
  ├── components/
  │   └── esocial/
  │       └── events/
  │           ├── S1202Form.tsx
  │           ├── S1202DmDevForm.tsx
  │           └── __tests__/
  │               ├── S1202Form.test.tsx
  │               └── S1202DmDevForm.test.tsx
  ├── hooks/
  │   └── esocial/
  │       ├── useS1202Form.ts
  │       └── __tests__/
  │           └── useS1202Form.test.tsx
  ├── schemas/
  │   └── esocial/
  │       └── S1202Schema.ts
  └── app/
      └── esocial/
          └── events/
              └── s-1202/
                  ├── create/
                  │   └── page.tsx
                  ├── [id]/
                  │   └── edit/
                  │       └── page.tsx
                  └── __tests__/
                      └── pages.test.tsx
```

### Componentes

#### S1202Form
Componente principal do formulário S-1202.

**Props:**
- `control`: Control do react-hook-form

**Campos:**
- Identificação do Evento
  - Período de Apuração
  - Indicador de Retificação
  - Número do Recibo
  - Indicador de Apuração
  - Período de Apuração RPPS
  - Indicador de Guia
  - Tipo de Ambiente
  - Processo de Emissão
  - Versão do Processo

- Identificação do Empregador
  - Tipo de Inscrição
  - Número de Inscrição

- Identificação do Trabalhador
  - CPF
  - NIS
  - Nome
  - Sexo
  - Raça/Cor
  - Estado Civil
  - Grau de Instrução
  - Nome Social

- Informações Complementares
  - Código CBO
  - Natureza da Atividade
  - Quantidade de Dias Trabalhados

- Demais Informações
  - Observação

#### S1202DmDevForm
Componente para gerenciar os demonstrativos de valores.

**Props:**
- `control`: Control do react-hook-form

**Funcionalidades:**
- Adicionar/remover demonstrativos
- Gerenciar estabelecimentos/lotações
- Gerenciar verbas

### Hooks

#### useS1202Form
Hook customizado para gerenciar o estado do formulário.

**Parâmetros:**
- `initialData?`: Dados iniciais do formulário (opcional)

**Retorno:**
- `methods`: Métodos do react-hook-form
- `onSubmit`: Função de submissão do formulário

### Validações

O schema de validação (`S1202Schema.ts`) implementa as seguintes regras:

1. Campos Obrigatórios:
   - Período de Apuração
   - Indicador de Retificação
   - Tipo de Inscrição
   - Número de Inscrição
   - CPF do Trabalhador
   - Nome do Trabalhador
   - Sexo
   - Raça/Cor
   - Estado Civil
   - Grau de Instrução

2. Formato de Campos:
   - CPF: 11 dígitos
   - CNPJ: 14 dígitos
   - NIS: 11 dígitos
   - Período de Apuração: AAAA-MM
   - Código CBO: 6 dígitos

3. Valores Permitidos:
   - Indicador de Retificação: 1 (Original) ou 2 (Retificação)
   - Indicador de Apuração: 1 (Mensal) ou 2 (Anual)
   - Tipo de Inscrição: 1 (CNPJ), 2 (CPF), 3 (CAEPF), 4 (CNO)
   - Sexo: M ou F
   - Raça/Cor: 1 a 6
   - Estado Civil: 1 a 5
   - Grau de Instrução: 01 a 12

### Testes

1. Testes de Componente:
   - Renderização de campos
   - Validação de campos obrigatórios
   - Adição/remoção de demonstrativos
   - Validação de formatos

2. Testes de Hook:
   - Submissão de novo evento
   - Submissão de evento existente
   - Tratamento de erros

3. Testes de Página:
   - Renderização da página de criação
   - Renderização da página de edição
   - Carregamento de dados
   - Tratamento de erros

### Uso

```tsx
import { S1202Form } from '@/components/esocial/events/S1202Form';
import { useS1202Form } from '@/hooks/esocial/useS1202Form';

export default function CreateS1202Page() {
  const { methods, onSubmit } = useS1202Form();

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>
        <S1202Form control={methods.control} />
      </form>
    </FormProvider>
  );
}
```

### Regras de Negócio

1. Retificação:
   - Número do recibo é obrigatório quando indRetif = 2
   - Não pode retificar evento já retificado

2. Período de Apuração:
   - Formato: AAAA-MM
   - Não pode ser futuro
   - Não pode ser anterior a 01/2019

3. Demonstrativos:
   - Pelo menos um demonstrativo deve ser informado
   - Código da categoria deve ser válido
   - Valores não podem ser negativos

4. Verbas:
   - Pelo menos uma verba deve ser informada por estabelecimento/lotação
   - Código da rubrica deve ser válido
   - Valores não podem ser negativos

### Acessibilidade

1. Labels:
   - Todos os campos possuem labels descritivos
   - Labels são associados aos campos via htmlFor

2. ARIA:
   - Roles apropriados para cada elemento
   - aria-label para botões de ação
   - aria-describedby para mensagens de erro

3. Navegação:
   - Ordem lógica de tabulação
   - Suporte a teclado
   - Feedback visual de foco

### Internacionalização

Todas as mensagens e labels são internacionalizáveis através do arquivo de traduções:

```json
{
  "esocial": {
    "S1202": {
      "title": "S-1202 - Remuneração de Servidor Vinculado a Regime Próprio de Previdência Social",
      // ...
    }
  }
}
``` 