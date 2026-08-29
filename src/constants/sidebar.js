import { ROUTES } from "./route";
import { ROLES } from "./role";

export const SIDEBAR_ITEMS = Object.freeze(
  {
    id: "dashboard",
    title: "Dashboard",
    icon: "dashboard",
    path: ROUTES.APP.DASHBOARD,
    role: [
      ROLES.SUPER_ADMIN,
      ROLES.SCHOOL_ADMIN,
      ROLES.TEACHER,
      ROLES.STUDENT,
      ROLES.PARENT,
    ],
  },
  {
    id: "student",
    title: "Students",
    icon: "Users",
    path: ROUTES.USERS.STUDENTS,
    role: [ROLES.SUPER_ADMIN, ROLES.SCHOOL_ADMIN, ROLES.TEACHER, ROLES.PARENT],
  },

  {
    id: "teacher",
    title: "Teachers",
    icon: "UserCog",
    path: ROUTES.USERS.TEACHERS,
  },
);
