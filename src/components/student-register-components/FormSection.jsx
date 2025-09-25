const FormSection = ({ icon: Icon, title, color, children }) => (
  <div className="bg-gray-50 p-6 rounded-lg">
    <div className="flex items-center mb-4">
      <Icon className={`w-5 h-5 ${color} mr-2`} />
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
    </div>
    {children}
  </div>
);

export default FormSection;