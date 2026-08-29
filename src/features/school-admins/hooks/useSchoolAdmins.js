import { useMemo, useState } from "react";
import { MOCK_SCHOOLS } from "../../schools/data/schoolsMock";
import { ROLES } from "../../../constants/role";

const PAGE_SIZE = 10;

function deriveSchoolAdmins() {
  return MOCK_SCHOOLS.filter((school) => school.schoolAdmin).map((school) => ({
    id: school.id,
    fullName: school.schoolAdmin.fullName,
    email: school.schoolAdmin.email,
    phone: school.schoolAdmin.phone,
    status: school.schoolAdmin.status,
    role: ROLES.SCHOOL_ADMIN,

    createdAt: school.createdAt,
    school: { id: school.id, name: school.name, code: school.code },
  }));
}

const ALL_SCHOOL_ADMINS = deriveSchoolAdmins();

export function useSchoolAdmins() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [schoolId, setSchoolId] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return ALL_SCHOOL_ADMINS.filter((admin) => {
      const matchesQuery =
        !query ||
        admin.fullName.toLowerCase().includes(query) ||
        admin.email.toLowerCase().includes(query) ||
        admin.school.name.toLowerCase().includes(query);
      const matchesStatus = !status || admin.status === status;
      const matchesSchool = !schoolId || admin.school.id === schoolId;
      return matchesQuery && matchesStatus && matchesSchool;
    });
  }, [search, status, schoolId]);

  const totalItems = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);

  const data = useMemo(() => {
    const start = (safePage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, safePage]);

  const withPageReset = (setter) => (value) => {
    setter(value);
    setPage(1);
  };

  return {
    data,
    totalItems,
    page: safePage,
    pageSize: PAGE_SIZE,
    onPageChange: setPage,
    search,
    onSearchChange: withPageReset(setSearch),
    status,
    onStatusChange: withPageReset(setStatus),
    schoolId,
    onSchoolIdChange: withPageReset(setSchoolId),

    isLoading: false,
    isError: false,
  };
}

export function useSchoolAdminSchoolOptions() {
  return useMemo(() => ALL_SCHOOL_ADMINS.map((admin) => admin.school), []);
}

export function useSchoolAdminOptions(search = "") {
  return useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) {
      return ALL_SCHOOL_ADMINS;
    }
    return ALL_SCHOOL_ADMINS.filter(
      (admin) =>
        admin.fullName.toLowerCase().includes(query) ||
        admin.email.toLowerCase().includes(query),
    );
  }, [search]);
}

export default useSchoolAdmins;
