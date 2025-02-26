import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";


interface DatePickerProps {
  initialDate?: Date;
  onDateChange?: (date: Date) => void;
}

const CustomDatePicker: React.FC<DatePickerProps> = ({ initialDate = new Date(), onDateChange }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(initialDate);

  const handleChange = (date: Date | null) => {
    setSelectedDate(date);
    if (date && onDateChange) {
      onDateChange(date);
    }
  };

  return (
    <div className="custom-datepicker">
      <DatePicker
        selected={selectedDate}
        onChange={handleChange}
        dateFormat="dd/MM/yyyy"
        className="datepicker-input"
      />
    </div>
  );
};

export default CustomDatePicker;
