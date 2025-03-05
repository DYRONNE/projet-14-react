// src/pages/TablePage.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TablePage from './TablePage';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import formDataReducer from '../redux/slice/formDataSlice';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom'; 

// Helper pour le rendu avec Provider et store
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
    // On passe un état initial avec une liste d'employés vide
    renderWithProviders(<TablePage />, { preloadedState: { formData: { employees: [] } } });

    // Vérifie que le texte "No employees found" est affiché
    expect(screen.getByText(/No employees found/i)).toBeInTheDocument();
  });

  test('renders employees and supports filtering and pagination', () => {
    // On passe un état avec une liste d'employés
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
        ],
      },
    };

    // Rendu du composant avec l'état fourni
    renderWithProviders(<TablePage />, { preloadedState });

    // Vérifie que les employés sont bien affichés
    expect(screen.getByText(/John/i)).toBeInTheDocument();
    expect(screen.getByText(/Jane/i)).toBeInTheDocument();

    // Vérifie que le texte de pagination est bien affiché (en fonction du nombre d'employés)
    expect(screen.getByText(/Showing 1 to 2 of 2 entries/i)).toBeInTheDocument();

    // Test du filtre : on recherche "Jane"
    const filterInput = screen.getByPlaceholderText(/Search employees/i);
    fireEvent.change(filterInput, { target: { value: 'Jane' } });

    // Vérifie que Jane est visible après avoir filtré
    expect(screen.getByText(/Jane/i)).toBeInTheDocument();
    
    // Vérifie que John est caché après avoir filtré
    expect(screen.queryByText(/John/i)).not.toBeInTheDocument();
  });
});
