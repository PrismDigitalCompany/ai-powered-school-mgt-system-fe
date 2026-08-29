import { AlertCircle } from "lucide-react"

const TextareaField = ({id, label, value, placeholder,
     rows, onChange,
      required=false,
       disabled=false, label,
        error, ...props, textHelper}) => {
  return (
    <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700" htmlFor={id}>
            {label}
            {required && (
                <span className="ml-1 text-error-400">*</span>
            )}
            </label>
            <textarea
            rows={rows}
            id={id}
            value={value}
            onChange={onChange}
            disabled={disabled}
            className={`w-full px-3 py-2.5 border rounded-lg text-base transition-colors duration-300 resize-y disabled:bg-gray-500
                 ${error ?"border border-error-400 focus:bg-red-500 focus:ring-red-500":
                    "border-gray-300 focus:border-blue-500"} focus:outline-none focus:ring-2 focus:ring-opacity-50`}

                style={{}}
                {...props}
            />
            {error && (
                <div
                className="flex text-s font-medium text-red-600 items-center space-x-1"
                >
                    <AlertCircle className="w-4 h-4"/>
                    <span>{error}</span>
                </div>
            )}

            {textHelper && (
                <p className="text-sm text-gray-400">{textHelper}</p>
            )}
    </div>
  )
}

export default TextareaField