import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ValidationService } from '@/services/validation.service';

interface ValidationState {
  errors: Record<string, string>;
  loading: boolean;
  error: string | null;
}

const initialState: ValidationState = {
  errors: {},
  loading: false,
  error: null
};

const validationSlice = createSlice({
  name: 'validation',
  initialState,
  reducers: {
    setErrors: (state, action: PayloadAction<Record<string, string>>) => {
      state.errors = action.payload;
      state.error = null;
    },
    addError: (state, action: PayloadAction<{ field: string; message: string }>) => {
      state.errors[action.payload.field] = action.payload.message;
    },
    removeError: (state, action: PayloadAction<string>) => {
      delete state.errors[action.payload];
    },
    clearErrors: (state) => {
      state.errors = {};
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearError: (state) => {
      state.error = null;
    }
  }
});

export const {
  setErrors,
  addError,
  removeError,
  clearErrors,
  setLoading,
  setError,
  clearError
} = validationSlice.actions;

export default validationSlice.reducer; 