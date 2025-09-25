import React from "react";
import { Controller } from "react-hook-form";
import FormField from "./FormField";

const SelectField = ({
  name,
  control,
  label,
  error,
  required = false,
  options = [],
}) => (
  <FormField label={label} error={error} required={required}>
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <select
          {...field}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            error ? "border-red-500" : "border-gray-300"
          }`}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      )}
    />
  </FormField>
);

export default SelectField;
