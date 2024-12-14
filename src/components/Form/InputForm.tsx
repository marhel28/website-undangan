'use client';

type Option = { label: string; value: string };

type InputFormProps = {
  label?: string;
  id: string;
  type?: string;
  placeholder?: string;
  errors?: any;
  required?: boolean;
  phone?: string;
  className?: string;
  options?: Option[];
  rows?: number;
  value?: string | number | readonly string[] | undefined;
  cols?: number;
  onChange?: (value: string) => void;
  disabled?: boolean;
};

export default function InputForm({ label, type, id, errors, placeholder, required, className, phone, options, onChange, disabled, value }: InputFormProps) {
  let inputErr: string[] = [];
  let isError = false;

  if (errors?.[id]?._errors) {
    isError = true;
    inputErr = errors?.[id]?._errors[0] as string[];
  }

  const classError = isError ? 'border-red-500' : 'border-gray-300';

  const typeForm = type ? type : 'text';

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (onChange) {
      onChange(event.target.value);
    }
  };

  return (
    <div className="flex flex-col gap-1 transition-all duration-150 ease-in-out">
      {!!label && (
        <label htmlFor={id} className="text-sm font-medium text-gray-700 mb-1 capitalize">
          {label}
        </label>
      )}
      <div className="flex flex-row items-start">
        {!!phone && <div className={`border rounded-lg rounded-r-none top-0 bg-gray-50 pt-2.5 shadow-sm pb-2.5 px-3 text-gray-700 ${classError}`}>{phone}</div>}
        {options ? (
          <select
            id={id}
            name={id}
            required={required}
            className={`w-full px-3 py-2.5 border rounded-lg bg-gray-50 pe-3 text-gray-800 shadow-sm focus:outline-1 focus:outline-[var(--primary-color)] ${classError} ${className}`}
            onChange={handleInputChange}
            disabled={disabled}
            defaultValue=""
          >
            <option value="" disabled>
              Pilih {label}
            </option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            value={value}
            type={typeForm}
            id={id}
            name={id}
            placeholder={placeholder}
            required={required}
            className={`w-full px-3 py-2.5 border rounded-lg bg-gray-50 text-gray-800 shadow-sm focus:outline-1 focus:outline-[var(--primary-color)] ${classError} ${className}`}
            onChange={handleInputChange}
            disabled={disabled}
          />
        )}
      </div>
      {!!isError && (
        <div className="text-xs bg-red-500 bg-opacity-10 border border-red-500 border-opacity-30 rounded-md p-2 text-red-500">
          <div>{inputErr}</div>
        </div>
      )}

      {/* array error */}
      {/* {!!isError && (
        <div className="text-xs bg-red-500 bg-opacity-10 border border-red-500 border-opacity-30 rounded-md p-2 text-red-500">
          {inputErr.map((error, k) => (
            <div key={`err-${id}-${k}`}>{error}</div>
          ))}
        </div>
      )} */}
    </div>
  );
}

export function InputTextAreaForm({ label, type, id, errors, placeholder, required, className, phone, rows, cols }: InputFormProps) {
  let inputErr: string[] = [];
  let isError = false;

  if (errors?.[id]?._errors) {
    isError = true;
    inputErr = errors?.[id]?._errors[0] as string[];
  }

  const classError = isError ? 'border-red-500' : 'border-gray-300';

  const typeForm = type ? type : 'text';

  return (
    <div className="flex flex-col gap-1 transition-all duration-150 ease-in-out">
      {!!label ? (
        <label htmlFor={id} className="text-sm font-medium text-gray-700 mb-1 capitalize">
          {label}
        </label>
      ) : (
        <></>
      )}
      <div className="flex flex-row items-start">
        {!!phone && <div className={`border rounded-lg rounded-r-none top-0 bg-gray-50 pt-2.5 shadow-sm pb-2.5 px-3 text-gray-700 ${classError}`}>{phone}</div>}
        <textarea
          cols={cols}
          rows={rows}
          id={id}
          name={id}
          placeholder={placeholder}
          required={required}
          className={`w-full px-3 py-2.5 border rounded-lg  bg-gray-50 text-gray-800 shadow-sm focus:outline-1 focus:outline-[var(--primary-color)] ${classError} ${className} `}
        ></textarea>
      </div>

      {!!isError && <div className="text-xs bg-red-500 bg-opacity-10 border border-red-500 border-opacity-30 rounded-md p-2 text-red-500">{inputErr}</div>}
    </div>
  );
}
