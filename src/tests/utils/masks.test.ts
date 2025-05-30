import {
  maskCPF,
  maskCNPJ,
  maskPhone,
  maskCEP,
  maskDate,
  maskTime,
  maskCreditCard,
  maskPIS,
  maskTituloEleitor,
  maskCNH,
  maskCurrency,
  maskPercentage,
  maskNumber,
  maskInteger,
  maskDecimal,
  maskCPFCNPJ
} from '../../utils/masks';

describe('masks', () => {
  describe('maskCPF', () => {
    it('deve aplicar máscara de CPF corretamente', () => {
      expect(maskCPF('12345678909')).toBe('123.456.789-09');
      expect(maskCPF('123.456.789-09')).toBe('123.456.789-09');
    });

    it('deve lidar com valores inválidos', () => {
      expect(maskCPF('')).toBe('');
      expect(maskCPF('123')).toBe('123');
      expect(maskCPF('1234567890')).toBe('123.456.789-0');
    });
  });

  describe('maskCNPJ', () => {
    it('deve aplicar máscara de CNPJ corretamente', () => {
      expect(maskCNPJ('12345678000195')).toBe('12.345.678/0001-95');
      expect(maskCNPJ('12.345.678/0001-95')).toBe('12.345.678/0001-95');
    });

    it('deve lidar com valores inválidos', () => {
      expect(maskCNPJ('')).toBe('');
      expect(maskCNPJ('123')).toBe('12.3');
      expect(maskCNPJ('1234567800019')).toBe('12.345.678/0001-9');
    });
  });

  describe('maskPhone', () => {
    it('deve aplicar máscara de telefone corretamente', () => {
      expect(maskPhone('11999999999')).toBe('(11) 99999-9999');
      expect(maskPhone('(11) 99999-9999')).toBe('(11) 99999-9999');
      expect(maskPhone('1133333333')).toBe('(11) 3333-3333');
      expect(maskPhone('(11) 3333-3333')).toBe('(11) 3333-3333');
    });

    it('deve lidar com valores inválidos', () => {
      expect(maskPhone('')).toBe('');
      expect(maskPhone('11')).toBe('(11');
      expect(maskPhone('1199999999')).toBe('(11) 99999-999');
    });
  });

  describe('maskCEP', () => {
    it('deve aplicar máscara de CEP corretamente', () => {
      expect(maskCEP('12345678')).toBe('12345-678');
      expect(maskCEP('12345-678')).toBe('12345-678');
    });

    it('deve lidar com valores inválidos', () => {
      expect(maskCEP('')).toBe('');
      expect(maskCEP('123')).toBe('123');
      expect(maskCEP('1234567')).toBe('12345-67');
    });
  });

  describe('maskDate', () => {
    it('deve aplicar máscara de data corretamente', () => {
      expect(maskDate('01012023')).toBe('01/01/2023');
      expect(maskDate('01/01/2023')).toBe('01/01/2023');
    });

    it('deve lidar com valores inválidos', () => {
      expect(maskDate('')).toBe('');
      expect(maskDate('01')).toBe('01/');
      expect(maskDate('0101')).toBe('01/01/');
    });
  });

  describe('maskTime', () => {
    it('deve aplicar máscara de horário corretamente', () => {
      expect(maskTime('2359')).toBe('23:59');
      expect(maskTime('23:59')).toBe('23:59');
    });

    it('deve lidar com valores inválidos', () => {
      expect(maskTime('')).toBe('');
      expect(maskTime('23')).toBe('23:');
      expect(maskTime('235')).toBe('23:5');
    });
  });

  describe('maskCreditCard', () => {
    it('deve aplicar máscara de cartão de crédito corretamente', () => {
      expect(maskCreditCard('4532015112830366')).toBe('4532 0151 1283 0366');
      expect(maskCreditCard('4532 0151 1283 0366')).toBe('4532 0151 1283 0366');
    });

    it('deve lidar com valores inválidos', () => {
      expect(maskCreditCard('')).toBe('');
      expect(maskCreditCard('4532')).toBe('4532 ');
      expect(maskCreditCard('453201511283036')).toBe('4532 0151 1283 036');
    });
  });

  describe('maskPIS', () => {
    it('deve aplicar máscara de PIS corretamente', () => {
      expect(maskPIS('12345678901')).toBe('123.45678.90-1');
      expect(maskPIS('123.45678.90-1')).toBe('123.45678.90-1');
    });

    it('deve lidar com valores inválidos', () => {
      expect(maskPIS('')).toBe('');
      expect(maskPIS('123')).toBe('123.');
      expect(maskPIS('1234567890')).toBe('123.45678.90-');
    });
  });

  describe('maskTituloEleitor', () => {
    it('deve aplicar máscara de título de eleitor corretamente', () => {
      expect(maskTituloEleitor('123456789012')).toBe('1234 5678 9012');
      expect(maskTituloEleitor('1234 5678 9012')).toBe('1234 5678 9012');
    });

    it('deve lidar com valores inválidos', () => {
      expect(maskTituloEleitor('')).toBe('');
      expect(maskTituloEleitor('1234')).toBe('1234 ');
      expect(maskTituloEleitor('12345678901')).toBe('1234 5678 901');
    });
  });

  describe('maskCNH', () => {
    it('deve aplicar máscara de CNH corretamente', () => {
      expect(maskCNH('12345678901')).toBe('123.456.789-01');
      expect(maskCNH('123.456.789-01')).toBe('123.456.789-01');
    });

    it('deve lidar com valores inválidos', () => {
      expect(maskCNH('')).toBe('');
      expect(maskCNH('123')).toBe('123.');
      expect(maskCNH('1234567890')).toBe('123.456.789-0');
    });
  });

  describe('maskCurrency', () => {
    it('deve aplicar máscara de moeda corretamente', () => {
      expect(maskCurrency('1234567')).toBe('R$ 12.345,67');
      expect(maskCurrency('1234567,89')).toBe('R$ 12.345,67');
      expect(maskCurrency('R$ 12.345,67')).toBe('R$ 12.345,67');
    });

    it('deve lidar com valores inválidos', () => {
      expect(maskCurrency('')).toBe('R$ 0,00');
      expect(maskCurrency('abc')).toBe('R$ 0,00');
      expect(maskCurrency('123,456')).toBe('R$ 123,45');
    });
  });

  describe('maskPercentage', () => {
    it('deve aplicar máscara de porcentagem corretamente', () => {
      expect(maskPercentage('1234')).toBe('12,34%');
      expect(maskPercentage('1234,56')).toBe('12,34%');
      expect(maskPercentage('12,34%')).toBe('12,34%');
    });

    it('deve lidar com valores inválidos', () => {
      expect(maskPercentage('')).toBe('0%');
      expect(maskPercentage('abc')).toBe('0%');
      expect(maskPercentage('123,456')).toBe('123,45%');
    });
  });

  describe('maskNumber', () => {
    it('deve aplicar máscara de número corretamente', () => {
      expect(maskNumber('1234567')).toBe('1.234.567');
      expect(maskNumber('1234567,89')).toBe('1.234.567,89');
      expect(maskNumber('1.234.567,89')).toBe('1.234.567,89');
    });

    it('deve lidar com valores inválidos', () => {
      expect(maskNumber('')).toBe('');
      expect(maskNumber('abc')).toBe('');
      expect(maskNumber('123,456')).toBe('123,456');
    });
  });

  describe('maskInteger', () => {
    it('deve aplicar máscara de número inteiro corretamente', () => {
      expect(maskInteger('1234567')).toBe('1.234.567');
      expect(maskInteger('1.234.567')).toBe('1.234.567');
    });

    it('deve lidar com valores inválidos', () => {
      expect(maskInteger('')).toBe('');
      expect(maskInteger('abc')).toBe('');
      expect(maskInteger('123,456')).toBe('123.456');
    });
  });

  describe('maskDecimal', () => {
    it('deve aplicar máscara de número decimal corretamente', () => {
      expect(maskDecimal('1234567')).toBe('12.345,67');
      expect(maskDecimal('1234567,89')).toBe('12.345,67');
      expect(maskDecimal('12.345,67')).toBe('12.345,67');
    });

    it('deve lidar com valores inválidos', () => {
      expect(maskDecimal('')).toBe('');
      expect(maskDecimal('abc')).toBe('');
      expect(maskDecimal('123,456')).toBe('123,45');
    });
  });

  describe('maskCPFCNPJ', () => {
    it('deve aplicar máscara de CPF/CNPJ corretamente', () => {
      expect(maskCPFCNPJ('12345678909')).toBe('123.456.789-09');
      expect(maskCPFCNPJ('12345678000195')).toBe('12.345.678/0001-95');
    });

    it('deve lidar com valores inválidos', () => {
      expect(maskCPFCNPJ('')).toBe('');
      expect(maskCPFCNPJ('123')).toBe('123');
      expect(maskCPFCNPJ('1234567890')).toBe('123.456.789-0');
      expect(maskCPFCNPJ('1234567800019')).toBe('12.345.678/0001-9');
    });
  });
}); 