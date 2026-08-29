import { AlertCircle } from "lucide-react"

const SelectField = ({id, label, onChange, value, option, error, disabled=false, placeholder, required=false, icon:Icon}) => {
  return (
    <div className="space-y-2">
        <label className="block text-sm font-medium text-txt-grey-200" htmlFor={id}>
        {label}
        {required && (
            <span className={`text-error-400 ml-1`}>*</span>
        )}
        </label>
       <div className="relative">
        {icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center z-10 pointer-events-none">
              <Icon className="w-5 h-5 text-txt-grey-200"/>
            </div>
        )}
        <select
        id={id}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`w-full ${icon ? "pl-10" :"pl-3"} pr-10 py-2.5 border ml-2 rounded-lg text-base 
        transition-color duration-300 disabled:bg-gray-50 disabled:text-gray-500 ${error ? 
          "border-error-400 focus:bg-red-500 focus:ring-red-500 focus:ring-2"
          :"border-gray-300 focus:border-blue-500 focus:ring-blue-500"} focus:outline-none focus:ring-2 focus:ring-opacity-20 appearance-none bg-gray-100 `}
        >
        <option value={""} disabled>{placeholder}</option>
        {option.map((opts)=>(
          <option key={opts.value} value={opts.value} className="bg-white">{opts.label}</option>
        ))}
        </select>
        <div className="absolute inset-y-0 right-0 flext items-center pr-2 pointer-events-none">
         <svg
         className="w-5 h-5 text-gray-500"
         viewBox="0 0 20 20"
         fill="currentColor"
         aria-hidden="true"
         >
         <path
         fillRule="evenodd"
         d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414  0l-4-4a1 1 0 010-1.414z"
         clipRule={`evenodd`}
         />
         </svg>
        </div>
       </div>
       {error && (
        <div className="flex items-center space-x-1 text-sm text-red-600">
          <AlertCircle className="w-4 h-4"/>
          <span>{error}</span>
        </div>
       )}
    </div>
  )
}

export default SelectField