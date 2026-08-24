import { useEffect, useState } from "react";
import Icon from "../../../components/icons/Icon.jsx";

const SchoolIdentitySection = ({ field, fieldState }) => {
  const { value, onChange } = field;
  const [previewUrl, setPreviewUrl] = useState(null);
  const errorId = fieldState.error ? "logo-error" : undefined;

  useEffect(() => {
    if (!value) {
      setPreviewUrl(null);
      return undefined;
    }
    const url = URL.createObjectURL(value);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [value]);

  return (
    <div className="space-y-5">
      <h2 className="text-base font-semibold text-text">School Identity</h2>

      <div className="space-y-1.5">
        <label htmlFor="logo" className="block text-xs font-medium text-text">
          School Logo
        </label>

        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border bg-surface-muted">
            {previewUrl ? (
              <img
                src={previewUrl}
                alt=""
                className="h-full w-full object-cover"
              />
            ) : (
              <Icon name="school" className="h-6 w-6 text-text-subtle" />
            )}
          </div>
          <input
            id="logo"
            type="file"
            accept="image/png,image/jpeg,image/webp"
            onChange={(e) => onChange(e.target.files?.[0] ?? null)}
            aria-invalid={Boolean(fieldState.error) || undefined}
            aria-describedby={errorId}
            className="text-sm text-text-muted file:mr-3 file:rounded-lg file:border-0 file:bg-brand-50 file:px-3 file:py-2 file:text-sm file:font-medium file:text-brand-700 hover:file:bg-brand-100"
          />
        </div>

        <p className="text-11 text-text-subtle">
          PNG, JPEG, or WEBP — up to 2MB
        </p>
        {fieldState.error && (
          <p id={errorId} role="alert" className="text-11 text-danger-600">
            {fieldState.error.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default SchoolIdentitySection;
