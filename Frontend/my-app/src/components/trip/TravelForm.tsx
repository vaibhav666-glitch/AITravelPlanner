"use client";

import { useState } from "react";
import InputField from "../common/InputField";
import SelectField from "../common/SelectField";
import MultiCheckbox from "../common/MultiCheckBox";

const TravelForm = ({ onSubmit }: any) => {
  const [form, setForm] = useState({
    destination: "",
    days: "",
    budgetType: "",
    interests: [] as string[],
  });
const [errors, setErrors] = useState<any>({});
const validate = () => {
  const newErrors: any = {};

  if (!form.destination) newErrors.destination = "Destination is required";

  if (!form.days || Number(form.days) <= 0 ||Number(form.days) > 15)
    newErrors.days = "Enter valid number of days";

  if (!form.budgetType) newErrors.budgetType = "Select a budget";

  if (!form.interests || form.interests.length === 0)
    newErrors.interests = "Select at least one interest";

 

  return newErrors;
};


 
 const handleSubmit = () => {
  const validationErrors = validate();

  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }

  onSubmit(form);
};

const handleChange = (e: any) => {
  setForm({ ...form, [e.target.name]: e.target.value });

  setErrors((prev: any) => ({
    ...prev,
    [e.target.name]: "",
  }));
};

  return (
    <div className="p-6 max-w-md mx-auto space-y-5 text-white">

      
<label className="text-white">
  Destination <span className="text-red-400">*</span>
</label>
      {/* Destination */}
      <InputField
       
        name="destination"
        value={form.destination}
        onChange={handleChange}
        placeholder="e.g. Paris"
        className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20 
        text-white placeholder-gray-400 outline-none 
        focus:ring-2 focus:ring-blue-400 transition"
      />
      {errors.destination && (
  <p className="text-red-400 text-xs">{errors.destination}</p>
)}
<label className="text-white">
  Days <span className="text-red-400">*</span>
</label>
      {/* Days */}
      <InputField
        
        name="days"
        value={form.days}
        onChange={handleChange}
        type="number"
        min={1}
        max={15}
        placeholder="Number of days"
        className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20 
        text-white placeholder-gray-400 outline-none 
        focus:ring-2 focus:ring-indigo-400 transition"
      />
{errors.days && (
  <p className="text-red-400 text-xs">{errors.days}</p>
)}
    
    
      {/* Budget */}
    <label className="text-white">
  Budget <span className="text-red-400">*</span>
</label>
      <SelectField
      
        name="budgetType"
        value={form.budgetType}
        onChange={handleChange}
        options={[
          { label: "Low", value: "Low" },
          { label: "Medium", value: "Medium" },
          { label: "High", value: "High" },
        ]}
      />
{errors.budgetType && (
  <p className="text-red-400 text-xs">{errors.budgetType}</p>
)}
      {/* Interests */}
    <label className="text-white">
  Interests <span className="text-red-400">*</span>
</label>
      <MultiCheckbox
        
        options={[
          { label: "Food", value: "Food" },
          { label: "Art", value: "Art" },
          { label: "Adventure", value: "Adventure" },
          { label: "Vlogging", value: "Vlogging" },
          { label: "Trekking", value: "Trekking" },
        ]}
        selectedValues={form.interests}
        onChange={(values) =>
          setForm({ ...form, interests: values })
        }
      />
{errors.interests && (
  <p className="text-red-400 text-xs">{errors.interests}</p>
)}
     
      {/* Button */}
      <button
        onClick={handleSubmit}
        className="w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 
        py-2.5 rounded-xl font-semibold hover:scale-[1.02] transition shadow-lg"
      >
        Create Trip 🚀
      </button>
    </div>
  );
};

export default TravelForm;