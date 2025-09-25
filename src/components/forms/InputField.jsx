import React from "react";
import { Controller } from "react-hook-form";
import FormField from "./FormField";

const InputField = ({
  name,
  control,
  label,
  type = "text",
  error,
  required = false,
  placeholder,
}) => (
  <FormField label={label} error={error} required={required}>
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <input
          {...field}
          type={type}
          placeholder={placeholder}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            error ? "border-red-500" : "border-gray-300"
          }`}
        />
      )}
    />
  </FormField>
);

export default InputField;
