import { useMemo } from "react";
import { useSchoolAdmin } from "./useSchoolAdmin";
import { buildDemoSchoolAdminActivity } from "../data/schoolAdminActivity";

export function useSchoolAdminActivity(adminId) {
  const { data: admin } = useSchoolAdmin(adminId);

  const data = useMemo(() => buildDemoSchoolAdminActivity(admin), [admin]);

  return { data, isLoading: false, isError: false };
}

export default useSchoolAdminActivity;
