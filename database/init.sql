-- Arquivo: init.sql
-- Descrição: Script para criar as tabelas iniciais do banco de dados DOM no PostgreSQL

-- Criação da tabela de usuários
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    cpf VARCHAR(11) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    user_type VARCHAR(50) NOT NULL, -- 'Empregador', 'Empregado', 'Familiar', 'Administrador', 'Parceiro'
    name VARCHAR(100) NOT NULL,
    preferred_name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    email_verified BOOLEAN DEFAULT FALSE,
    phone VARCHAR(20) UNIQUE,
    phone_verified BOOLEAN DEFAULT FALSE,
    terms_accepted BOOLEAN NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Criação da tabela de tarefas
CREATE TABLE tasks (
    task_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    due_date DATE,
    priority VARCHAR(20), -- 'alta', 'media', 'baixa'
    assigned_to INT REFERENCES users(user_id),
    created_by INT REFERENCES users(user_id),
    status VARCHAR(50), -- 'pendente', 'em progresso', 'concluida'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Criação da tabela de pagamentos
CREATE TABLE payments (
    payment_id SERIAL PRIMARY KEY,
    payer_id INT REFERENCES users(user_id), -- Empregador
    receiver_id INT REFERENCES users(user_id), -- Empregado
    amount DECIMAL(10, 2) NOT NULL,
    payment_date DATE NOT NULL,
    description TEXT,
    status VARCHAR(50), -- 'pendente', 'pago', 'cancelado'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Criação da tabela de documentos
CREATE TABLE documents (
    document_id SERIAL PRIMARY KEY,
    uploaded_by INT REFERENCES users(user_id),
    file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(255) NOT NULL, -- Caminho onde o arquivo está salvo
    category VARCHAR(100),
    expiration_date DATE,
    upload_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Criação da tabela de controle de ponto
CREATE TABLE time_records (
    record_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    clock_in TIMESTAMP WITH TIME ZONE NOT NULL,
    clock_out TIMESTAMP WITH TIME ZONE,
    location_in POINT, -- Pode usar tipos de dados geográficos do PostGIS se necessário
    location_out POINT,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Criação da tabela de avaliações
CREATE TABLE evaluations (
    evaluation_id SERIAL PRIMARY KEY,
    evaluator_id INT REFERENCES users(user_id), -- Quem avaliou (empregador)
    evaluated_id INT REFERENCES users(user_id), -- Quem foi avaliado (empregado)
    evaluation_date DATE NOT NULL,
    score DECIMAL(3, 1),
    comments TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Criação da tabela de itens de compra
CREATE TABLE shopping_items (
    item_id SERIAL PRIMARY KEY,
    requested_by INT REFERENCES users(user_id),
    request_date DATE,
    purchase_date DATE,
    product_name VARCHAR(255) NOT NULL,
    brand_model VARCHAR(100),
    photo_url VARCHAR(255), -- URL da foto do produto
    price DECIMAL(10, 2),
    unit VARCHAR(50),
    quantity DECIMAL(10, 2) NOT NULL,
    observations TEXT,
    category VARCHAR(100), -- Categoria da compra (supermercado, etc.)
    is_purchased BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Criação da tabela de alertas
CREATE TABLE alerts (
    alert_id SERIAL PRIMARY KEY,
    type VARCHAR(100) NOT NULL,
    criteria JSONB, -- Critérios para disparo do alerta
    preferences JSONB, -- Preferências de notificação
    message TEXT,
    created_by INT REFERENCES users(user_id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
); 