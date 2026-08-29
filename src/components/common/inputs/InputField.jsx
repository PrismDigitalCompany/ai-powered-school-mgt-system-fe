import { AlertCircle } from "lucide-react"

const InputField = ({label, id, type="text", placeholder, value,
   onChange, error, helperText,
    required=false, icon:Icon,
     disabled=false, ...props}) => {
  return (
    <div className="space-y-2">
      <labe htmlFor={id} className="block text-sm font-medium text-txt-grey-600">
       {label}
       {required && <span className="ml-1 text-color-error">*</span>}
      </labe>
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-event-none">
            <Icon className="w-5 h-5 text-txt-grey-200"/>
          </div>
        )}
        <input
        id={id} placeholder={placeholder}
        type={type}
        value={value ?? ""}
        onChange={onChange}
        disabled={disabled}
        className= {`w-full ${Icon ? "pl-10":"pl-3"} 
        pr-3 py-2.5 border rounder-lg text-base transition-color
         duration-200 disableed:bg-txt-grey-600 outline-none
          ${error ? "border-color-error focus:border-error-400 focus:ring-error-400":
            "border-txt-grey-400 focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring-2 focus:ring-opacity-20"}`}{...props}
        />
      </div>
      {error &&(
        <div className="flex items-center space-x-1 text-sm text-error-400">
          <AlertCircle className="w-4 h-4"/>
          <span>{error}</span>
        </div>
        
      )}

      {helperText && (
        <p className={`text-medium text-txt-grey-600`}>{helperText}</p>
      )}
    </div>
  )
}

export default InputField