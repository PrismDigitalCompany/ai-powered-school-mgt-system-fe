import { useMemo } from "react";
import { MOCK_SCHOOLS } from "../data/schoolsMock";

export function useSchool(schoolId) {
  const data = useMemo(
    () => MOCK_SCHOOLS.find((school) => school.id === schoolId) ?? null,
    [schoolId],
  );

  return {
    data,
    isLoading: false,
    isError: false,
  };
}

export default useSchool;
