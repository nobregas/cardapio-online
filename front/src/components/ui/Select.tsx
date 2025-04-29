import React, { ChangeEvent } from "react";

interface Option {
  value: string;
  label: string;
}

interface SelectInputProps {
  options: Option[];
  defaultValue?: string;
  defaultLabel?: string;
  onChange?: (value: string) => void;
  className?: string;
}

const SelectInput: React.FC<SelectInputProps> = ({
  options,
  defaultValue = "",
  defaultLabel = "Selecione uma opção",
  onChange,
  className = "",
}) => {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (onChange) onChange(e.target.value);
  };

  return (
    <select
      onChange={handleChange}
      className={
        `bg-white border border-gray-200 text-gray-700 py-2 px-3 rounded-md shadow-sm focus:outline-none focus:ring-1
         focus:ring-orange-500 focus:border-orange-500 ${className}`
      }
    >
      <option value={defaultValue}>{defaultLabel}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default SelectInput;
