# Project Rules

## 1. Estrutura e Organização
- O sistema é multi-grupo, multi-perfil e multi-parceiro.
- Usuários podem pertencer a vários grupos e ter diferentes papéis.
- Parceiros podem gerenciar múltiplos empregadores.

## 2. Navegação
- Sempre use o componente `Link` do Next.js (`next/link`) para navegação.
- É proibido usar `react-router-dom` em qualquer parte do projeto.

## 3. Nomenclatura de Arquivos
- Páginas: sempre em minúsculo e com hífen (`kebab-case`).
- Componentes: sempre em PascalCase.
- Nunca use espaços, acentos, caracteres especiais ou letras maiúsculas em nomes de arquivos de página.
- Nunca use arquivos com sufixos de backup ou rascunho (`_old`, `-old`, `Copia`, `-copia`, `-cópia`, `-copy`, etc).
- Proibição se aplica a todos os diretórios do projeto.

## 4. Formulários
- Todo formulário deve ter seu próprio hook customizado (ex: `useLoginForm`, `useCompraForm`).
- Toda lógica de submit, validação e integração com API deve estar centralizada no hook customizado.
- Todos os campos reutilizáveis (ex: `FormInput`, `PasswordInput`, `FormSelect`, `FormDatePicker`) DEVEM receber a prop `control` do hook customizado.
- É proibido misturar `<FormProvider>` e prop `control` no mesmo formulário.
- Mensagens de erro e sucesso devem ser padronizadas, amigáveis e internacionalizáveis.
- Testes automatizados devem cobrir o fluxo dos formulários.
- Siga o checklist de PRs e corrija qualquer violação antes de submeter.
- O lint do projeto impede uso incorreto de campos reutilizáveis.
- Campos reutilizáveis devem seguir boas práticas de acessibilidade (labels, aria, etc) e responsividade.

## 5. Persistência e Banco de Dados
- Use sempre Prisma + Postgres.
- Não altere migrations manualmente.
- Consulte o arquivo `prisma/schema.prisma` para detalhes de modelagem.

## 6. Acessibilidade e Responsividade
- Todos os formulários e componentes devem ser acessíveis (labels, aria, etc).
- O layout deve ser responsivo e funcionar bem em mobile e desktop.

## 7. Tema e Estilo
- Sempre use o tema do Material UI (`theme.palette`, `theme.spacing`, etc).
- Não use estilos inline, exceto em casos muito específicos e justificados.
- Padronize o uso de cores, espaçamentos e fontes conforme o tema.

## 8. Documentação e Onboarding
- Consulte sempre o README.md, DOCUMENTACAO.md e este arquivo antes de abrir PR.
- Siga o template de PR e o checklist obrigatório.
- Regras do arquivo `.cursorrules` são obrigatórias para todo o time e para a IA.

## 9. Mensagens e Internacionalização
- Mensagens de erro e sucesso devem ser centralizadas e internacionalizáveis.
- Evite textos soltos no código; use dicionários de mensagens.

## 10. Exemplo correto de formulário
```tsx
const { control, handleSubmit, onSubmit } = useLoginForm();
<form onSubmit={handleSubmit(onSubmit)}>
  <FormInput name="cpf" control={control} ... />
  <PasswordInput name="password" control={control} ... />
</form>
```

## 11. O que NÃO fazer
```tsx
<FormInput name="cpf" /> // ERRADO
<FormProvider {...methods}>
  <FormInput name="cpf" control={methods.control} /> // ERRADO
</FormProvider>
```

## 12. Comandos de Terminal (PowerShell)
- Sempre que sugerir comandos de terminal, utilize a sintaxe do PowerShell, compatível com Windows.
- Explique o que cada comando faz e relacione ao contexto do projeto.
- Exemplo:
```powershell
Remove-Item -Recurse -Force .next
# Remove a pasta de build do Next.js para forçar uma recompilação limpa
```

## Regras de Tipagem
- É proibido o uso de 'any' em todo o projeto. Utilize tipos específicos ou 'unknown'.
- Exceções só são permitidas em casos extremamente justificados e documentados no próprio código, explicando o motivo da escolha.
- Exemplo de justificativa:
  // Justificativa: integração com biblioteca externa sem tipos disponíveis
  const valor: any = obterValorExterno(); 

## Manual de Cadastro de Empregador e Empregado Doméstico

> **Atenção:**
> Todas as regras, campos obrigatórios, opcionais, tooltips e funções permitidas para empregador e empregado doméstico estão detalhadas no manual:
>
> [`/docs/manual-cadastro-domestico.md`](docs/manual-cadastro-domestico.md)
>
> **É obrigatório que todo o time consulte e siga este manual ao implementar ou revisar cadastros relacionados ao eSocial Doméstico.**
>
> Dúvidas ou sugestões devem ser discutidas com o time de produto e arquitetura.