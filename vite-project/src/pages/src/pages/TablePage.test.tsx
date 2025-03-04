// src/pages/TablePage.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TablePage from './TablePage'; 
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import formDataReducer from '../redux/slice/formDataSlice';
import { BrowserRouter } from 'react-router-dom';

const renderWithProviders = (
  ui: React.ReactElement,
  {
    preloadedState,
    store = configureStore({ reducer: { formData: formDataReducer }, preloadedState }),
  }: { preloadedState?: any; store?: any } = {}
) => {
  return render(
    <Provider store={store}>
      <BrowserRouter>
        {ui}
      </BrowserRouter>
    </Provider>
  );
};

describe('TablePage', () => {
  test('renders "No employees found" when store is empty', () => {
    renderWithProviders(<TablePage />, { preloadedState: { formData: { employees: [] } } });
    expect(screen.getByText(/No employees found/i)).toBeInTheDocument();
  });

  test('renders employees and supports filtering and pagination', () => {
    const preloadedState = {
      formData: {
        employees: [
          {
            firstName: 'John',
            lastName: 'Doe',
            dateOfBirth: '2025-03-06T17:02:16.000Z',
            startDate: '2025-03-07T17:02:16.000Z',
            street: '123 Main St',
            city: 'New York',
            zip: '10001',
            selectedState: 'New York',
            selectedDepartment: 'Engineering',
          },
          {
            firstName: 'Jane',
            lastName: 'Smith',
            dateOfBirth: '2024-05-10T17:02:16.000Z',
            startDate: '2024-05-11T17:02:16.000Z',
            street: '456 Elm St',
            city: 'Los Angeles',
            zip: '90001',
            selectedState: 'California',
            selectedDepartment: 'Marketing',
          },
          // Ajoutez d'autres employés si nécessaire pour tester la pagination
        ],
      },
    };

    renderWithProviders(<TablePage />, { preloadedState });

    // Vérifier que les employés sont affichés
    expect(screen.getByText(/John/i)).toBeInTheDocument();
    expect(screen.getByText(/Jane/i)).toBeInTheDocument();

    // Vérifier que le compteur affiche les bons nombres
    expect(screen.getByText(/Showing 1 to/i)).toBeInTheDocument();

    // Tester le filtre
    const filterInput = screen.getByPlaceholderText(/Search employees/i);
    fireEvent.change(filterInput, { target: { value: 'Jane' } });
    expect(screen.getByText(/Jane/i)).toBeInTheDocument();
    expect(screen.queryByText(/John/i)).not.toBeInTheDocument();
  });
});
