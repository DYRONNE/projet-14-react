import { useState } from 'react';
import { useDispatch } from 'react-redux'; // Importer useDispatch
import { addFormData } from './redux/slice/formDataSlice'; // Importer l'action
import { Link } from 'react-router-dom'; // Importer Link
import DataInput from './components/Datainput';
import Modal from './components/Modal';
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
  const [selectedState, setSelectedState] = useState(US_STATES[0]);
  const [selectedDepartment, setSelectedDepartment] = useState(DEPARTMENTS[0]);

  const dispatch = useDispatch(); // Utiliser useDispatch pour envoyer l'action

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    const formData = {
      firstName: inputValues.firstName,
      lastName: inputValues.lastName,
      dateOfBirth,
      startDate,
      selectedState,
      selectedDepartment,
    };

    // Dispatch l'action pour ajouter les données dans le store
    dispatch(addFormData(formData));

    // Afficher le modal
    setModalOpen(true);
  };

  return (
    <div className="app-container">
      <Link to="/table" className="link-to-table">
        Go to Table Page
      </Link>

      <h1 className="app-title">Mon Application</h1>

      <div className="form-container">
        {/* Composants de saisie */}
        <div className="input-section">
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
        </div>

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
          <div className="input-section">
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
          </div>
          {/* Dropdown pour les États */}
          <div className="dropdown">
            <Dropdown
              label="Select State"
              options={US_STATES}
              onChange={setSelectedState}
            />
          </div>
          <div className="input-section">
            <DataInput
              id="zip"
              type="text"
              name="zip"
              label="ZIP CODE"
              onChange={handleInputChange}
            />
          </div>
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
