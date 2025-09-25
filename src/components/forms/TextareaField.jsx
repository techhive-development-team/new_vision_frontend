import React from "react";
import { Controller } from "react-hook-form";
import FormField from "./FormField";

const TextareaField = ({
  name,
  control,
  label,
  error,
  required = false,
  placeholder,
}) => (
  <FormField label={label} error={error} required={required}>
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <textarea
          {...field}
          rows={3}
          placeholder={placeholder}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            error ? "border-red-500" : "border-gray-300"
          }`}
        />
      )}
    />
  </FormField>
);

export default TextareaField;
