// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import formDataReducer from '../slice/formDataSlice'; // Importe le reducer du slice

// Créer le store avec le reducer du formData
export const store = configureStore({
  reducer: {
    formData: formDataReducer, // Le nom 'formData' sera l'accès à l'état dans le store
  },
});

// Type des états du store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
