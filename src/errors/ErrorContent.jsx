import { AlertTriangle, ArrowLeft, RefreshCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ErrorContent = ({ status, title, description }) => {
  const navigate = useNavigate();

  return (
    <main className="flex min-h-screen items-center justify-center bg-surface-alt px-6">
      <div className="w-full max-w-lg rounded-xl border border-border bg-surface p-8 text-center shadow-sm">
        <div className="mb-6 flex justify-center">
          <AlertTriangle className="h-16 w-16 text-danger-600" />
        </div>

        <p className="text-sm font-medium text-text-muted">Error {status}</p>

        <h1 className="mt-2 text-3xl font-bold text-text">{title}</h1>

        <p className="mt-4 text-text-muted">{description}</p>

        <div className="mt-8 flex justify-center gap-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-surface-muted"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </button>

          <button
            type="button"
            onClick={() => window.location.reload()}
            className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
          >
            <RefreshCcw className="h-4 w-4" />
            Reload
          </button>
        </div>
      </div>
    </main>
  );
};

export default ErrorContent;
