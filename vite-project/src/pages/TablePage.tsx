import { useSelector, useDispatch } from 'react-redux'; 
import { RootState } from '../redux/store/store'; 
import { deleteEmployee } from '../redux/slice/formDataSlice'; 
import { Link } from 'react-router-dom'; 
import '../style/TablePage.css';

const TablePage = () => {
  const employees = useSelector((state: RootState) => state.formData.employees);
  console.log("Employés récupérés depuis le store :", employees);
  const dispatch = useDispatch();

  // Fonction pour formater les dates
  const formatDate = (date: string) => {
    const formattedDate = new Date(date).toLocaleDateString('en-GB'); 
    return formattedDate;
  };

  const handleDelete = (index: number) => {
    dispatch(deleteEmployee(index)); // Supprime l'employé à l'index spécifié
  };

  return (
    <div className="table-container">
      <h1>Employee Table</h1>
      
      {/* Lien pour revenir à la page du formulaire */}
      <Link to="/" className="back-link">
        Back to Form
      </Link>

      <table className="table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Date of Birth</th>
            <th>Start Date</th>
            <th>Street</th>
            <th>City</th>
            <th>State</th>
            <th>ZIP</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((employee, index) => {
              return (
                <tr key={index}>
                  <td>{employee.firstName}</td>
                  <td>{employee.lastName}</td>
                  <td>{formatDate(employee.dateOfBirth)}</td> 
                  <td>{formatDate(employee.startDate)}</td> 
                  <td>{employee.street}</td> 
                  <td>{employee.city}</td> 
                  <td>{employee.selectedState}</td> 
                  <td>{employee.zip}</td> 
                  <td>{employee.selectedDepartment}</td> 
                  <td>
                    {/* Bouton Delete pour supprimer l'employé */}
                    <button className="action-button" onClick={() => handleDelete(index)}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td>No employees found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TablePage;
