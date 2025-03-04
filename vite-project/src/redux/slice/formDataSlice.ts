import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Employee {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  startDate: string;
  street: string;
  city: string;
  zip: string;
  selectedState: string;
  selectedDepartment: string;
}

interface FormDataState {
  employees: Employee[];
}

const initialState: FormDataState = {
  employees: [],
};

const formDataSlice = createSlice({
  name: 'formData',
  initialState,
  reducers: {
    addFormData: (state, action: PayloadAction<Employee>) => {
        console.log("Données ajoutées : ", action.payload); 
        state.employees.push(action.payload);
      },
    deleteEmployee(state, action: PayloadAction<number>) {
      state.employees = state.employees.filter((_, index) => index !== action.payload);
    },
  },
});

export const { addFormData, deleteEmployee } = formDataSlice.actions;

export default formDataSlice.reducer;
