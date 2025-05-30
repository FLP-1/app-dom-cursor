# Integração com API do eSocial

## S-1202 - Remuneração de Servidor Vinculado a Regime Próprio de Previdência Social

### Endpoints

#### Criar Evento
```http
POST /api/esocial/events/S-1202
```

**Request Body:**
```json
{
  "ideEvento": {
    "indRetif": 1,
    "nrRecibo": null,
    "perApur": "2024-03",
    "indApuracao": 1,
    "indGuia": 1,
    "tpAmb": 2,
    "procEmi": 1,
    "verProc": "1.0.0"
  },
  "ideEmpregador": {
    "tpInsc": 1,
    "nrInsc": "12345678901234"
  },
  "ideTrabalhador": {
    "cpfTrab": "12345678901",
    "nisTrab": "12345678901",
    "nmTrab": "Nome do Trabalhador",
    "sexo": "M",
    "racaCor": 1,
    "estCiv": 1,
    "grauInstr": "01",
    "nmSoc": null
  },
  "dmDev": [
    {
      "ideDmDev": "1",
      "codCateg": "101",
      "infoPerApur": [
        {
          "ideEstabLot": [
            {
              "tpInsc": 1,
              "nrInsc": "12345678901234",
              "codLotacao": "1",
              "detVerbas": [
                {
                  "codRubr": "1",
                  "ideTabRubr": "1",
                  "qtdRubr": 1,
                  "vrRubr": 1000.00,
                  "indApurIR": 0
                }
              ]
            }
          ]
        }
      ]
    }
  ],
  "infoComplCont": {
    "codCBO": "123456",
    "natAtividade": 1,
    "qtdDiasTrab": 30
  },
  "infoCompl": {
    "observacao": "Observação"
  }
}
```

**Response (200 OK):**
```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "status": "PENDING",
  "createdAt": "2024-03-20T10:00:00Z",
  "updatedAt": "2024-03-20T10:00:00Z"
}
```

#### Atualizar Evento
```http
PUT /api/esocial/events/S-1202/{id}
```

**Request Body:** Mesmo formato do POST

**Response (200 OK):**
```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "status": "PENDING",
  "createdAt": "2024-03-20T10:00:00Z",
  "updatedAt": "2024-03-20T10:00:00Z"
}
```

#### Buscar Evento
```http
GET /api/esocial/events/S-1202/{id}
```

**Response (200 OK):**
```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "status": "PENDING",
  "createdAt": "2024-03-20T10:00:00Z",
  "updatedAt": "2024-03-20T10:00:00Z",
  "data": {
    // Mesmo formato do request body
  }
}
```

#### Listar Eventos
```http
GET /api/esocial/events/S-1202
```

**Query Parameters:**
- `page`: Número da página (default: 1)
- `limit`: Itens por página (default: 10)
- `status`: Filtro por status (opcional)
- `perApur`: Filtro por período de apuração (opcional)
- `cpfTrab`: Filtro por CPF do trabalhador (opcional)

**Response (200 OK):**
```json
{
  "data": [
    {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "status": "PENDING",
      "createdAt": "2024-03-20T10:00:00Z",
      "updatedAt": "2024-03-20T10:00:00Z",
      "data": {
        // Mesmo formato do request body
      }
    }
  ],
  "pagination": {
    "total": 100,
    "page": 1,
    "limit": 10,
    "pages": 10
  }
}
```

### Status do Evento

- `PENDING`: Evento pendente de processamento
- `PROCESSING`: Evento em processamento
- `PROCESSED`: Evento processado com sucesso
- `ERROR`: Evento com erro
- `CANCELLED`: Evento cancelado

### Códigos de Erro

- `400`: Dados inválidos
- `401`: Não autorizado
- `403`: Proibido
- `404`: Evento não encontrado
- `409`: Conflito (ex: evento já retificado)
- `422`: Erro de validação
- `500`: Erro interno do servidor

### Exemplos de Erro

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Dados inválidos",
    "details": [
      {
        "field": "ideEvento.perApur",
        "message": "Período de apuração inválido"
      }
    ]
  }
}
```

### Segurança

1. Autenticação:
   - Token JWT no header Authorization
   - Formato: `Bearer {token}`

2. Autorização:
   - Escopo necessário: `esocial:write`
   - Validação de permissões por empresa

3. Rate Limiting:
   - 100 requisições por minuto
   - Header `X-RateLimit-Limit` e `X-RateLimit-Remaining`

### Validações do Servidor

1. Período de Apuração:
   - Formato: AAAA-MM
   - Não pode ser futuro
   - Não pode ser anterior a 01/2019
   - Não pode ter mais de 12 meses de diferença da data atual

2. CPF/CNPJ:
   - Validação de dígitos verificadores
   - CPF/CNPJ deve estar ativo
   - Empresa deve estar cadastrada no sistema

3. Códigos:
   - CBO deve existir na tabela
   - Categoria deve existir na tabela
   - Rubrica deve existir na tabela

4. Valores:
   - Não podem ser negativos
   - Devem ter no máximo 2 casas decimais
   - Total de verbas deve ser maior que zero

### Webhooks

O sistema envia notificações via webhook quando o status do evento muda:

```http
POST {webhook_url}
```

**Request Body:**
```json
{
  "event": "S-1202",
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "status": "PROCESSED",
  "timestamp": "2024-03-20T10:00:00Z",
  "data": {
    // Dados do evento
  }
}
```

### Logs

Os logs de processamento podem ser consultados via API:

```http
GET /api/esocial/events/S-1202/{id}/logs
```

**Response (200 OK):**
```json
{
  "logs": [
    {
      "timestamp": "2024-03-20T10:00:00Z",
      "level": "INFO",
      "message": "Evento recebido",
      "details": {}
    },
    {
      "timestamp": "2024-03-20T10:00:01Z",
      "level": "ERROR",
      "message": "Erro de validação",
      "details": {
        "field": "ideEvento.perApur",
        "message": "Período de apuração inválido"
      }
    }
  ]
}
``` 