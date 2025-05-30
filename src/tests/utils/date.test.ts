import {
  isValidDate,
  isLeapYear,
  getDaysInMonth,
  getFirstDayOfMonth,
  getLastDayOfMonth,
  addDays,
  addMonths,
  addYears,
  subtractDays,
  subtractMonths,
  subtractYears,
  getStartOfDay,
  getEndOfDay,
  getStartOfWeek,
  getEndOfWeek,
  getStartOfMonth,
  getEndOfMonth,
  getStartOfYear,
  getEndOfYear,
  isSameDay,
  isSameMonth,
  isSameYear,
  isBefore,
  isAfter,
  isBetween,
  formatDate,
  parseDate,
  getAge,
  getBusinessDays,
  getWeekNumber,
  getQuarter,
  getSemester
} from '../../utils/date';

describe('date', () => {
  describe('isValidDate', () => {
    it('deve validar data correta', () => {
      expect(isValidDate('2023-01-01')).toBeTruthy();
      expect(isValidDate('2023-12-31')).toBeTruthy();
      expect(isValidDate('2024-02-29')).toBeTruthy(); // Ano bissexto
    });

    it('deve invalidar data incorreta', () => {
      expect(isValidDate('')).toBeFalsy();
      expect(isValidDate('invalid')).toBeFalsy();
      expect(isValidDate('2023-13-01')).toBeFalsy();
      expect(isValidDate('2023-02-29')).toBeFalsy(); // Não é ano bissexto
    });
  });

  describe('isLeapYear', () => {
    it('deve identificar ano bissexto corretamente', () => {
      expect(isLeapYear(2020)).toBeTruthy();
      expect(isLeapYear(2024)).toBeTruthy();
      expect(isLeapYear(2000)).toBeTruthy();
    });

    it('deve identificar ano não bissexto corretamente', () => {
      expect(isLeapYear(2021)).toBeFalsy();
      expect(isLeapYear(2023)).toBeFalsy();
      expect(isLeapYear(2100)).toBeFalsy();
    });
  });

  describe('getDaysInMonth', () => {
    it('deve retornar número correto de dias no mês', () => {
      expect(getDaysInMonth(2023, 1)).toBe(31); // Janeiro
      expect(getDaysInMonth(2023, 2)).toBe(28); // Fevereiro (não bissexto)
      expect(getDaysInMonth(2024, 2)).toBe(29); // Fevereiro (bissexto)
      expect(getDaysInMonth(2023, 4)).toBe(30); // Abril
    });
  });

  describe('getFirstDayOfMonth', () => {
    it('deve retornar primeiro dia do mês corretamente', () => {
      expect(getFirstDayOfMonth('2023-01-15')).toBe('2023-01-01');
      expect(getFirstDayOfMonth('2023-12-31')).toBe('2023-12-01');
    });
  });

  describe('getLastDayOfMonth', () => {
    it('deve retornar último dia do mês corretamente', () => {
      expect(getLastDayOfMonth('2023-01-15')).toBe('2023-01-31');
      expect(getLastDayOfMonth('2023-02-15')).toBe('2023-02-28');
      expect(getLastDayOfMonth('2024-02-15')).toBe('2024-02-29');
    });
  });

  describe('addDays', () => {
    it('deve adicionar dias corretamente', () => {
      expect(addDays('2023-01-01', 1)).toBe('2023-01-02');
      expect(addDays('2023-01-31', 1)).toBe('2023-02-01');
      expect(addDays('2023-12-31', 1)).toBe('2024-01-01');
    });
  });

  describe('addMonths', () => {
    it('deve adicionar meses corretamente', () => {
      expect(addMonths('2023-01-15', 1)).toBe('2023-02-15');
      expect(addMonths('2023-01-31', 1)).toBe('2023-02-28');
      expect(addMonths('2023-12-15', 1)).toBe('2024-01-15');
    });
  });

  describe('addYears', () => {
    it('deve adicionar anos corretamente', () => {
      expect(addYears('2023-01-15', 1)).toBe('2024-01-15');
      expect(addYears('2024-02-29', 1)).toBe('2025-02-28');
    });
  });

  describe('subtractDays', () => {
    it('deve subtrair dias corretamente', () => {
      expect(subtractDays('2023-01-02', 1)).toBe('2023-01-01');
      expect(subtractDays('2023-02-01', 1)).toBe('2023-01-31');
      expect(subtractDays('2024-01-01', 1)).toBe('2023-12-31');
    });
  });

  describe('subtractMonths', () => {
    it('deve subtrair meses corretamente', () => {
      expect(subtractMonths('2023-02-15', 1)).toBe('2023-01-15');
      expect(subtractMonths('2023-02-28', 1)).toBe('2023-01-28');
      expect(subtractMonths('2024-01-15', 1)).toBe('2023-12-15');
    });
  });

  describe('subtractYears', () => {
    it('deve subtrair anos corretamente', () => {
      expect(subtractYears('2024-01-15', 1)).toBe('2023-01-15');
      expect(subtractYears('2024-02-29', 1)).toBe('2023-02-28');
    });
  });

  describe('getStartOfDay', () => {
    it('deve retornar início do dia corretamente', () => {
      expect(getStartOfDay('2023-01-15 12:30:45')).toBe('2023-01-15 00:00:00');
    });
  });

  describe('getEndOfDay', () => {
    it('deve retornar fim do dia corretamente', () => {
      expect(getEndOfDay('2023-01-15 12:30:45')).toBe('2023-01-15 23:59:59');
    });
  });

  describe('getStartOfWeek', () => {
    it('deve retornar início da semana corretamente', () => {
      expect(getStartOfWeek('2023-01-15')).toBe('2023-01-15');
      expect(getStartOfWeek('2023-01-16')).toBe('2023-01-15');
    });
  });

  describe('getEndOfWeek', () => {
    it('deve retornar fim da semana corretamente', () => {
      expect(getEndOfWeek('2023-01-15')).toBe('2023-01-21');
      expect(getEndOfWeek('2023-01-16')).toBe('2023-01-21');
    });
  });

  describe('getStartOfMonth', () => {
    it('deve retornar início do mês corretamente', () => {
      expect(getStartOfMonth('2023-01-15')).toBe('2023-01-01');
      expect(getStartOfMonth('2023-12-31')).toBe('2023-12-01');
    });
  });

  describe('getEndOfMonth', () => {
    it('deve retornar fim do mês corretamente', () => {
      expect(getEndOfMonth('2023-01-15')).toBe('2023-01-31');
      expect(getEndOfMonth('2023-02-15')).toBe('2023-02-28');
      expect(getEndOfMonth('2024-02-15')).toBe('2024-02-29');
    });
  });

  describe('getStartOfYear', () => {
    it('deve retornar início do ano corretamente', () => {
      expect(getStartOfYear('2023-01-15')).toBe('2023-01-01');
      expect(getStartOfYear('2023-12-31')).toBe('2023-01-01');
    });
  });

  describe('getEndOfYear', () => {
    it('deve retornar fim do ano corretamente', () => {
      expect(getEndOfYear('2023-01-15')).toBe('2023-12-31');
      expect(getEndOfYear('2023-12-31')).toBe('2023-12-31');
    });
  });

  describe('isSameDay', () => {
    it('deve comparar dias corretamente', () => {
      expect(isSameDay('2023-01-15', '2023-01-15')).toBeTruthy();
      expect(isSameDay('2023-01-15 12:30:45', '2023-01-15 23:59:59')).toBeTruthy();
      expect(isSameDay('2023-01-15', '2023-01-16')).toBeFalsy();
    });
  });

  describe('isSameMonth', () => {
    it('deve comparar meses corretamente', () => {
      expect(isSameMonth('2023-01-15', '2023-01-31')).toBeTruthy();
      expect(isSameMonth('2023-01-15', '2023-02-01')).toBeFalsy();
    });
  });

  describe('isSameYear', () => {
    it('deve comparar anos corretamente', () => {
      expect(isSameYear('2023-01-15', '2023-12-31')).toBeTruthy();
      expect(isSameYear('2023-01-15', '2024-01-01')).toBeFalsy();
    });
  });

  describe('isBefore', () => {
    it('deve comparar datas corretamente', () => {
      expect(isBefore('2023-01-15', '2023-01-16')).toBeTruthy();
      expect(isBefore('2023-01-15', '2023-01-15')).toBeFalsy();
      expect(isBefore('2023-01-16', '2023-01-15')).toBeFalsy();
    });
  });

  describe('isAfter', () => {
    it('deve comparar datas corretamente', () => {
      expect(isAfter('2023-01-16', '2023-01-15')).toBeTruthy();
      expect(isAfter('2023-01-15', '2023-01-15')).toBeFalsy();
      expect(isAfter('2023-01-15', '2023-01-16')).toBeFalsy();
    });
  });

  describe('isBetween', () => {
    it('deve verificar se data está entre outras duas datas', () => {
      expect(isBetween('2023-01-15', '2023-01-01', '2023-01-31')).toBeTruthy();
      expect(isBetween('2023-01-15', '2023-01-15', '2023-01-15')).toBeTruthy();
      expect(isBetween('2023-01-15', '2023-01-16', '2023-01-31')).toBeFalsy();
    });
  });

  describe('formatDate', () => {
    it('deve formatar data corretamente', () => {
      expect(formatDate('2023-01-15')).toBe('15/01/2023');
      expect(formatDate('2023-01-15', 'YYYY-MM-DD')).toBe('2023-01-15');
      expect(formatDate('2023-01-15', 'DD/MM/YYYY')).toBe('15/01/2023');
    });
  });

  describe('parseDate', () => {
    it('deve converter string para data corretamente', () => {
      expect(parseDate('15/01/2023')).toBe('2023-01-15');
      expect(parseDate('2023-01-15')).toBe('2023-01-15');
    });

    it('deve lidar com valores inválidos', () => {
      expect(parseDate('')).toBe('');
      expect(parseDate('invalid')).toBe('');
    });
  });

  describe('getAge', () => {
    it('deve calcular idade corretamente', () => {
      const today = new Date();
      const birthDate = new Date(today.getFullYear() - 25, today.getMonth(), today.getDate());
      expect(getAge(birthDate.toISOString())).toBe(25);
    });
  });

  describe('getBusinessDays', () => {
    it('deve calcular dias úteis corretamente', () => {
      expect(getBusinessDays('2023-01-01', '2023-01-07')).toBe(5); // Domingo a Sábado
      expect(getBusinessDays('2023-01-01', '2023-01-01')).toBe(0); // Domingo
      expect(getBusinessDays('2023-01-02', '2023-01-02')).toBe(1); // Segunda
    });
  });

  describe('getWeekNumber', () => {
    it('deve retornar número da semana corretamente', () => {
      expect(getWeekNumber('2023-01-01')).toBe(1);
      expect(getWeekNumber('2023-01-07')).toBe(1);
      expect(getWeekNumber('2023-01-08')).toBe(2);
    });
  });

  describe('getQuarter', () => {
    it('deve retornar trimestre corretamente', () => {
      expect(getQuarter('2023-01-15')).toBe(1);
      expect(getQuarter('2023-04-15')).toBe(2);
      expect(getQuarter('2023-07-15')).toBe(3);
      expect(getQuarter('2023-10-15')).toBe(4);
    });
  });

  describe('getSemester', () => {
    it('deve retornar semestre corretamente', () => {
      expect(getSemester('2023-01-15')).toBe(1);
      expect(getSemester('2023-06-15')).toBe(1);
      expect(getSemester('2023-07-15')).toBe(2);
      expect(getSemester('2023-12-15')).toBe(2);
    });
  });
}); 