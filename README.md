## Multi-grupo, Multi-perfil e Multi-parceiro

O sistema permite que um usuário pertença a múltiplos grupos (ex: famílias, empregadores, parceiros) e tenha diferentes papéis em cada grupo (ex: administrador, familiar, empregado). Também é possível que um parceiro (ex: escritório de contabilidade) gerencie vários empregadores.

### Funcionamento
- **Usuário pode pertencer a vários grupos** e ter diferentes permissões em cada um.
- **Empregado pode trabalhar para mais de um grupo**.
- **Parceiro pode gerenciar múltiplos empregadores**.
- Após o login, se o usuário tiver mais de um grupo, ele deve escolher em qual grupo deseja atuar (página `/selecionar-grupo`).
- As permissões e funcionalidades disponíveis dependem do papel do usuário no grupo selecionado.

### Exemplo de Fluxo
1. Usuário faz login normalmente.
2. Se possuir múltiplos grupos, é direcionado para a página de seleção de grupo.
3. Após escolher o grupo, o sistema carrega as permissões e dados referentes àquele grupo.

### Modelagem no Prisma
Veja o arquivo `prisma/schema.prisma` para detalhes das tabelas `UserGroup`, `Group`, `Partner` e `UserPartner`.

---

### Diretriz de Navegação (Next.js)
> **Sempre utilize o componente `Link` do Next.js (`next/link`) para navegação entre páginas.**
> Não utilize `react-router-dom` neste projeto, pois o roteamento é gerenciado pelo Next.js.
> Exemplo:
> ```tsx
> import Link from 'next/link';
> <Link href="/pagina">Ir para página</Link>
> ```

---

### Nomenclatura de Arquivos
> - **Páginas:** sempre em minúsculo e com hífen (`kebab-case`). Ex: `compras/index.tsx`, `compras/nova.tsx`, `login-old-validada.tsx`.
> - **Componentes:** sempre em PascalCase. Ex: `CompraList.tsx`, `CompraHeader.tsx`.
> - **Nunca use espaços, acentos, caracteres especiais ou letras maiúsculas em nomes de arquivos de página.**
> - **Exemplos válidos:** `compras/index.tsx`, `selecionar-grupo.tsx`, `CompraList.tsx`.
> - **Exemplos inválidos:** `Compras/Index.tsx`, `login Copia.tsx`, `compra_nova.tsx`, `compraçãõ.tsx`.

---

### Arquivos de Backup e Versões Antigas
> **Nunca analise, modifique ou utilize arquivos com sufixos como `_old`, `-old`, `Copia`, `-copia`, `-cópia`, `-copy` ou similares.**
> Esses arquivos são versões antigas, backups ou rascunhos e não fazem parte do código-fonte ativo do sistema.

## Padrão de Formulários com Hooks Customizados

Para garantir organização, escalabilidade e manutenção facilitada, cada formulário do projeto deve possuir seu próprio hook customizado, que encapsula toda a lógica de validação, submit e integração com APIs/contextos.

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

Veja o template em `src/hooks/forms/useFormTemplate.ts`.

### Checklist para Pull Requests
- [ ] O formulário possui um hook customizado?
- [ ] A lógica de validação e submit está no hook?
- [ ] Campos reutilizáveis não possuem lógica de formulário?
- [ ] O padrão está documentado no README?
- [ ] Testes foram ajustados para consumir o hook?

## Regras do Projeto

Este projeto segue regras rígidas de padronização para garantir qualidade, escalabilidade e facilidade de manutenção. **Todas as regras são obrigatórias para o time e para a IA.**

- Consulte sempre o arquivo `PROJECT_RULES.md` para as regras detalhadas e exemplos.
- As regras também estão presentes no arquivo `.cursorrules`, lido automaticamente pela IA do Cursor.
- O checklist de PR e a documentação técnica reforçam essas diretrizes.

> **Resumo das principais regras:**
> - Sempre use hook customizado para cada formulário.
> - Todos os campos reutilizáveis DEVEM receber a prop `control` do hook customizado.
> - É proibido misturar `<FormProvider>` e prop `control` no mesmo formulário.
> - Use sempre Prisma + Postgres e nunca altere migrations manualmente.
> - Navegação apenas com `next/link`.
> - Nunca use arquivos de backup ou rascunho.
> - Siga o padrão de nomenclatura e tema do Material UI.
> - Consulte o checklist de PR antes de submeter qualquer alteração.

Consulte o `PROJECT_RULES.md` para detalhes, exemplos e regras completas.

---

### Comandos de Terminal (PowerShell)
> Sempre que sugerir comandos de terminal, utilize a sintaxe do PowerShell, compatível com Windows. Explique o que cada comando faz e relacione ao contexto do projeto. Exemplo:
> ```powershell
> Remove-Item -Recurse -Force .next
> # Remove a pasta de build do Next.js para forçar uma recompilação limpa
> ``` 

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