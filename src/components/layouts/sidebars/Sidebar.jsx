import { useRef } from "react";
import { cn } from "../../../lib/clsx";
import { useFocusTrap } from "../../../hooks/useFocusTrap";
import { useBodyScrollLock } from "../../../hooks/useBodyScrollLock";
import { useEscapeKey } from "../../../hooks/useEscapeKey";
import { APP_CONFIG } from "../../../config/app";
import Icon from "../../icons/Icon.jsx";
import SidebarBrand from "./SidebarBrand";
import SidebarGroup from "./SidebarGroup";
import SidebarOverlay from "./SidebarOverlay";

const Sidebar = ({ open = false, onClose, navGroups = [] }) => {
  const containerRef = useRef(null);

  useFocusTrap({ containerRef, active: open });
  useBodyScrollLock(open);
  useEscapeKey({ enabled: open, onEscape: onClose });

  return (
    <>
      <SidebarOverlay open={open} onClose={onClose} />

      <aside
        ref={containerRef}
        role="navigation"
        aria-label="Main"
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 shrink-0 flex-col border-r border-slate-100 bg-white transition-transform duration-150",
          "lg:static lg:z-auto lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between">
          <SidebarBrand
            name={APP_CONFIG.shortName}
            desc={APP_CONFIG.tagline}
            className="flex-1"
          />
          <button
            type="button"
            onClick={onClose}
            className="mr-3 flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 lg:hidden"
            aria-label="Close navigation"
          >
            <Icon name="close" className="h-4 w-4" />
          </button>
        </div>

        <nav className="flex-1 space-y-4 overflow-y-auto px-3 py-4">
          {navGroups.map((group, index) => (
            <SidebarGroup
              key={group.title ?? index}
              title={group.title}
              items={group.items}
              onNavigate={onClose}
            />
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
