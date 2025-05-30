import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';

import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';
import notificationReducer from './slices/notificationSlice';
import esocialReducer from './slices/esocialSlice';
import documentReducer from './slices/documentSlice';
import taskReducer from './slices/taskSlice';
import groupReducer from './slices/groupSlice';
import partnerReducer from './slices/partnerSlice';
import logReducer from './slices/logSlice';
import validationReducer from './slices/validationSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'user', 'notification']
};

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  notification: notificationReducer,
  esocial: esocialReducer,
  document: documentReducer,
  task: taskReducer,
  group: groupReducer,
  partner: partnerReducer,
  log: logReducer,
  validation: validationReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE']
      }
    })
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 