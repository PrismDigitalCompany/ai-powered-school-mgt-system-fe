import { ROLES } from "../../../constants/role";
import DashboardLayout from "./DashboardLayout";
import RoleGuard from "../RoleGuard";

const SchoolAdminLayout = () => {
  return (
    <RoleGuard allowed={[ROLES.SCHOOL_ADMIN]}>
      <DashboardLayout />
    </RoleGuard>
  );
};

export default SchoolAdminLayout;
