import { useState } from 'react';
import DataInput from './components/Datainput.jsx';
import Modal from './components/Modal.jsx';
import CustomDatePicker from './components/DatePicker';
import Dropdown from './components/Dropdown';
import './App.css';

const US_STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
  'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
  'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
  'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
  'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
  'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
  'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming',
];

const DEPARTMENTS = ['Sales', 'Marketing', 'Engineering', 'Human Resources', 'Legal'];

const App = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [inputValues, setInputValues] = useState({
    firstName: '',
    lastName: '',
    street: '',
    city: '',
    zip: '',
  });
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [selectedState, setSelectedState] = useState(US_STATES[0]); // Par défaut, le premier état
  const [selectedDepartment, setSelectedDepartment] = useState(DEPARTMENTS[0]); // Par défaut, le premier département

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    console.log({
      ...inputValues,
      dateOfBirth,
      startDate,
      selectedState,
      selectedDepartment,
    });
    setModalOpen(true);
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Mon Application</h1>

      <div className="form-container">
        {/* Composants de saisie */}
        <DataInput
          id="first"
          type="text"
          name="firstName"
          label="FIRST NAME"
          onChange={handleInputChange}
        />
        <DataInput
          id="last"
          type="text"
          name="lastName"
          label="LAST NAME"
          onChange={handleInputChange}
        />

        {/* Sélecteur de date pour la Date of Birth */}
        <div className="date-section">
          <h3 className="section-title">Date of Birth</h3>
          <CustomDatePicker onDateChange={setDateOfBirth} />
        </div>

        {/* Sélecteur de date pour la Start Date */}
        <div className="date-section">
          <h3 className="section-title">Start Date</h3>
          <CustomDatePicker onDateChange={setStartDate} />
        </div>

        {/* Adresse */}
        <div className="address-section">
          <h3 className="section-title">Address</h3>
          <DataInput
            id="street"
            type="text"
            name="street"
            label="STREET"
            onChange={handleInputChange}
          />
          <DataInput
            id="city"
            type="text"
            name="city"
            label="CITY"
            onChange={handleInputChange}
          />
          {/* Dropdown pour les États */}
          <div className="dropdown">
            <Dropdown
              label="Select State"
              options={US_STATES}
              onChange={setSelectedState}
            />
          </div>
          <DataInput
            id="zip"
            type="text"
            name="zip"
            label="ZIP CODE"
            onChange={handleInputChange}
          />
        </div>

        {/* Dropdown pour les Départements */}
        <div className="dropdown">
          <Dropdown
            label="Select Department"
            options={DEPARTMENTS}
            onChange={setSelectedDepartment}
          />
        </div>

        {/* Bouton pour ouvrir le modal */}
        <button className="btn-save" onClick={handleSave}>
          SAVE
        </button>
      </div>

      {/* Modal */}
      {modalOpen && (
        <>
          <div className="modal-overlay"></div>
          <Modal
            title="Employee Created"
            opened={modalOpen}
            onClose={() => setModalOpen(false)}
            content={`
              Employee Created with the following details:
              - First Name: ${inputValues.firstName}
              - Last Name: ${inputValues.lastName}
              - Date of Birth: ${dateOfBirth || 'N/A'}
              - Start Date: ${startDate || 'N/A'}
              - Street: ${inputValues.street}
              - City: ${inputValues.city}
              - State: ${selectedState}
              - ZIP Code: ${inputValues.zip}
              - Department: ${selectedDepartment}
            `}
            btnText="CLOSE"
          />
        </>
      )}
    </div>
  );
};

export default App;
