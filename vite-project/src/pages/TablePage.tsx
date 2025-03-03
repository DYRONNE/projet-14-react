import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../redux/store/store'; 
import { deleteFormData } from '../redux/slice/formDataSlice'; // L'action de suppression si nécessaire

// Définition du type pour les données du formulaire
interface FormData {
  firstName: string;
  lastName: string;
  dateOfBirth: string | null;
  startDate: string | null;
  selectedState: string;
  selectedDepartment: string;
}

const TablePage: React.FC = () => {
  const formData = useSelector((state: RootState) => state.formData); // Récupère les données depuis Redux
  const dispatch = useDispatch(); // Utilisation de dispatch pour supprimer les données

  const handleDelete = (index: number) => {
    dispatch(deleteFormData(index)); // Appel à l'action de suppression
  };

  const handleEdit = (index: number) => {
    // Logique pour l'édition de l'élément
    console.log('Edit item at index:', index);
  };

  return (
    <div className="table-container">
      <h2>Form Data Table</h2>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Date of Birth</th>
            <th>Start Date</th>
            <th>State</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {formData.map((data: FormData, index: number) => (
            <tr key={index}>
              <td>{data.firstName}</td>
              <td>{data.lastName}</td>
              <td>{data.dateOfBirth || 'N/A'}</td>
              <td>{data.startDate || 'N/A'}</td>
              <td>{data.selectedState}</td>
              <td>{data.selectedDepartment}</td>
              <td>
                <button onClick={() => handleEdit(index)}>Edit</button>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Link to="/" className="back-link">Back to Form</Link>
    </div>
  );
};

export default TablePage;
