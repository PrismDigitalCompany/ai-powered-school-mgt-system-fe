import { NavLink } from "react-router-dom";
import { cn } from "../../../lib/clsx";
import Icon from "../../icons/Icon.jsx";

const SidebarItems = ({ item, onNavigate }) => {
  return (
    <NavLink
      to={item.path}
      end
      onClick={onNavigate}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium transition-colors hover:bg-slate-100",
          isActive
            ? "bg-brand-50 text-brand-700"
            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
        )
      }
    >
      <Icon name={item.icon} className="w-4 h-4 shrink-0" />
      <span className="truncate">{item.title}</span>
    </NavLink>
  );
};

export default SidebarItems;
