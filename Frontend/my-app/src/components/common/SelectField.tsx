// components/SelectField.tsx

import React from "react";

interface Option {
  label: string;
  value: string;
}

interface SelectFieldProps {
  label: string;
  name: string;
  value: string;
  options: Option[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  name,
  value,
  options,
  onChange,
}) => {
  return (
    <div className="mb-4">
      <label className="block font-medium mb-1">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border rounded px-3 py-2"
      >
        <option value="">Select</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;