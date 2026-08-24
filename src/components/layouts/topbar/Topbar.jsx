import { useNavigate } from "react-router-dom";
import { cn } from "../../../lib/clsx";
import Icon from "../../icons/Icon.jsx";
import { useUserMenu } from "../../../hooks/userUserMenu";
import { useAuthStore } from "../../../app/store/authStore";
import { ROUTES } from "../../../constants/route";
import UserMenuItem from "./UserMenuItem";

const MENU_ITEMS = [
  {
    id: "profile",
    label: "Profile",
    icon: "userCircle",
    route: ROUTES.USER.PROFILE,
  },
  {
    id: "settings",
    label: "Settings",
    icon: "settings",
    route: ROUTES.USER.SETTINGS,
  },
  {
    id: "logout",
    label: "Sign out",
    icon: "logout",
    variant: "destructive",
    dividerBefore: true,
  },
];

const Topbar = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const { isOpen, triggerRef, dropdownRef, toggle, handleSelect } = useUserMenu(
    {
      onLogout: () => {
        logout();
        navigate(ROUTES.AUTH.LOGIN, { replace: true });
      },
    },
  );

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-slate-100 bg-white px-4 sm:px-6 lg:px-8">
      <button
        type="button"
        onClick={onMenuClick}
        className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 lg:hidden"
        aria-label="Open navigation"
      >
        <Icon name="menu" className="h-5 w-5" />
      </button>

      <div className="relative ml-auto">
        <button
          ref={triggerRef}
          type="button"
          onClick={toggle}
          aria-haspopup="menu"
          aria-expanded={isOpen}
          className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-100 text-brand-700">
            <Icon name="userCircle" className="h-5 w-5" />
          </span>
          <span className="hidden truncate sm:inline">
            {user?.fullName ?? user?.email ?? "Account"}
          </span>
          <Icon name="chevronDown" className="h-4 w-4 text-slate-400" />
        </button>

        {isOpen && (
          <div
            ref={dropdownRef}
            role="menu"
            className={cn(
              "absolute right-0 z-50 mt-2 w-48 overflow-hidden rounded-lg border border-slate-100 bg-white py-1 shadow-lg",
            )}
          >
            {MENU_ITEMS.map((item) => (
              <UserMenuItem key={item.id} item={item} onSelect={handleSelect} />
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

export default Topbar;
