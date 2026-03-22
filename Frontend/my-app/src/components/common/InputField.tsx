// components/InputField.tsx

import React from "react";

interface InputFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  min?: number;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  min,
}) => {
  return (
    <div className="mb-4">
      <label className="block font-medium mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        min={min}
        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
      />
    </div>
  );
};

export default InputField;