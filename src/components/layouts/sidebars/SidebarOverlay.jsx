import { cn } from "../../../lib/clsx";

const SidebarOverlay = ({ open, onClose }) => {
  return (
    <div
      aria-hidden="true"
      onClick={onClose}
      className={cn(
        "fixed inset-0 z-40 bg-slate-900/50 transition-opacity duration-150 lg:hidden",
        open ? "opacity-100" : "pointer-events-none opacity-0",
      )}
    />
  );
};

export default SidebarOverlay;
