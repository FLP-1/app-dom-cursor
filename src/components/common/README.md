# Componentes Reutilizáveis

Este diretório contém componentes reutilizáveis que podem ser utilizados em toda a aplicação. A organização é feita por categorias para facilitar a manutenção e localização.

## Índice
- [Categorias](#categorias)
- [Uso](#uso)
- [Documentação dos Componentes](#documentação-dos-componentes)
- [Guia de Estilo](#guia-de-estilo)
- [Guia de Testes](#guia-de-testes)
- [Guia de Contribuição](#guia-de-contribuição)
- [Boas Práticas](#boas-práticas)
- [Checklist de PR](#checklist-de-pr)

## Categorias

### Layout
Componentes básicos de layout que ajudam na estruturação da página.

- `Box`: Container flexível para agrupar elementos
- `Container`: Container responsivo com largura máxima
- `Row`: Linha flexível para organizar elementos horizontalmente
- `Col`: Coluna flexível para organizar elementos verticalmente

### Form
Componentes relacionados a formulários e entrada de dados.

- `FormInput`: Campo de entrada com validação e máscara
- `FormGroup`: Agrupamento de campos de formulário
- `Label`: Rótulo para campos de formulário
- `HelperText`: Texto de ajuda para campos
- `Input`: Campo de entrada básico
- `TextArea`: Campo de texto multilinha
- `Select`: Campo de seleção
- `Checkbox`: Caixa de seleção

### UI
Componentes de interface do usuário.

- `Button`: Botão com variantes e estados
- `Link`: Link interno/externo com variantes
- `Logo`: Logo da aplicação com tamanhos e variantes
- `Tooltip`: Tooltip para informações adicionais

### Data Display
Componentes para exibição de dados.

- `DataTable`: Tabela de dados com paginação e ordenação
- `Calendar`: Calendário com eventos

### Feedback
Componentes para feedback ao usuário.

- `NotificationCard`: Card de notificação
- `NotificationContainer`: Container de notificações

## Uso

Importe os componentes do diretório comum:

```tsx
import { Button, FormInput, Link } from '../components/common';
```

### Exemplos de Uso

#### Button
```tsx
<Button
  variant="primary"
  onClick={handleClick}
  disabled={loading}
>
  {loading ? 'Carregando...' : 'Salvar'}
</Button>
```

#### FormInput
```tsx
<FormInput
  name="email"
  label="E-mail"
  type="email"
  validation={{
    required: true,
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'E-mail inválido'
    }
  }}
  fullWidth
/>
```

#### Link
```tsx
<Link
  href="/dashboard"
  variant="primary"
  underline
  icon={<FaArrowRight />}
  iconPosition="right"
>
  Ir para Dashboard
</Link>
```

#### Logo
```tsx
<Logo
  size="medium"
  variant="default"
  showText={true}
/>
```

#### Tooltip
```tsx
<Tooltip
  text="Informação adicional"
  position="top"
  maxWidth={220}
  icon={<FaInfoCircle />}
/>
```

#### Checkbox
```tsx
import { useForm, Controller, FormProvider } from 'react-hook-form';
import Checkbox from './Checkbox';

const methods = useForm();

<FormProvider {...methods}>
  <Controller
    name="rememberMe"
    control={methods.control}
    render={({ field }) => (
      <Checkbox
        {...field}
        checked={field.value}
        label="Lembrar de mim"
      />
    )}
  />
</FormProvider>
```

#### PasswordInput
Campo de senha reutilizável com ícone de olho para mostrar/ocultar senha, integrado ao react-hook-form.

```tsx
import { PasswordInput } from '../components/common/forms/PasswordInput';

<PasswordInput
  name="password"
  label="Senha"
  validation={{
    required: true,
    minLength: 6
  }}
  style={{ width: '48%' }}
  autoComplete="off"
/>
```

> **Dica:** Use o PasswordInput sempre que precisar de um campo de senha com usabilidade aprimorada.

## Documentação dos Componentes

### Layout

#### Box
Container flexível para agrupar elementos.

```tsx
<Box
  margin="16px 0"
  padding="24px"
  display="flex"
  alignItems="center"
  justifyContent="space-between"
>
  {children}
</Box>
```

#### Container
Container responsivo com largura máxima.

```tsx
<Container maxWidth="1200px" fluid>
  {children}
</Container>
```

#### Row
Linha flexível para organizar elementos horizontalmente.

```tsx
<Row gap={16} alignItems="center" wrap>
  {children}
</Row>
```

#### Col
Coluna flexível para organizar elementos verticalmente.

```tsx
<Col flex={1} maxWidth="300px">
  {children}
</Col>
```

### Form

#### FormInput
Campo de entrada com validação e máscara.

```tsx
<FormInput
  name="cpf"
  label="CPF"
  mask="999.999.999-99"
  validation={{
    required: true,
    validate: (value) => validateCPF(value) || 'CPF inválido'
  }}
  fullWidth
/>
```

#### Checkbox
Caixa de seleção com suporte a label personalizado.

```tsx
<Checkbox
  name="terms"
  label="Aceito os termos"
  renderLabel={(label) => (
    <>
      {label}
      <Tooltip text="Leia os termos antes de aceitar" />
    </>
  )}
/>
```

#### PasswordInput
Campo de senha reutilizável com ícone de olho para mostrar/ocultar senha, integrado ao react-hook-form.

```tsx
import { PasswordInput } from '../components/common/forms/PasswordInput';

<PasswordInput
  name="password"
  label="Senha"
  validation={{
    required: true,
    minLength: 6
  }}
  style={{ width: '48%' }}
  autoComplete="off"
/>
```

> **Dica:** Use o PasswordInput sempre que precisar de um campo de senha com usabilidade aprimorada.

### UI

#### Button
Botão com variantes e estados.

```tsx
<Button
  variant="primary"
  type="submit"
  disabled={loading}
  onClick={handleClick}
>
  {loading ? 'Carregando...' : 'Salvar'}
</Button>
```

#### Link
Link interno/externo com variantes.

```tsx
<Link
  href="/dashboard"
  variant="primary"
  underline
  icon={<FaArrowRight />}
  iconPosition="right"
>
  Ir para Dashboard
</Link>
```

#### Logo
Logo da aplicação com tamanhos e variantes.

```tsx
<Logo
  size="medium"
  variant="default"
  showText={true}
/>
```

#### Tooltip
Tooltip para informações adicionais.

```tsx
<Tooltip
  text="Informação adicional"
  position="top"
  maxWidth={220}
  icon={<FaInfoCircle />}
/>
```

## Guia de Estilo

### Cores
Use as cores definidas no tema:

```tsx
const theme = {
  colors: {
    primary: '#1c3a5b',
    secondary: '#25D366',
    success: '#4CAF50',
    warning: '#FFC107',
    error: '#F44336',
    info: '#2196F3',
  }
};
```

### Tipografia
Use as fontes e tamanhos definidos:

```tsx
const theme = {
  typography: {
    fontFamily: 'Montserrat, sans-serif',
    h1: { fontSize: '2.5rem', fontWeight: 600 },
    h2: { fontSize: '2rem', fontWeight: 600 },
    h3: { fontSize: '1.75rem', fontWeight: 600 },
    h4: { fontSize: '1.5rem', fontWeight: 600 },
    h5: { fontSize: '1.25rem', fontWeight: 600 },
    h6: { fontSize: '1rem', fontWeight: 600 },
    body1: { fontSize: '1rem', fontWeight: 400 },
    body2: { fontSize: '0.875rem', fontWeight: 400 },
  }
};
```

### Espaçamento
Use os espaçamentos definidos:

```tsx
const theme = {
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  }
};
```

### Breakpoints
Use os breakpoints para responsividade:

```tsx
const theme = {
  breakpoints: {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
  }
};
```

## Guia de Testes

### Testes Unitários
Exemplo de teste para o componente Button:

```tsx
import { render, fireEvent } from '@testing-library/react';
import { Button } from '../components/common';

describe('Button', () => {
  it('should render correctly', () => {
    const { getByText } = render(<Button>Click me</Button>);
    expect(getByText('Click me')).toBeInTheDocument();
  });

  it('should handle click events', () => {
    const handleClick = jest.fn();
    const { getByText } = render(
      <Button onClick={handleClick}>Click me</Button>
    );
    fireEvent.click(getByText('Click me'));
    expect(handleClick).toHaveBeenCalled();
  });

  it('should be disabled when loading', () => {
    const { getByText } = render(
      <Button loading>Click me</Button>
    );
    expect(getByText('Click me')).toBeDisabled();
  });
});
```

### Testes de Integração
Exemplo de teste para o formulário de login:

```tsx
import { render, fireEvent, waitFor } from '@testing-library/react';
import { Login } from '../pages/login';

describe('Login', () => {
  it('should handle form submission', async () => {
    const { getByLabelText, getByText } = render(<Login />);
    
    fireEvent.change(getByLabelText('CPF'), {
      target: { value: '123.456.789-00' }
    });
    
    fireEvent.change(getByLabelText('Senha'), {
      target: { value: 'password123' }
    });
    
    fireEvent.click(getByText('Entrar'));
    
    await waitFor(() => {
      expect(getByText('Login realizado com sucesso!')).toBeInTheDocument();
    });
  });
});
```

### Testes de Snapshot
Exemplo de teste de snapshot:

```tsx
import { render } from '@testing-library/react';
import { Button } from '../components/common';

describe('Button', () => {
  it('should match snapshot', () => {
    const { container } = render(<Button>Click me</Button>);
    expect(container).toMatchSnapshot();
  });
});
```

## Guia de Contribuição

### Estrutura de Arquivos
```
ComponentName/
  ├── index.tsx
  ├── ComponentName.test.tsx
  ├── ComponentName.stories.tsx
  ├── styles.ts
  └── types.ts
```

### Convenções de Código

#### Imports
```tsx
// Componentes reutilizáveis
import { Button, FormInput } from '../components/common';

// Tipos
import type { ButtonProps } from '../components/common/types';

// Utilitários
import { validateCPF } from '../utils/validators';
```

#### Props
```tsx
interface MyComponentProps {
  required: string;
  optional?: number;
  children: ReactNode;
}

const MyComponent: React.FC<MyComponentProps> = ({
  required,
  optional = 0,
  children
}) => {
  // ...
};
```

#### Estilos
```tsx
const StyledComponent = styled.div(({ theme }) => ({
  padding: theme.spacing.md,
  color: theme.palette.primary.main,
  '&:hover': {
    color: theme.palette.primary.dark,
  },
}));
```

### Documentação

#### JSDoc
```tsx
/**
 * Botão com variantes e estados.
 * @param {ButtonProps} props - Props do componente
 * @returns {JSX.Element} Componente Button
 */
const Button: React.FC<ButtonProps> = (props) => {
  // ...
};
```

#### Storybook
```tsx
export default {
  title: 'UI/Button',
  component: Button,
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary'],
    },
    disabled: {
      control: 'boolean',
    },
  },
};

const Template = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  variant: 'primary',
  children: 'Click me',
};
```

## Boas Práticas

1. **Importação**
   - Sempre importe os componentes do diretório comum
   - Use o barrel file (index.ts) para importações
   - Evite importações diretas de arquivos individuais

2. **Estilização**
   - Use as props de estilo fornecidas pelos componentes
   - Evite sobrescrever estilos diretamente
   - Mantenha a consistência visual

3. **Acessibilidade**
   - Forneça labels e textos alternativos
   - Use ARIA attributes quando necessário
   - Mantenha o contraste adequado

4. **Performance**
   - Evite renderizações desnecessárias
   - Use memoização quando apropriado
   - Mantenha os componentes leves

5. **Testes**
   - Escreva testes para novos componentes
   - Mantenha a cobertura de testes
   - Teste diferentes estados e interações

## Checklist de PR

- [ ] Componente adicionado à categoria correta
- [ ] Exportado no barrel file
- [ ] Documentado no README
- [ ] Testes adicionados
- [ ] Acessibilidade verificada
- [ ] Responsividade testada
- [ ] Consistência visual mantida
- [ ] Performance otimizada
- [ ] Storybook atualizado
- [ ] Bundle size verificado
- [ ] Princípio de responsabilidade única seguido
