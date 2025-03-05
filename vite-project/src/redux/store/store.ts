// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import formDataReducer from '../slice/formDataSlice'; // Importe le reducer du slice

// Créer le store avec le reducer du formData
export const store = configureStore({
  reducer: {
    formData: formDataReducer,
  },
});

// Type des états du store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
