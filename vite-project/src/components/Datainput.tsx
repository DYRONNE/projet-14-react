import '../style/DataInput.css';

type DataInputProps = {
  id: string;
  type: string;
  name: string;
  label?: string; 
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const DataInput: React.FC<DataInputProps> = ({ id, type, name, label, onChange }) => {
  return (
    <>
      <label className="data-input-label" htmlFor={id}>
        {label}
      </label>
      <input
        className="data-input-field"
        id={id}
        type={type}
        name={name}
        onChange={onChange}
      />
    </>
  );
};

export default DataInput;
