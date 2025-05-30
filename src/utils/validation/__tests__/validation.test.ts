import {
  validateCNPJ,
  validateEmail,
  validateCEP,
  validateDate,
  validateTime,
  validatePassword,
  validateURL,
  validateFile,
  validateBrazilianPhone,
  validateBrazilianCellPhone,
  validateCPF,
  validatePhoneNumber
} from '../index';

describe('Funções de Validação', () => {
  describe('validateCNPJ', () => {
    it('deve validar um CNPJ válido', () => {
      expect(validateCNPJ('11.444.777/0001-61')).toBe(true);
      expect(validateCNPJ('11444777000161')).toBe(true);
    });

    it('deve rejeitar um CNPJ inválido', () => {
      expect(validateCNPJ('11.444.777/0001-62')).toBe(false);
      expect(validateCNPJ('11111111111111')).toBe(false);
      expect(validateCNPJ('123')).toBe(false);
    });
  });

  describe('validateEmail', () => {
    it('deve validar um email válido', () => {
      expect(validateEmail('teste@exemplo.com')).toBe(true);
      expect(validateEmail('teste.nome@exemplo.com.br')).toBe(true);
    });

    it('deve rejeitar um email inválido', () => {
      expect(validateEmail('teste@')).toBe(false);
      expect(validateEmail('teste@exemplo')).toBe(false);
      expect(validateEmail('teste.exemplo.com')).toBe(false);
    });
  });

  describe('validateCEP', () => {
    it('deve validar um CEP válido', () => {
      expect(validateCEP('12345-678')).toBe(true);
      expect(validateCEP('12345678')).toBe(true);
    });

    it('deve rejeitar um CEP inválido', () => {
      expect(validateCEP('12345')).toBe(false);
      expect(validateCEP('123456789')).toBe(false);
    });
  });

  describe('validateDate', () => {
    it('deve validar uma data válida', () => {
      expect(validateDate('2024-02-29')).toBe(true);
      expect(validateDate('2024-12-31')).toBe(true);
    });

    it('deve rejeitar uma data inválida', () => {
      expect(validateDate('2024-13-01')).toBe(false);
      expect(validateDate('2024-02-30')).toBe(false);
      expect(validateDate('2024/02/29')).toBe(false);
    });
  });

  describe('validateTime', () => {
    it('deve validar uma hora válida', () => {
      expect(validateTime('23:59')).toBe(true);
      expect(validateTime('00:00')).toBe(true);
    });

    it('deve rejeitar uma hora inválida', () => {
      expect(validateTime('24:00')).toBe(false);
      expect(validateTime('23:60')).toBe(false);
      expect(validateTime('25:00')).toBe(false);
    });
  });

  describe('validatePassword', () => {
    it('deve validar uma senha válida', () => {
      const result = validatePassword('Senha@123');
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('deve rejeitar uma senha inválida', () => {
      const result = validatePassword('senha');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('A senha deve ter pelo menos 8 caracteres');
      expect(result.errors).toContain('A senha deve conter pelo menos uma letra maiúscula');
      expect(result.errors).toContain('A senha deve conter pelo menos um número');
      expect(result.errors).toContain('A senha deve conter pelo menos um caractere especial');
    });
  });

  describe('validateURL', () => {
    it('deve validar uma URL válida', () => {
      expect(validateURL('https://exemplo.com')).toBe(true);
      expect(validateURL('http://exemplo.com.br')).toBe(true);
    });

    it('deve rejeitar uma URL inválida', () => {
      expect(validateURL('exemplo.com')).toBe(false);
      expect(validateURL('http://')).toBe(false);
    });
  });

  describe('validateFile', () => {
    it('deve validar um arquivo válido', () => {
      const file = new File([''], 'teste.pdf', { type: 'application/pdf' });
      const result = validateFile(file, {
        maxSize: 5 * 1024 * 1024,
        allowedTypes: ['application/pdf']
      });
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('deve rejeitar um arquivo inválido', () => {
      const file = new File([''], 'teste.pdf', { type: 'application/pdf' });
      const result = validateFile(file, {
        maxSize: 1024,
        allowedTypes: ['image/jpeg']
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('O arquivo deve ser do tipo: image/jpeg');
    });
  });

  describe('validateBrazilianPhone', () => {
    it('deve validar um telefone válido', () => {
      expect(validateBrazilianPhone('(11) 3333-4444')).toBe(true);
      expect(validateBrazilianPhone('(11) 33334444')).toBe(true);
    });

    it('deve rejeitar um telefone inválido', () => {
      expect(validateBrazilianPhone('(11) 333-4444')).toBe(false);
      expect(validateBrazilianPhone('(11) 33333-4444')).toBe(false);
    });
  });

  describe('validateBrazilianCellPhone', () => {
    it('deve validar um celular válido', () => {
      expect(validateBrazilianCellPhone('(11) 91234-5678')).toBe(true);
      expect(validateBrazilianCellPhone('(11) 912345678')).toBe(true);
    });

    it('deve rejeitar um celular inválido', () => {
      expect(validateBrazilianCellPhone('(11) 81234-5678')).toBe(false);
      expect(validateBrazilianCellPhone('(11) 9123-5678')).toBe(false);
    });
  });

  describe('validateCPF', () => {
    it('deve validar um CPF válido', () => {
      expect(validateCPF('123.456.789-09')).toBe(true);
      expect(validateCPF('12345678909')).toBe(true);
    });

    it('deve rejeitar um CPF inválido', () => {
      expect(validateCPF('123.456.789-00')).toBe(false);
      expect(validateCPF('11111111111')).toBe(false);
    });
  });

  describe('validatePhoneNumber', () => {
    it('deve validar um número de telefone válido', () => {
      expect(validatePhoneNumber('(11) 3333-4444')).toBe(true);
      expect(validatePhoneNumber('(11) 91234-5678')).toBe(true);
    });

    it('deve rejeitar um número de telefone inválido', () => {
      expect(validatePhoneNumber('(11) 333-4444')).toBe(false);
      expect(validatePhoneNumber('(11) 9123-5678')).toBe(false);
    });
  });
}); 