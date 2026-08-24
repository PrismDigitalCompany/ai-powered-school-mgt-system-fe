import { lazy } from "react";
import { ROUTES } from "../../constants/route";
import { LAYOUTS } from "../../constants/layouts";
import { PERMISSIONS } from "../../constants/permission";

const SchoolsPage = lazy(() => import("./pages/SchoolsPage"));
const CreateSchoolPage = lazy(() => import("./pages/CreateSchoolPage"));
const SchoolDetailsPage = lazy(() => import("./pages/SchoolDetailsPage"));
const EditSchoolPage = lazy(() => import("./pages/EditSchoolPage"));

/**
 * Schools feature route manifest. Owns ROUTES.SUPER_ADMIN.SCHOOLS —
 * moved here from features/super-admin/manifest.js's placeholder entry
 * now that the real page exists. Still rendered inside the Super Admin
 * shell (LAYOUTS.SUPER_ADMIN), same role/permission enforcement as
 * every other Super Admin page (RoleGuard via SuperAdminLayout,
 * PermissionGuard via this entry's `permission`).
 */
export const manifest = [
  {
    path: ROUTES.SUPER_ADMIN.SCHOOLS,
    component: SchoolsPage,
    layout: LAYOUTS.SUPER_ADMIN,
    title: "Schools",
    permission: PERMISSIONS.SCHOOLS_VIEW,
  },
  {
    path: ROUTES.SUPER_ADMIN.SCHOOLS_CREATE,
    component: CreateSchoolPage,
    layout: LAYOUTS.SUPER_ADMIN,
    title: "Register School",
    permission: PERMISSIONS.SCHOOLS_CREATE,
  },
  {
    path: ROUTES.SUPER_ADMIN.SCHOOL_DETAILS,
    component: SchoolDetailsPage,
    layout: LAYOUTS.SUPER_ADMIN,
    title: "School Details",
    permission: PERMISSIONS.SCHOOLS_VIEW,
  },
  {
    path: ROUTES.SUPER_ADMIN.SCHOOL_EDIT,
    component: EditSchoolPage,
    layout: LAYOUTS.SUPER_ADMIN,
    title: "Edit School",
    permission: PERMISSIONS.SCHOOLS_EDIT,
  },
];
