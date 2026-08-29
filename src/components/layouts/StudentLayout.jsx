import { ROLES } from "../../../constants/role";
import RoleGuard from "../RoleGuard";
import DashboardLayout from "./DashboardLayout";

const StudentLayout = () => {
  return (
    <RoleGuard allowed={[ROLES.STUDENT]}>
      <DashboardLayout />
    </RoleGuard>
  );
};

export default StudentLayout;
