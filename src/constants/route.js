export const ROUTES = Object.freeze({
  AUTH: Object.freeze({
    LOGIN: "/login",
    REGISTER: "/register",
    FORGOT_PASSWORD: "/forgot-password",
    RESET_PASSWORD: "/reset-password",
    VERIFY_OTP: "/verify-otp",
    RESEND_OTP: "/verify-otp/resend",
    ME: "/me",
    UNAUTHORIZED: "/403",
    LOGOUT: "/logout",
  }),

  ERROR: Object.freeze({
    NOT_FOUND: "/404",
    SERVER_ERROR: "/500",
  }),

  APP: Object.freeze({
    PATH: "/",
    DASHBOARD: "/dashboard",
  }),

  SUPER_ADMIN: Object.freeze({
    ROOT: "/admin",
    DASHBOARD: "/admin/dashboard",
    SCHOOLS: "/admin/schools",
    SCHOOLS_CREATE: "/admin/schools/create",
    SCHOOL_DETAILS: "/admin/schools/:id",
    SCHOOL_EDIT: "/admin/schools/:id/edit",
    SCHOOL_ADMINS: "/admin/school-admins",
    SCHOOL_ADMINS_CREATE: "/admin/school-admins/create",
    SCHOOL_ADMIN_DETAILS: "/admin/school-admins/:id",
    SCHOOL_ADMIN_EDIT: "/admin/school-admins/:id/edit",
    SCHOOL_ADMIN_PERMISSIONS: "/admin/school-admins/:id/permissions",
    SCHOOL_ADMIN_ACTIVITY: "/admin/school-admins/:id/activity",
    PLATFORM_USERS: "/admin/platform-users",
    SUBSCRIPTIONS: "/admin/subscriptions",
    SUBSCRIPTION_PLANS_CREATE: "/admin/subscriptions/plans/create",
    SUBSCRIPTION_PLAN_DETAILS: "/admin/subscriptions/plans/:planId",
    SUBSCRIPTION_PLAN_EDIT: "/admin/subscriptions/plans/:planId/edit",
    SCHOOL_SUBSCRIPTIONS: "/admin/subscriptions/schools",
    SCHOOL_SUBSCRIPTION_DETAILS: "/admin/subscriptions/schools/:schoolId",
    SCHOOL_SUBSCRIPTION_CREATE: "/admin/subscriptions/schools/:schoolId/create",
    SCHOOL_SUBSCRIPTION_EDIT: "/admin/subscriptions/schools/:schoolId/edit",
    ROLES_PERMISSIONS: "/admin/roles-permissions",
    ANALYTICS: "/admin/analytics",
    AUDIT_LOGS: "/admin/audit-logs",
    SETTINGS: "/admin/settings",
    SYSTEM_MONITORING: "/admin/system-monitoring",
    SUPPORT: "/admin/support",
  }),

  USERS: Object.freeze({
    STUDENTS: "/students",
    STUDENT_DETAILS: "/students/:id",

    TEACHERS: "/teachers",
    TEACHER_DETAILS: "/teachers/:id",

    PARENTS: "/parents",
    STAFF: "/staff",
  }),

  ACADEMICS: Object.freeze({
    CLASSES: "/classes",
    SUBJECTS: "/subjects",
    RESULTS: "/results",
    ATTENDANCE: "/attendance",
    TIMETABLE: "/timetable",
    EXAMS: "/exams",
  }),

  ADMISSIONS: Object.freeze({
    APPLICATIONS: "/admissions",
    APPROVALS: "/admissions/approvals",
  }),

  FINANCE: Object.freeze({
    FEES: "/fees",
    PAYMENTS: "/payments",
    RECEIPTS: "/receipts",
  }),

  LIBRARY: Object.freeze({
    BOOKS: "/library",
  }),

  REPORTS: Object.freeze({
    ANALYTICS: "/analytics",
    REPORTS: "/reports",
  }),

  USER: Object.freeze({
    PROFILE: "/profile",
    SETTINGS: "/settings",
    NOTIFICATIONS: "/notifications",
  }),
});

export default ROUTES;

export function buildPath(pattern, params = {}) {
  return Object.entries(params).reduce(
    (path, [key, value]) => path.replace(`:${key}`, encodeURIComponent(value)),
    pattern,
  );
}
