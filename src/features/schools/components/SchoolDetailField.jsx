import { cn } from "../../../lib/clsx";

/**
 * One label/value pair in a School Details section. Small but genuinely
 * reused — this page has ~15 of these across its sections, which is
 * exactly the case where a tiny shared component earns its place over
 * repeating the same two-line markup everywhere.
 */
const SchoolDetailField = ({ label, value, className }) => (
  <div className={cn("space-y-1", className)}>
    <p className="text-xs font-medium text-text-muted">{label}</p>
    <div className="text-sm text-text">{value ?? "—"}</div>
  </div>
);

export default SchoolDetailField;
