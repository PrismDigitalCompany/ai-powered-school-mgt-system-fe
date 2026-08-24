import { lazy } from "react";
import { ROUTES } from "../../constants/route";
import { LAYOUTS } from "../../constants/layouts";
import { PERMISSIONS } from "../../constants/permission";

const SchoolAdminsPage = lazy(() => import("./pages/SchoolAdminsPage"));
const CreateSchoolAdminPage = lazy(
  () => import("./pages/CreateSchoolAdminPage"),
);
const SchoolAdminDetailsPage = lazy(
  () => import("./pages/SchoolAdminDetailsPage"),
);
const EditSchoolAdminPage = lazy(() => import("./pages/EditSchoolAdminPage"));
const SchoolAdminPermissionsPage = lazy(
  () => import("./pages/SchoolAdminPermissionsPage"),
);
const SchoolAdminActivityPage = lazy(
  () => import("./pages/SchoolAdminActivityPage"),
);

export const manifest = [
  {
    path: ROUTES.SUPER_ADMIN.SCHOOL_ADMINS,
    component: SchoolAdminsPage,
    layout: LAYOUTS.SUPER_ADMIN,
    title: "School Administrators",
    permission: PERMISSIONS.SCHOOL_ADMINS_VIEW,
  },
  {
    path: ROUTES.SUPER_ADMIN.SCHOOL_ADMINS_CREATE,
    component: CreateSchoolAdminPage,
    layout: LAYOUTS.SUPER_ADMIN,
    title: "Create School Admin",
    permission: PERMISSIONS.SCHOOL_ADMINS_MANAGE,
  },
  {
    path: ROUTES.SUPER_ADMIN.SCHOOL_ADMIN_DETAILS,
    component: SchoolAdminDetailsPage,
    layout: LAYOUTS.SUPER_ADMIN,
    title: "School Administrator Details",
    permission: PERMISSIONS.SCHOOL_ADMINS_VIEW,
  },
  {
    path: ROUTES.SUPER_ADMIN.SCHOOL_ADMIN_EDIT,
    component: EditSchoolAdminPage,
    layout: LAYOUTS.SUPER_ADMIN,
    title: "Edit School Admin",
    permission: PERMISSIONS.SCHOOL_ADMINS_MANAGE,
  },
  {
    path: ROUTES.SUPER_ADMIN.SCHOOL_ADMIN_PERMISSIONS,
    component: SchoolAdminPermissionsPage,
    layout: LAYOUTS.SUPER_ADMIN,
    title: "School Admin Permissions",
    permission: PERMISSIONS.SCHOOL_ADMINS_MANAGE,
  },
  {
    path: ROUTES.SUPER_ADMIN.SCHOOL_ADMIN_ACTIVITY,
    component: SchoolAdminActivityPage,
    layout: LAYOUTS.SUPER_ADMIN,
    title: "School Admin Activity",
    permission: PERMISSIONS.AUDIT_LOGS_VIEW,
  },
];
