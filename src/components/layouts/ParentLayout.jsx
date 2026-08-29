import { ROLES } from "../../../constants/role";
import RoleGuard from "../../routers/RoleGuard";
import DashboardLayout from "../../../app/routers/layouts/DashboardLayout";
const ParentLayout = () => {
  return (
    <RoleGuard allowed={[ROLES.PARENT]}>
      <DashboardLayout />
    </RoleGuard>
  );
};

export default ParentLayout;
