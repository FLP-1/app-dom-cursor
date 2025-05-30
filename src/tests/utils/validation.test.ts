import {
  isValidEmail,
  isValidPassword,
  isValidCPF,
  isValidCNPJ,
  isValidPhone,
  isValidCEP,
  isValidDate,
  isValidTime,
  isValidURL,
  isValidIP,
  isValidColor,
  isValidCreditCard,
  isValidCPFCNPJ,
  isValidPIS,
  isValidTituloEleitor,
  isValidCNH
} from '../../utils/validation';

describe('validation', () => {
  describe('isValidEmail', () => {
    it('deve validar email correto', () => {
      expect(isValidEmail('teste@email.com')).toBeTruthy();
      expect(isValidEmail('teste.nome@email.com.br')).toBeTruthy();
      expect(isValidEmail('teste+123@email.com')).toBeTruthy();
    });

    it('deve invalidar email incorreto', () => {
      expect(isValidEmail('teste')).toBeFalsy();
      expect(isValidEmail('teste@')).toBeFalsy();
      expect(isValidEmail('@email.com')).toBeFalsy();
      expect(isValidEmail('teste@email')).toBeFalsy();
      expect(isValidEmail('')).toBeFalsy();
    });
  });

  describe('isValidPassword', () => {
    it('deve validar senha forte', () => {
      expect(isValidPassword('Senha@123')).toBeTruthy();
      expect(isValidPassword('Abc@123456')).toBeTruthy();
    });

    it('deve invalidar senha fraca', () => {
      expect(isValidPassword('senha')).toBeFalsy();
      expect(isValidPassword('123456')).toBeFalsy();
      expect(isValidPassword('senha123')).toBeFalsy();
      expect(isValidPassword('Senha123')).toBeFalsy();
      expect(isValidPassword('')).toBeFalsy();
    });
  });

  describe('isValidCPF', () => {
    it('deve validar CPF correto', () => {
      expect(isValidCPF('123.456.789-09')).toBeTruthy();
      expect(isValidCPF('12345678909')).toBeTruthy();
    });

    it('deve invalidar CPF incorreto', () => {
      expect(isValidCPF('123.456.789-00')).toBeFalsy();
      expect(isValidCPF('12345678900')).toBeFalsy();
      expect(isValidCPF('123.456.789-0')).toBeFalsy();
      expect(isValidCPF('')).toBeFalsy();
    });
  });

  describe('isValidCNPJ', () => {
    it('deve validar CNPJ correto', () => {
      expect(isValidCNPJ('12.345.678/0001-95')).toBeTruthy();
      expect(isValidCNPJ('12345678000195')).toBeTruthy();
    });

    it('deve invalidar CNPJ incorreto', () => {
      expect(isValidCNPJ('12.345.678/0001-00')).toBeFalsy();
      expect(isValidCNPJ('12345678000100')).toBeFalsy();
      expect(isValidCNPJ('12.345.678/0001-9')).toBeFalsy();
      expect(isValidCNPJ('')).toBeFalsy();
    });
  });

  describe('isValidPhone', () => {
    it('deve validar telefone correto', () => {
      expect(isValidPhone('(11) 99999-9999')).toBeTruthy();
      expect(isValidPhone('11999999999')).toBeTruthy();
      expect(isValidPhone('(11) 3333-3333')).toBeTruthy();
      expect(isValidPhone('1133333333')).toBeTruthy();
    });

    it('deve invalidar telefone incorreto', () => {
      expect(isValidPhone('(11) 99999-999')).toBeFalsy();
      expect(isValidPhone('1199999999')).toBeFalsy();
      expect(isValidPhone('(11) 3333-333')).toBeFalsy();
      expect(isValidPhone('113333333')).toBeFalsy();
      expect(isValidPhone('')).toBeFalsy();
    });
  });

  describe('isValidCEP', () => {
    it('deve validar CEP correto', () => {
      expect(isValidCEP('12345-678')).toBeTruthy();
      expect(isValidCEP('12345678')).toBeTruthy();
    });

    it('deve invalidar CEP incorreto', () => {
      expect(isValidCEP('12345-67')).toBeFalsy();
      expect(isValidCEP('1234567')).toBeFalsy();
      expect(isValidCEP('')).toBeFalsy();
    });
  });

  describe('isValidDate', () => {
    it('deve validar data correta', () => {
      expect(isValidDate('01/01/2023')).toBeTruthy();
      expect(isValidDate('31/12/2023')).toBeTruthy();
      expect(isValidDate('29/02/2024')).toBeTruthy(); // Ano bissexto
    });

    it('deve invalidar data incorreta', () => {
      expect(isValidDate('32/01/2023')).toBeFalsy();
      expect(isValidDate('29/02/2023')).toBeFalsy(); // Não é ano bissexto
      expect(isValidDate('00/01/2023')).toBeFalsy();
      expect(isValidDate('01/13/2023')).toBeFalsy();
      expect(isValidDate('')).toBeFalsy();
    });
  });

  describe('isValidTime', () => {
    it('deve validar horário correto', () => {
      expect(isValidTime('00:00')).toBeTruthy();
      expect(isValidTime('23:59')).toBeTruthy();
      expect(isValidTime('12:30')).toBeTruthy();
    });

    it('deve invalidar horário incorreto', () => {
      expect(isValidTime('24:00')).toBeFalsy();
      expect(isValidTime('00:60')).toBeFalsy();
      expect(isValidTime('12:61')).toBeFalsy();
      expect(isValidTime('')).toBeFalsy();
    });
  });

  describe('isValidURL', () => {
    it('deve validar URL correta', () => {
      expect(isValidURL('https://www.exemplo.com')).toBeTruthy();
      expect(isValidURL('http://exemplo.com.br')).toBeTruthy();
      expect(isValidURL('https://exemplo.com/pagina')).toBeTruthy();
    });

    it('deve invalidar URL incorreta', () => {
      expect(isValidURL('exemplo.com')).toBeFalsy();
      expect(isValidURL('www.exemplo')).toBeFalsy();
      expect(isValidURL('')).toBeFalsy();
    });
  });

  describe('isValidIP', () => {
    it('deve validar IP correto', () => {
      expect(isValidIP('192.168.0.1')).toBeTruthy();
      expect(isValidIP('10.0.0.1')).toBeTruthy();
      expect(isValidIP('255.255.255.255')).toBeTruthy();
    });

    it('deve invalidar IP incorreto', () => {
      expect(isValidIP('256.168.0.1')).toBeFalsy();
      expect(isValidIP('192.168.0')).toBeFalsy();
      expect(isValidIP('192.168.0.1.1')).toBeFalsy();
      expect(isValidIP('')).toBeFalsy();
    });
  });

  describe('isValidColor', () => {
    it('deve validar cor correta', () => {
      expect(isValidColor('#000000')).toBeTruthy();
      expect(isValidColor('#FFFFFF')).toBeTruthy();
      expect(isValidColor('#FF0000')).toBeTruthy();
      expect(isValidColor('rgb(0, 0, 0)')).toBeTruthy();
      expect(isValidColor('rgba(0, 0, 0, 0.5)')).toBeTruthy();
    });

    it('deve invalidar cor incorreta', () => {
      expect(isValidColor('#00000')).toBeFalsy();
      expect(isValidColor('#0000000')).toBeFalsy();
      expect(isValidColor('rgb(0, 0)')).toBeFalsy();
      expect(isValidColor('rgba(0, 0, 0)')).toBeFalsy();
      expect(isValidColor('')).toBeFalsy();
    });
  });

  describe('isValidCreditCard', () => {
    it('deve validar cartão de crédito correto', () => {
      expect(isValidCreditCard('4532015112830366')).toBeTruthy(); // Visa
      expect(isValidCreditCard('5424000000000015')).toBeTruthy(); // Mastercard
      expect(isValidCreditCard('378282246310005')).toBeTruthy(); // American Express
    });

    it('deve invalidar cartão de crédito incorreto', () => {
      expect(isValidCreditCard('453201511283036')).toBeFalsy();
      expect(isValidCreditCard('45320151128303666')).toBeFalsy();
      expect(isValidCreditCard('')).toBeFalsy();
    });
  });

  describe('isValidCPFCNPJ', () => {
    it('deve validar CPF/CNPJ correto', () => {
      expect(isValidCPFCNPJ('123.456.789-09')).toBeTruthy(); // CPF
      expect(isValidCPFCNPJ('12.345.678/0001-95')).toBeTruthy(); // CNPJ
    });

    it('deve invalidar CPF/CNPJ incorreto', () => {
      expect(isValidCPFCNPJ('123.456.789-00')).toBeFalsy();
      expect(isValidCPFCNPJ('12.345.678/0001-00')).toBeFalsy();
      expect(isValidCPFCNPJ('')).toBeFalsy();
    });
  });

  describe('isValidPIS', () => {
    it('deve validar PIS correto', () => {
      expect(isValidPIS('123.45678.90-1')).toBeTruthy();
      expect(isValidPIS('12345678901')).toBeTruthy();
    });

    it('deve invalidar PIS incorreto', () => {
      expect(isValidPIS('123.45678.90-0')).toBeFalsy();
      expect(isValidPIS('12345678900')).toBeFalsy();
      expect(isValidPIS('')).toBeFalsy();
    });
  });

  describe('isValidTituloEleitor', () => {
    it('deve validar título de eleitor correto', () => {
      expect(isValidTituloEleitor('123456789012')).toBeTruthy();
    });

    it('deve invalidar título de eleitor incorreto', () => {
      expect(isValidTituloEleitor('12345678901')).toBeFalsy();
      expect(isValidTituloEleitor('1234567890123')).toBeFalsy();
      expect(isValidTituloEleitor('')).toBeFalsy();
    });
  });

  describe('isValidCNH', () => {
    it('deve validar CNH correta', () => {
      expect(isValidCNH('12345678901')).toBeTruthy();
    });

    it('deve invalidar CNH incorreta', () => {
      expect(isValidCNH('1234567890')).toBeFalsy();
      expect(isValidCNH('123456789012')).toBeFalsy();
      expect(isValidCNH('')).toBeFalsy();
    });
  });
}); 