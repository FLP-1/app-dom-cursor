## Padrão obrigatório de UI: apenas Material UI

Todos os componentes visuais do projeto devem ser implementados **exclusivamente** com Material UI (MUI). É proibido o uso de componentes de outras bibliotecas de UI (ex: Ant Design, Bootstrap, Chakra, PrimeReact, etc) ou componentes customizados de UI, exceto se baseados no MUI.

- PRs que incluam componentes visuais não-MUI devem ser rejeitados.
- Sempre consulte a documentação oficial do MUI para customizações e dúvidas.
- Em caso de necessidade de componente customizado, este deve ser construído a partir dos componentes do MUI.

Essa regra garante padronização visual, acessibilidade, manutenção e performance em todo o sistema. 