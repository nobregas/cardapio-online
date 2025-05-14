interface InputFieldProps {
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  min?: string;
  step?: string;
}

const InputField = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder = "",
  required = false,
  min = "",
  step = "",
}: InputFieldProps) => {
  return (
    <div>
      {label && (
        <label className="block mb-2 font-medium text-gray-700">{label}</label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        min={min}
        step={step}
        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-orange-500"
      />
    </div>
  );
};

export default InputField;
