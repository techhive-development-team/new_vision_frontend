import { useController } from "react-hook-form";

const FormField = ({
  name,
  control,
  label,
  type = "text",
  error,
  required,
  placeholder,
  options,
  rows,
}) => {
  const { field } = useController({ name, control });

  const baseClasses =
    "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500";
  const errorClasses = error ? "border-red-500" : "";

  if (type === "select") {
    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <select {...field} className={`${baseClasses} ${errorClasses}`}>
          {options?.map((opt, index) => (
            <option key={index} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
      </div>
    );
  }

  if (type === "textarea") {
    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <textarea
          {...field}
          rows={rows || 3}
          placeholder={placeholder}
          className={`${baseClasses} ${errorClasses}`}
        />
        {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
      </div>
    );
  }

  if (type === "checkbox") {
    return (
      <div className="flex items-center">
        <input
          {...field}
          type="checkbox"
          checked={field.value}
          className="mr-2"
        />
        <label className="text-sm font-medium text-gray-700">{label}</label>
      </div>
    );
  }

  if (type === "file") {
    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => field.onChange(e.target.files[0])}
          className={`${baseClasses} ${errorClasses}`}
        />
        {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
      </div>
    );
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        {...field}
        type={type}
        placeholder={placeholder}
        className={`${baseClasses} ${errorClasses}`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};

export default FormField;
