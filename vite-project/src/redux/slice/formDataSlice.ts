import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormData {
  firstName: string;
  lastName: string;
  dateOfBirth: string | null;
  startDate: string | null;
  selectedState: string;
  selectedDepartment: string;
}

const initialState: FormData[] = [];

const formDataSlice = createSlice({
  name: 'formData',
  initialState,
  reducers: {
    addFormData: (state, action: PayloadAction<FormData>) => {
      state.push(action.payload);
    },
    deleteFormData: (state, action: PayloadAction<number>) => {
      state.splice(action.payload, 1); // Supprime l'élément à l'index spécifié
    },
    resetFormData: () => initialState,
  },
});

export const { addFormData, deleteFormData } = formDataSlice.actions;

export default formDataSlice.reducer;
