/**
 * Arquivo: LanguageContext.tsx
 * Caminho: src/contexts/LanguageContext.tsx
 * Criado em: 2025-01-27
 * Última atualização: 2025-01-27
 * Descrição: Contexto para gerenciamento de idioma dinâmico na aplicação
 */

import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'pt' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, messages: any) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
  defaultLanguage?: Language;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ 
  children, 
  defaultLanguage = 'pt' 
}) => {
  const [language, setLanguage] = useState<Language>(defaultLanguage);

  const t = (key: string, messages: any): string => {
    const keys = key.split('.');
    let value = messages[language];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // Fallback para português se a chave não existir no idioma atual
        value = messages.pt;
        for (const fallbackKey of keys) {
          if (value && typeof value === 'object' && fallbackKey in value) {
            value = value[fallbackKey];
          } else {
            return key; // Retorna a chave se não encontrar a tradução
          }
        }
        break;
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  const value: LanguageContextType = {
    language,
    setLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage deve ser usado dentro de um LanguageProvider');
  }
  return context;
};

export default LanguageContext; 