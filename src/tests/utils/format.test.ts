import {
  formatDate,
  formatDateTime,
  formatTime,
  formatCurrency,
  formatPercentage,
  formatNumber,
  formatInteger,
  formatDecimal,
  formatCPF,
  formatCNPJ,
  formatPhone,
  formatCEP,
  formatCreditCard,
  formatPIS,
  formatTituloEleitor,
  formatCNH,
  formatCPFCNPJ,
  formatFileSize,
  formatDuration,
  formatRelativeTime
} from '../../utils/format';

describe('format', () => {
  describe('formatDate', () => {
    it('deve formatar data corretamente', () => {
      expect(formatDate('2023-01-01')).toBe('01/01/2023');
      expect(formatDate('2023-12-31')).toBe('31/12/2023');
      expect(formatDate('2024-02-29')).toBe('29/02/2024'); // Ano bissexto
    });

    it('deve lidar com valores inválidos', () => {
      expect(formatDate('')).toBe('');
      expect(formatDate('invalid')).toBe('');
      expect(formatDate('2023-13-01')).toBe('');
    });
  });

  describe('formatDateTime', () => {
    it('deve formatar data e hora corretamente', () => {
      expect(formatDateTime('2023-01-01T12:30:45')).toBe('01/01/2023 12:30:45');
      expect(formatDateTime('2023-12-31T23:59:59')).toBe('31/12/2023 23:59:59');
    });

    it('deve lidar com valores inválidos', () => {
      expect(formatDateTime('')).toBe('');
      expect(formatDateTime('invalid')).toBe('');
      expect(formatDateTime('2023-13-01T12:30:45')).toBe('');
    });
  });

  describe('formatTime', () => {
    it('deve formatar hora corretamente', () => {
      expect(formatTime('12:30:45')).toBe('12:30:45');
      expect(formatTime('23:59:59')).toBe('23:59:59');
    });

    it('deve lidar com valores inválidos', () => {
      expect(formatTime('')).toBe('');
      expect(formatTime('invalid')).toBe('');
      expect(formatTime('25:00:00')).toBe('');
    });
  });

  describe('formatCurrency', () => {
    it('deve formatar moeda corretamente', () => {
      expect(formatCurrency(1234.56)).toBe('R$ 1.234,56');
      expect(formatCurrency(0)).toBe('R$ 0,00');
      expect(formatCurrency(-1234.56)).toBe('-R$ 1.234,56');
    });

    it('deve lidar com valores inválidos', () => {
      expect(formatCurrency(NaN)).toBe('R$ 0,00');
      expect(formatCurrency(Infinity)).toBe('R$ 0,00');
      expect(formatCurrency(-Infinity)).toBe('R$ 0,00');
    });
  });

  describe('formatPercentage', () => {
    it('deve formatar porcentagem corretamente', () => {
      expect(formatPercentage(12.34)).toBe('12,34%');
      expect(formatPercentage(0)).toBe('0%');
      expect(formatPercentage(-12.34)).toBe('-12,34%');
    });

    it('deve lidar com valores inválidos', () => {
      expect(formatPercentage(NaN)).toBe('0%');
      expect(formatPercentage(Infinity)).toBe('0%');
      expect(formatPercentage(-Infinity)).toBe('0%');
    });
  });

  describe('formatNumber', () => {
    it('deve formatar número corretamente', () => {
      expect(formatNumber(1234.56)).toBe('1.234,56');
      expect(formatNumber(0)).toBe('0');
      expect(formatNumber(-1234.56)).toBe('-1.234,56');
    });

    it('deve lidar com valores inválidos', () => {
      expect(formatNumber(NaN)).toBe('');
      expect(formatNumber(Infinity)).toBe('');
      expect(formatNumber(-Infinity)).toBe('');
    });
  });

  describe('formatInteger', () => {
    it('deve formatar número inteiro corretamente', () => {
      expect(formatInteger(1234)).toBe('1.234');
      expect(formatInteger(0)).toBe('0');
      expect(formatInteger(-1234)).toBe('-1.234');
    });

    it('deve lidar com valores inválidos', () => {
      expect(formatInteger(NaN)).toBe('');
      expect(formatInteger(Infinity)).toBe('');
      expect(formatInteger(-Infinity)).toBe('');
    });
  });

  describe('formatDecimal', () => {
    it('deve formatar número decimal corretamente', () => {
      expect(formatDecimal(1234.56)).toBe('1.234,56');
      expect(formatDecimal(0)).toBe('0,00');
      expect(formatDecimal(-1234.56)).toBe('-1.234,56');
    });

    it('deve lidar com valores inválidos', () => {
      expect(formatDecimal(NaN)).toBe('');
      expect(formatDecimal(Infinity)).toBe('');
      expect(formatDecimal(-Infinity)).toBe('');
    });
  });

  describe('formatCPF', () => {
    it('deve formatar CPF corretamente', () => {
      expect(formatCPF('12345678909')).toBe('123.456.789-09');
      expect(formatCPF('123.456.789-09')).toBe('123.456.789-09');
    });

    it('deve lidar com valores inválidos', () => {
      expect(formatCPF('')).toBe('');
      expect(formatCPF('123')).toBe('123');
      expect(formatCPF('1234567890')).toBe('123.456.789-0');
    });
  });

  describe('formatCNPJ', () => {
    it('deve formatar CNPJ corretamente', () => {
      expect(formatCNPJ('12345678000195')).toBe('12.345.678/0001-95');
      expect(formatCNPJ('12.345.678/0001-95')).toBe('12.345.678/0001-95');
    });

    it('deve lidar com valores inválidos', () => {
      expect(formatCNPJ('')).toBe('');
      expect(formatCNPJ('123')).toBe('12.3');
      expect(formatCNPJ('1234567800019')).toBe('12.345.678/0001-9');
    });
  });

  describe('formatPhone', () => {
    it('deve formatar telefone corretamente', () => {
      expect(formatPhone('11999999999')).toBe('(11) 99999-9999');
      expect(formatPhone('(11) 99999-9999')).toBe('(11) 99999-9999');
      expect(formatPhone('1133333333')).toBe('(11) 3333-3333');
      expect(formatPhone('(11) 3333-3333')).toBe('(11) 3333-3333');
    });

    it('deve lidar com valores inválidos', () => {
      expect(formatPhone('')).toBe('');
      expect(formatPhone('11')).toBe('(11');
      expect(formatPhone('1199999999')).toBe('(11) 99999-999');
    });
  });

  describe('formatCEP', () => {
    it('deve formatar CEP corretamente', () => {
      expect(formatCEP('12345678')).toBe('12345-678');
      expect(formatCEP('12345-678')).toBe('12345-678');
    });

    it('deve lidar com valores inválidos', () => {
      expect(formatCEP('')).toBe('');
      expect(formatCEP('123')).toBe('123');
      expect(formatCEP('1234567')).toBe('12345-67');
    });
  });

  describe('formatCreditCard', () => {
    it('deve formatar cartão de crédito corretamente', () => {
      expect(formatCreditCard('4532015112830366')).toBe('4532 0151 1283 0366');
      expect(formatCreditCard('4532 0151 1283 0366')).toBe('4532 0151 1283 0366');
    });

    it('deve lidar com valores inválidos', () => {
      expect(formatCreditCard('')).toBe('');
      expect(formatCreditCard('4532')).toBe('4532 ');
      expect(formatCreditCard('453201511283036')).toBe('4532 0151 1283 036');
    });
  });

  describe('formatPIS', () => {
    it('deve formatar PIS corretamente', () => {
      expect(formatPIS('12345678901')).toBe('123.45678.90-1');
      expect(formatPIS('123.45678.90-1')).toBe('123.45678.90-1');
    });

    it('deve lidar com valores inválidos', () => {
      expect(formatPIS('')).toBe('');
      expect(formatPIS('123')).toBe('123.');
      expect(formatPIS('1234567890')).toBe('123.45678.90-');
    });
  });

  describe('formatTituloEleitor', () => {
    it('deve formatar título de eleitor corretamente', () => {
      expect(formatTituloEleitor('123456789012')).toBe('1234 5678 9012');
      expect(formatTituloEleitor('1234 5678 9012')).toBe('1234 5678 9012');
    });

    it('deve lidar com valores inválidos', () => {
      expect(formatTituloEleitor('')).toBe('');
      expect(formatTituloEleitor('1234')).toBe('1234 ');
      expect(formatTituloEleitor('12345678901')).toBe('1234 5678 901');
    });
  });

  describe('formatCNH', () => {
    it('deve formatar CNH corretamente', () => {
      expect(formatCNH('12345678901')).toBe('123.456.789-01');
      expect(formatCNH('123.456.789-01')).toBe('123.456.789-01');
    });

    it('deve lidar com valores inválidos', () => {
      expect(formatCNH('')).toBe('');
      expect(formatCNH('123')).toBe('123.');
      expect(formatCNH('1234567890')).toBe('123.456.789-0');
    });
  });

  describe('formatCPFCNPJ', () => {
    it('deve formatar CPF/CNPJ corretamente', () => {
      expect(formatCPFCNPJ('12345678909')).toBe('123.456.789-09');
      expect(formatCPFCNPJ('12345678000195')).toBe('12.345.678/0001-95');
    });

    it('deve lidar com valores inválidos', () => {
      expect(formatCPFCNPJ('')).toBe('');
      expect(formatCPFCNPJ('123')).toBe('123');
      expect(formatCPFCNPJ('1234567890')).toBe('123.456.789-0');
      expect(formatCPFCNPJ('1234567800019')).toBe('12.345.678/0001-9');
    });
  });

  describe('formatFileSize', () => {
    it('deve formatar tamanho de arquivo corretamente', () => {
      expect(formatFileSize(0)).toBe('0 B');
      expect(formatFileSize(1024)).toBe('1 KB');
      expect(formatFileSize(1024 * 1024)).toBe('1 MB');
      expect(formatFileSize(1024 * 1024 * 1024)).toBe('1 GB');
    });

    it('deve lidar com valores inválidos', () => {
      expect(formatFileSize(-1)).toBe('0 B');
      expect(formatFileSize(NaN)).toBe('0 B');
      expect(formatFileSize(Infinity)).toBe('0 B');
    });
  });

  describe('formatDuration', () => {
    it('deve formatar duração corretamente', () => {
      expect(formatDuration(0)).toBe('0s');
      expect(formatDuration(60)).toBe('1m');
      expect(formatDuration(3600)).toBe('1h');
      expect(formatDuration(3661)).toBe('1h 1m 1s');
    });

    it('deve lidar com valores inválidos', () => {
      expect(formatDuration(-1)).toBe('0s');
      expect(formatDuration(NaN)).toBe('0s');
      expect(formatDuration(Infinity)).toBe('0s');
    });
  });

  describe('formatRelativeTime', () => {
    it('deve formatar tempo relativo corretamente', () => {
      const now = new Date();
      const oneMinuteAgo = new Date(now.getTime() - 60 * 1000);
      const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
      const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

      expect(formatRelativeTime(oneMinuteAgo)).toBe('1 minuto atrás');
      expect(formatRelativeTime(oneHourAgo)).toBe('1 hora atrás');
      expect(formatRelativeTime(oneDayAgo)).toBe('1 dia atrás');
    });

    it('deve lidar com valores inválidos', () => {
      expect(formatRelativeTime(new Date('invalid'))).toBe('');
      expect(formatRelativeTime(new Date('9999-99-99'))).toBe('');
    });
  });
}); 