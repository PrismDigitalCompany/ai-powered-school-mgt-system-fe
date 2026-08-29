import { ROLES } from "../../../constants/role";
import RoleGuard from "../RoleGuard";
import DashboardLayout from "./DashboardLayout";

const TeacherLayout = () => {
  return (
    <RoleGuard allowed={[ROLES.TEACHER]}>
      <DashboardLayout />
    </RoleGuard>
  );
};

export default TeacherLayout;
