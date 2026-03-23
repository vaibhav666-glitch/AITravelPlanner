// components/InputField.tsx

import React from "react";

interface InputFieldProps {
  label?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  min?: number;
  className?:string;
  max?:number;
}
const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  min,
  className = "",
  max,
}) => {
  return (
    <div className="space-y-1">
      {label && (
        <label className="text-sm text-gray-300 font-medium">
          {label}
        </label>
      )}

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        min={min}
        max={max}
        className={`w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20 
        text-white placeholder-gray-400 outline-none 
        focus:ring-2 focus:ring-indigo-400 transition ${className}`}
      />
    </div>
  );
};
export default InputField;