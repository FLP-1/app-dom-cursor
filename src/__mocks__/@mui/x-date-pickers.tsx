import React from 'react';

interface LocalizationProviderProps {
  children: React.ReactNode;
  dateAdapter?: unknown;
}

const LocalizationProvider: React.FC<LocalizationProviderProps> = ({ children }) => {
  return <>{children}</>;
};

const AdapterDateFns = {
  format: jest.fn(),
  parse: jest.fn(),
  addDays: jest.fn(),
  addMonths: jest.fn(),
  addYears: jest.fn(),
  getDay: jest.fn(),
  getMonth: jest.fn(),
  getYear: jest.fn(),
  isAfter: jest.fn(),
  isBefore: jest.fn(),
  isEqual: jest.fn(),
  isValid: jest.fn(),
  startOfDay: jest.fn(),
  startOfMonth: jest.fn(),
  startOfYear: jest.fn(),
  endOfDay: jest.fn(),
  endOfMonth: jest.fn(),
  endOfYear: jest.fn(),
};

export { LocalizationProvider, AdapterDateFns };
export type { LocalizationProviderProps }; 