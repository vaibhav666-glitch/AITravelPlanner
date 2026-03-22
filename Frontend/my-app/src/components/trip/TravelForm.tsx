"use client";
import  { useState } from "react";
import InputField from "../common/InputField";
import SelectField from "../common/SelectField";
import MultiCheckbox from "../common/MultiCheckBox";

const TravelForm = ({onSubmit}:any) => {
  const [form, setForm] = useState({
    destination: "",
    days: "",
    budgetType: "",
    interests: [] as string[],
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit=()=>{
    console.log("yo boy");
    onSubmit(form)
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <InputField
        label="Destination"
        name="destination"
        value={form.destination}
        onChange={handleChange}
      />

      <InputField
        label="Days"
        name="days"
        value={form.days}
        onChange={handleChange}
        type="number"
        min={1}
      />

      <SelectField
        label="Budget"
        name="budgetType"
        value={form.budgetType}
        onChange={handleChange}
        options={[
          { label: "Low", value: "Low" },
          { label: "Medium", value: "Medium" },
          { label: "High", value: "High" },
        ]}
      />

      <MultiCheckbox
        label="Interests"
        options={[
          { label: "Food", value: "Food" },
          { label: "Art", value: "Art" },
          { label: "Adventure", value: "Adventure" },
        ]}
        selectedValues={form.interests}
        onChange={(values) =>
          setForm({ ...form, interests: values })
        }
      />
      <button
      onClick={handleSubmit}
      >create</button>
    </div>
  );
};

export default TravelForm;