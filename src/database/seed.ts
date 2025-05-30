import { pool } from './db';

const alerts = [
  {
    type: 'documento',
    message: 'Documento de identidade próximo do vencimento',
    severity: 'urgent',
    status: 'active',
    channels: ['email', 'sms'],
    criteria: { daysUntilExpiration: 30 },
    preferences: { notifyBefore: 7 }
  },
  {
    type: 'pagamento',
    message: 'Pagamento de salário pendente',
    severity: 'high',
    status: 'active',
    channels: ['email'],
    criteria: { dueDate: '2024-05-25' },
    preferences: { notifyBefore: 3 }
  },
  {
    type: 'tarefa',
    message: 'Limpeza semanal pendente',
    severity: 'medium',
    status: 'active',
    channels: ['email', 'push'],
    criteria: { frequency: 'weekly' },
    preferences: { notifyBefore: 1 }
  },
  {
    type: 'documento',
    message: 'Certidão de casamento vencida',
    severity: 'urgent',
    status: 'active',
    channels: ['email', 'sms', 'push'],
    criteria: { isExpired: true },
    preferences: { notifyBefore: 0 }
  },
  {
    type: 'pagamento',
    message: 'Pagamento de contas em atraso',
    severity: 'high',
    status: 'active',
    channels: ['email', 'sms'],
    criteria: { isOverdue: true },
    preferences: { notifyBefore: 0 }
  }
];

async function seedDatabase() {
  try {
    console.log('Iniciando inserção de dados de teste...');

    // Limpa a tabela existente
    await pool.query('TRUNCATE TABLE alerts RESTART IDENTITY CASCADE');
    console.log('Tabela alerts limpa com sucesso!');

    // Insere os dados de teste
    for (const alert of alerts) {
      await pool.query(
        `INSERT INTO alerts (type, message, severity, status, channels, criteria, preferences)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [
          alert.type,
          alert.message,
          alert.severity,
          alert.status,
          JSON.stringify(alert.channels),
          JSON.stringify(alert.criteria),
          JSON.stringify(alert.preferences)
        ]
      );
    }

    console.log('✅ Dados de teste inseridos com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao inserir dados de teste:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

// Executa o seed
seedDatabase(); 