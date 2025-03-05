import React, { useEffect, useState } from 'react';

interface DropdownProps {
  label: string;
  options: string[];
  defaultValue?: string; 
  onChange: (value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ label, options, defaultValue, onChange }) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue || options[0]); // Définit la valeur par défaut

  useEffect(() => {
    onChange(selectedValue); // Informe le parent de la valeur initiale
  }, [selectedValue, onChange]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(e.target.value);
    onChange(e.target.value);
  };

  return (
    <div>
      <label>
        <strong>{label}</strong>
      </label>
      <select value={selectedValue} onChange={handleChange} className="dropdown">
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
