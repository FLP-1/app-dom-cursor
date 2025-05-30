# Regras de Formulários e Boas Práticas

Este projeto segue as regras detalhadas no arquivo `PROJECT_RULES.md`. Todas as regras são obrigatórias para o time e para a IA. Consulte também o `.cursorrules` para as regras lidas automaticamente pela IA do Cursor.

## Resumo das principais regras
- Sempre use hook customizado para cada formulário (ex: useLoginForm, useCompraForm).
- Todos os campos reutilizáveis DEVEM receber a prop `control` do hook customizado.
- Não misture `<FormProvider>` e prop `control` no mesmo formulário.
- Testes automatizados devem cobrir o fluxo dos formulários.
- Siga o checklist de PRs e corrija qualquer violação antes de submeter.
- O lint do projeto impede uso incorreto de campos reutilizáveis.

Consulte o `PROJECT_RULES.md` para detalhes, exemplos e regras completas.

## Padrão obrigatório
- Sempre use hook customizado para cada formulário (ex: useLoginForm, useCompraForm).
- Todos os campos reutilizáveis DEVEM receber a prop `control` do hook customizado.
- Não misture `<FormProvider>` e prop `control` no mesmo formulário.
- Siga o checklist de PRs e corrija qualquer violação antes de submeter.
- O lint do projeto impede uso incorreto de campos reutilizáveis.

## Checklist de PR (resumido)
- [ ] Campos reutilizáveis recebem prop control?
- [ ] Sem uso misto de contextos?
- [ ] Lógica centralizada no hook?
- [ ] Testes cobrindo o fluxo?

## Exemplo correto
```tsx
const { control } = useLoginForm();
<FormInput name="cpf" control={control} />
```

## Exemplo incorreto
```tsx
<FormInput name="cpf" /> // ERRADO
```

## Comandos de Terminal (PowerShell)
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