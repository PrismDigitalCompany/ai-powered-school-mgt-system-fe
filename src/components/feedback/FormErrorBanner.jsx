import { AlertTriangle } from "lucide-react";


const FormErrorBanner = ({ message }) => (
  <div
    role="alert"
    className="mt-6 flex items-start gap-2.5 rounded-lg border border-danger-600/20 bg-danger-50 px-3.5 py-3 text-sm text-danger-600"
  >
    <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
    <span>{message}</span>
  </div>
);

export default FormErrorBanner;
