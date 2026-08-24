import { useMemo } from "react";
import { MOCK_SCHOOLS } from "../../schools/data/schoolsMock";
import { ROLES } from "../../../constants/role";

export function useSchoolAdmin(adminId) {
  const data = useMemo(() => {
    const school = MOCK_SCHOOLS.find((s) => s.id === adminId && s.schoolAdmin);
    if (!school) {
      return null;
    }
    return {
      id: school.id,
      fullName: school.schoolAdmin.fullName,
      email: school.schoolAdmin.email,
      phone: school.schoolAdmin.phone,
      status: school.schoolAdmin.status,
      role: ROLES.SCHOOL_ADMIN,
      createdAt: school.createdAt,
      school: { id: school.id, name: school.name, code: school.code },
    };
  }, [adminId]);

  return { data, isLoading: false, isError: false };
}

export default useSchoolAdmin;
