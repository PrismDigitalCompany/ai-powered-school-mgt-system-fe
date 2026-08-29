import { cn } from "../../../lib/clsx";

const SchoolDetailField = ({ label, value, className }) => (
  <div className={cn("space-y-1", className)}>
    <p className="text-xs font-medium text-text-muted">{label}</p>
    <div className="text-sm text-text">{value ?? "—"}</div>
  </div>
);

export default SchoolDetailField;
