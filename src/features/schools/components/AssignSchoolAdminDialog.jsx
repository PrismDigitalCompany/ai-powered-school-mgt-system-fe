import { useState } from "react";
import Modal from "../../../components/dialogs/Modal";
import SearchInput from "../../../components/inputs/SearchInput";
import Badge from "../../../components/ui/Badge";
import EmptyState from "../../../components/feedback/EmptyState";
import { useSchoolAdminOptions } from "../../school-admins/hooks/useSchoolAdmins";

/**
 * Picker for selecting an EXISTING School Admin account to assign — not
 * a creation form. Reuses the same School Admin data useSchoolAdmins()
 * derives (see that file), not a second source. Selecting a row closes
 * this dialog and hands the chosen admin to the caller, which opens a
 * ConfirmationDialog next (kept separate rather than a multi-step modal,
 * composing two already-proven patterns instead of inventing a new one).
 */
const AssignSchoolAdminDialog = ({ open, onClose, onSelect }) => {
  const [search, setSearch] = useState("");
  const options = useSchoolAdminOptions(search);

  return (
    <Modal open={open} onClose={onClose} title="Assign School Admin" size="md">
      <div className="space-y-4">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search by name or email…"
        />

        {options.length === 0 ? (
          <EmptyState
            title="No School Admins found"
            description="Try a different search term."
          />
        ) : (
          <ul className="max-h-80 divide-y divide-slate-100 overflow-y-auto rounded-lg border border-border">
            {options.map((admin) => (
              <li key={admin.id}>
                <button
                  type="button"
                  onClick={() => onSelect(admin)}
                  className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left hover:bg-surface-alt focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-inset"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-text">
                      {admin.fullName}
                    </p>
                    <p className="truncate text-xs text-text-subtle">
                      {admin.email}
                    </p>
                  </div>
                  <Badge tone="info" className="shrink-0">
                    Currently at {admin.school.name}
                  </Badge>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Modal>
  );
};

export default AssignSchoolAdminDialog;
