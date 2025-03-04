// src/redux/slice/formDataSlice.test.ts
import formDataReducer, { addFormData, deleteEmployee, Employee } from './formDataSlice';

describe('formDataSlice reducer', () => {
  const initialState = { employees: [] };

  const employee: Employee = {
    firstName: 'John',
    lastName: 'Doe',
    dateOfBirth: '06/03/2025',
    startDate: '07/03/2025',
    street: '123 Main St',
    city: 'New York',
    zip: '10001',
    selectedState: 'New York',
    selectedDepartment: 'Engineering',
  };

  it('should handle initial state', () => {
    expect(formDataReducer(undefined, { type: 'unknown' })).toEqual({ employees: [] });
  });

  it('should handle addFormData', () => {
    const actual = formDataReducer(initialState, addFormData(employee));
    expect(actual.employees.length).toEqual(1);
    expect(actual.employees[0]).toEqual(employee);
  });

  it('should handle deleteEmployee', () => {
    const stateWithEmployees = { employees: [employee, { ...employee, firstName: 'Jane' }] };
    const actual = formDataReducer(stateWithEmployees, deleteEmployee(0));
    expect(actual.employees.length).toEqual(1);
    expect(actual.employees[0].firstName).toEqual('Jane');
  });
});
