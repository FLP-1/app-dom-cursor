# Plano de Melhorias - Sistema DOM

## 📋 Resumo Executivo

Este documento apresenta um plano estruturado para implementar as melhorias identificadas no sistema DOM, focando em funcionalidades críticas, experiência do usuário e compliance trabalhista.

## 🎯 Objetivos Estratégicos

1. **Simplificar a interface** mantendo funcionalidades robustas
2. **Implementar alertas inteligentes** para vencimentos e obrigações
3. **Integrar com eSocial** para benefícios e compliance
4. **Melhorar suporte ao usuário** com tutoriais e assistência
5. **Focar em vale transporte** como benefício principal

## 📅 Cronograma de Implementação

### Fase 1: Melhorias Críticas (2-3 semanas)
- [ ] Sistema de alertas de vencimento
- [ ] Modo simplificado da interface
- [ ] Tooltips contextuais melhorados
- [ ] Suporte WhatsApp básico

### Fase 2: Funcionalidades Essenciais (4-6 semanas)
- [ ] Integração eSocial para benefícios
- [ ] Gestão de vale transporte
- [ ] Cálculo de feriados no ponto
- [ ] Tutoriais em vídeo

### Fase 3: Experiência Avançada (6-8 semanas)
- [ ] Assistente virtual
- [ ] Modo avançado da interface
- [ ] Integração Telegram
- [ ] Webinars educativos

## 🔧 Implementações Detalhadas

### 1. Sistema de Alertas Inteligentes

#### 1.1 Alertas de Documentos
```typescript
// Tipos de alerta para documentos
interface DocumentAlert {
  type: 'DOCUMENT_EXPIRATION';
  documentId: string;
  daysUntilExpiration: number;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  channels: ('EMAIL' | 'SMS' | 'PUSH' | 'WHATSAPP')[];
}
```

#### 1.2 Alertas de Ponto
```typescript
// Alertas para registro de ponto
interface TimeRecordAlert {
  type: 'OVERTIME' | 'HOLIDAY_WORK' | 'MISSING_RECORD';
  timeRecordId: string;
  message: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
}
```

#### 1.3 Implementação
- **Cron job** para verificar vencimentos diariamente
- **Notificações push** no navegador
- **Integração WhatsApp** para alertas urgentes
- **Dashboard de alertas** centralizado

### 2. Modo Simplificado da Interface

#### 2.1 Componente de Toggle
```typescript
interface SimpleModeToggle {
  isSimpleMode: boolean;
  onToggle: () => void;
  userPreference: 'SIMPLE' | 'ADVANCED';
}
```

#### 2.2 Funcionalidades Simplificadas
- **Dashboard reduzido** com apenas 3-4 cards principais
- **Formulários guiados** com assistente passo-a-passo
- **Terminologia simplificada** (ex: "Pagar salário" em vez de "Remuneração")
- **Ações principais** em destaque

#### 2.3 Implementação
- **Context API** para gerenciar modo
- **Componentes condicionais** baseados no modo
- **Persistência** da preferência do usuário
- **Tutorial inicial** para novos usuários

### 3. Integração eSocial para Benefícios

#### 3.1 API eSocial Doméstico
```typescript
interface EsocialBenefitsAPI {
  // Capturar holerite
  getHolerite(month: string, year: string): Promise<Holerite>;
  
  // Guias para pagamento
  getPaymentGuides(month: string, year: string): Promise<PaymentGuide[]>;
  
  // Benefícios do trabalhador
  getWorkerBenefits(cpf: string): Promise<Benefit[]>;
}
```

#### 3.2 Benefícios Principais
- **Vale Transporte**: Cálculo automático baseado em distância
- **13º Salário**: Cálculo automático com base no salário
- **Férias**: Controle de período aquisitivo e gozo
- **FGTS**: Cálculo automático (8% do salário)

#### 3.3 Implementação
- **Serviço de integração** com eSocial
- **Cache local** para dados frequentes
- **Sincronização automática** mensal
- **Relatórios** de benefícios

### 4. Gestão de Vale Transporte

#### 4.1 Modelo de Dados
```typescript
interface ValeTransporte {
  id: string;
  empregadoId: string;
  valorDiario: number;
  diasTrabalhados: number;
  valorMensal: number;
  descontoINSS: number;
  valorFinal: number;
  mesReferencia: string;
  anoReferencia: string;
}
```

#### 4.2 Cálculo Automático
- **Base de cálculo**: 6% do salário
- **Desconto INSS**: 6% sobre o valor
- **Limite máximo**: Valor da passagem × dias úteis
- **Integração** com registro de ponto

#### 4.3 Interface
- **Formulário simplificado** para configuração
- **Cálculo automático** mensal
- **Relatórios** de gastos
- **Alertas** de vencimento

### 5. Cálculo de Feriados no Ponto

#### 5.1 Lógica de Cálculo
```typescript
interface HolidayCalculation {
  isHoliday: boolean;
  isWorked: boolean;
  hoursWorked: number;
  overtimeHours: number;
  holidayBonus: number;
}
```

