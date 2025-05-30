-- Arquivo: alter_alerts_table.sql
-- Descrição: Script para adicionar colunas severity e channels à tabela alerts

-- Adiciona a coluna severity (nível de severidade do alerta)
ALTER TABLE alerts
ADD COLUMN severity VARCHAR(50);

-- Adiciona a coluna channels (canais de notificação selecionados)
-- Usando JSONB para armazenar um array de strings (ex: ['email', 'push'])
ALTER TABLE alerts
ADD COLUMN channels JSONB;

-- Opcional: Adicionar NOT NULL ou DEFAULT constraints se necessário
-- ALTER TABLE alerts ADD COLUMN severity VARCHAR(50) NOT NULL DEFAULT 'baixa';
-- ALTER TABLE alerts ADD COLUMN channels JSONB NOT NULL DEFAULT '[]'; 