import { Control } from 'react-hook-form';
import { FormData } from '@/types/forms';

export type TestControl = Partial<Control<FormData>>;

export interface TestFormValues {
  [key: string]: string | number | boolean | Date | null | undefined;
}

export interface TestSubmitHandler {
  (data: TestFormValues): Promise<void>;
}

export interface EsocialEventResponse {
  id: string;
  tipo: string;
  status: string;
  data: string;
  payload: Record<string, unknown>;
}

export type SortDirection = 'asc' | 'desc';

export interface TestFormControl extends Control {
  _formValues: Record<string, unknown>;
  _formState: {
    isDirty: boolean;
    isSubmitting: boolean;
    isSubmitted: boolean;
    errors: Record<string, unknown>;
  };
}

export interface TestRouter {
  push: jest.Mock;
  query: Record<string, string>;
}

export interface TestTranslation {
  t: (key: string) => string;
  i18n: {
    language: string;
  };
}

export interface TestUser {
  id: number;
  nome: string;
  email: string;
  perfil: string;
  permissoes: string[];
}

export interface TestEventPayload {
  cpf: string;
  data: Date;
  [key: string]: unknown;
}

export interface TestEvent {
  id: string;
  tipo: string;
  data: Date;
  status: string;
  payload: TestEventPayload;
} 