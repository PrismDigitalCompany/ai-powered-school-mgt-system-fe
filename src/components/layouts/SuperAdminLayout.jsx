import { ROLES } from "../../constants/role";
import RoleGuard from "../../app/routers/RoleGuard";
import DashboardLayout from "./DashboardLayout";
import { useAuthorization } from "../../hooks/useAuthorization";
import { filterNavGroups } from "../../lib/authorization";
import { SUPER_ADMIN_NAV_GROUPS } from "../../features/super-admin/navigation";

const SuperAdminLayout = () => {
  const { role } = useAuthorization();
  const navGroups = filterNavGroups(SUPER_ADMIN_NAV_GROUPS, role);

  return (
    <RoleGuard allowed={[ROLES.SUPER_ADMIN]}>
      <DashboardLayout navGroups={navGroups} />
    </RoleGuard>
  );
};

export default SuperAdminLayout;
