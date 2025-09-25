import React from "react";
import { Controller } from "react-hook-form";

const CheckboxField = ({ name, control, label }) => (
  <Controller
    name={name}
    control={control}
    render={({ field: { value, onChange } }) => (
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={value}
          onChange={(e) => onChange(e.target.checked)}
          className="mr-2"
        />
        <label className="text-sm font-medium text-gray-700">{label}</label>
      </div>
    )}
  />
);

export default CheckboxField;
