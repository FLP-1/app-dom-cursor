import React from 'react';

export const LocalizationProvider = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export const AdapterDateFns = {
  format: jest.fn(),
  parse: jest.fn(),
  addDays: jest.fn(),
  addMonths: jest.fn(),
  addYears: jest.fn(),
  getDay: jest.fn(),
  getMonth: jest.fn(),
  getYear: jest.fn(),
  is12HourCycleInCurrentLocale: jest.fn(() => false),
}; 