#### 5.2 Implementação
- **API de feriados** nacionais e estaduais
- **Cálculo automático** de horas extras em feriados
- **Dobro da hora** para trabalho em feriados
- **Alertas** para feriados próximos

### 6. Suporte ao Usuário

#### 6.1 WhatsApp Business API
```typescript
interface WhatsAppSupport {
  sendMessage(phone: string, message: string): Promise<void>;
  sendTemplate(phone: string, template: string, variables: object): Promise<void>;
  receiveMessage(webhook: WebhookData): void;
}
```

#### 6.2 Telegram Bot
```typescript
interface TelegramBot {
  sendMessage(chatId: string, message: string): Promise<void>;
  sendDocument(chatId: string, document: File): Promise<void>;
  handleCommand(command: string, chatId: string): Promise<void>;
}
```

#### 6.3 Tutoriais e Educação
- **Vídeos curtos** (2-3 minutos) por funcionalidade
- **FAQ interativo** com busca inteligente
- **Webinars mensais** gratuitos
- **Blog** com dicas e novidades

## 🛠️ Arquitetura Técnica

### 1. Estrutura de Alertas
```
src/
├── services/
│   ├── alert.service.ts          # Serviço principal de alertas
│   ├── document-alert.service.ts # Alertas de documentos
│   ├── time-alert.service.ts     # Alertas de ponto
│   └── notification.service.ts   # Envio de notificações
├── hooks/
│   ├── useAlerts.ts              # Hook para alertas
│   ├── useSimpleMode.ts          # Hook para modo simplificado
│   └── useNotifications.ts       # Hook para notificações
└── components/
    ├── alerts/
    │   ├── AlertDashboard.tsx    # Dashboard de alertas
    │   ├── AlertCard.tsx         # Card de alerta individual
    │   └── AlertSettings.tsx     # Configurações de alertas
    └── ui/
        ├── SimpleModeToggle.tsx  # Toggle do modo simplificado
        └── TutorialOverlay.tsx   # Overlay de tutoriais
```

### 2. Integração eSocial
```
src/
├── services/
│   ├── esocial/
│   │   ├── api.ts                # Cliente da API eSocial
│   │   ├── benefits.service.ts   # Serviço de benefícios
│   │   ├── holerite.service.ts   # Serviço de holerite
│   │   └── payment.service.ts    # Serviço de pagamentos
│   └── cache/
│       └── esocial-cache.ts      # Cache local dos dados
├── hooks/
│   ├── useEsocialBenefits.ts     # Hook para benefícios
│   ├── useHolerite.ts            # Hook para holerite
│   └── usePaymentGuides.ts       # Hook para guias
└── components/
    └── esocial/
        ├── BenefitsCard.tsx      # Card de benefícios
        ├── HoleriteViewer.tsx    # Visualizador de holerite
        └── PaymentGuideList.tsx  # Lista de guias
```

### 3. Vale Transporte
```
src/
├── services/
│   └── vale-transporte.service.ts # Serviço de vale transporte
├── hooks/
│   └── useValeTransporte.ts       # Hook para vale transporte
├── components/
│   └── vale-transporte/
│       ├── ValeTransporteForm.tsx # Formulário de configuração
│       ├── ValeTransporteCard.tsx # Card de resumo
│       └── ValeTransporteReport.tsx # Relatório mensal
└── utils/
    └── vale-transporte-calc.ts    # Cálculos de vale transporte
```

## 📊 Métricas de Sucesso

### 1. Experiência do Usuário
- **Taxa de retenção**: > 80% após 30 dias
- **Tempo de onboarding**: < 10 minutos
- **Satisfação**: > 4.5/5 estrelas
- **Suporte**: < 24h para resposta

### 2. Funcionalidades
- **Alertas**: 95% de precisão
- **Integração eSocial**: 99.9% de uptime
- **Cálculos**: 100% de precisão
- **Performance**: < 2s de carregamento

### 3. Compliance
- **Documentos**: 100% dentro do prazo
- **Ponto**: 100% de registros válidos
- **Benefícios**: 100% de cálculos corretos
- **Feriados**: 100% de identificação

## 🚀 Próximos Passos

### Semana 1-2: Preparação
1. **Setup do ambiente** de desenvolvimento
2. **Configuração** das APIs (WhatsApp, Telegram, eSocial)
3. **Criação** dos componentes base
4. **Testes** de integração

### Semana 3-4: Implementação Core
1. **Sistema de alertas** básico
2. **Modo simplificado** da interface
3. **Integração eSocial** inicial
4. **Cálculo de vale transporte**

### Semana 5-6: Refinamento
1. **Testes** de usabilidade
2. **Ajustes** baseados em feedback
3. **Documentação** de usuário
4. **Treinamento** da equipe

### Semana 7-8: Lançamento
1. **Deploy** em produção
2. **Monitoramento** de métricas
3. **Suporte** intensivo
4. **Coleta** de feedback

## 💡 Considerações Finais

Este plano prioriza:
- **Simplicidade** na interface
- **Automação** de processos
- **Compliance** trabalhista
- **Experiência** do usuário
- **Escalabilidade** do sistema

A implementação deve ser **iterativa** e **baseada em feedback** dos usuários reais, ajustando prioridades conforme necessário. 