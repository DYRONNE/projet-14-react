import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store/store';
import { deleteEmployee } from '../redux/slice/formDataSlice';
import { Link } from 'react-router-dom';
import '../style/TablePage.css';
import { useState } from 'react';

const TablePage = () => {
  const employees = useSelector((state: RootState) => state.formData.employees);
  const dispatch = useDispatch();

  const [filterText, setFilterText] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const [sortConfig, setSortConfig] = useState<{ key: string | null; direction: string | null }>({
    key: null,
    direction: null,
  });

  const formatDate = (date: string) => {
    const formattedDate = new Date(date).toLocaleDateString('en-GB');
    return formattedDate;
  };

  const handleDelete = (index: number) => {
    dispatch(deleteEmployee(index));
  };

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.firstName.toLowerCase().includes(filterText.toLowerCase()) ||
      employee.lastName.toLowerCase().includes(filterText.toLowerCase()) ||
      employee.city.toLowerCase().includes(filterText.toLowerCase()) ||
      employee.selectedDepartment.toLowerCase().includes(filterText.toLowerCase())
  );

  const handleSort = (key: string) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedEmployees = [...filteredEmployees].sort((a, b) => {
    const aValue = a[sortConfig.key as keyof typeof a];
    const bValue = b[sortConfig.key as keyof typeof b];

    if (sortConfig.direction === 'ascending') {
      return typeof aValue === 'string'
        ? aValue.localeCompare(bValue)
        : aValue - bValue;
    } else {
      return typeof bValue === 'string'
        ? bValue.localeCompare(aValue)
        : bValue - aValue;
    }
  });

  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const paginatedEmployees = sortedEmployees.slice(startIndex, endIndex);

  const totalPages = Math.ceil(filteredEmployees.length / entriesPerPage);

  const getSortArrow = (key: string) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'ascending' ? '▲' : '▼';
    }
    return '';
  };

  return (
    <div className="table-container">
      <h1>Current Employees</h1>

      <Link to="/" className="back-link">
        Back to Form
      </Link>

      <div className="filter-container">
        <label htmlFor="filter">Filter: </label>
        <input
          id="filter"
          type="text"
          value={filterText}
          onChange={(e) => {
            setFilterText(e.target.value);
            setCurrentPage(1); // Reset to first page when filtering
          }}
          placeholder="Search employees..."
        />
      </div>

      <div className="pagination-controls">
        <label htmlFor="entriesPerPage">Show </label>
        <select
          id="entriesPerPage"
          value={entriesPerPage}
          onChange={(e) => {
            setEntriesPerPage(Number(e.target.value));
            setCurrentPage(1); // Reset to first page
          }}
        >
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
        <span> entries</span>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th onClick={() => handleSort('firstName')}>
              First Name {getSortArrow('firstName')}
            </th>
            <th onClick={() => handleSort('lastName')}>
              Last Name {getSortArrow('lastName')}
            </th>
            <th onClick={() => handleSort('dateOfBirth')}>
              Date of Birth {getSortArrow('dateOfBirth')}
            </th>
            <th onClick={() => handleSort('startDate')}>
              Start Date {getSortArrow('startDate')}
            </th>
            <th>Street</th>
            <th>City</th>
            <th>State</th>
            <th>ZIP</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedEmployees.length > 0 ? (
            paginatedEmployees.map((employee, index) => (
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
                  <button
                    className="action-button"
                    onClick={() => handleDelete(startIndex + index)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={10}>No employees found</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="table-footer">
        <p>
          Showing {startIndex + 1} to {Math.min(endIndex, filteredEmployees.length)} of{' '}
          {filteredEmployees.length} entries
        </p>
        <div className="pagination-buttons">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TablePage;
