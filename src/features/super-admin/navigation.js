import { PERMISSIONS } from "../../constants/permission";
import { ROUTES } from "../../constants/route";

export const SUPER_ADMIN_NAV_GROUPS = Object.freeze([
  {
    title: "Platform",
    items: [
      {
        id: "dashboard",
        title: "Dashboard",
        icon: "dashboard",
        path: ROUTES.SUPER_ADMIN.DASHBOARD,
      },
      {
        id: "schools",
        title: "Schools",
        icon: "school",
        path: ROUTES.SUPER_ADMIN.SCHOOLS,
        permission: PERMISSIONS.SCHOOLS_VIEW,
      },
      {
        id: "school-admins",
        title: "School Administrators",
        icon: "userCog",
        path: ROUTES.SUPER_ADMIN.SCHOOL_ADMINS,
        permission: PERMISSIONS.SCHOOL_ADMINS_VIEW,
      },
      {
        id: "platform-users",
        title: "Platform Users",
        icon: "users",
        path: ROUTES.SUPER_ADMIN.PLATFORM_USERS,
        permission: PERMISSIONS.PLATFORM_USERS_MANAGE,
      },
    ],
  },
  {
    title: "Business",
    items: [
      {
        id: "subscriptions",
        title: "Subscriptions & Billing",
        icon: "creditCard",
        path: ROUTES.SUPER_ADMIN.SUBSCRIPTIONS,
        permission: PERMISSIONS.SUBSCRIPTIONS_VIEW,
      },
    ],
  },
  {
    title: "Security & Access",
    items: [
      {
        id: "roles-permissions",
        title: "Roles & Permissions",
        icon: "userCheck",
        path: ROUTES.SUPER_ADMIN.ROLES_PERMISSIONS,
        permission: PERMISSIONS.ROLES_VIEW,
      },
      {
        id: "audit-logs",
        title: "Audit Logs",
        icon: "clipboardList",
        path: ROUTES.SUPER_ADMIN.AUDIT_LOGS,
        permission: PERMISSIONS.AUDIT_LOGS_VIEW,
      },
    ],
  },
  {
    title: "Analytics & Monitoring",
    items: [
      {
        id: "analytics",
        title: "Platform Analytics",
        icon: "barChart3",
        path: ROUTES.SUPER_ADMIN.ANALYTICS,
        permission: PERMISSIONS.PLATFORM_ANALYTICS_VIEW,
      },
      {
        id: "system-monitoring",
        title: "System Monitoring",
        icon: "chartColumn",
        path: ROUTES.SUPER_ADMIN.SYSTEM_MONITORING,
        permission: PERMISSIONS.SYSTEM_MONITORING_VIEW,
      },
    ],
  },
  {
    title: "System",
    items: [
      {
        id: "settings",
        title: "Global Settings",
        icon: "settings",
        path: ROUTES.SUPER_ADMIN.SETTINGS,
        permission: PERMISSIONS.GLOBAL_SETTINGS_MANAGE,
      },
      {
        id: "support",
        title: "Support / Troubleshooting",
        icon: "info",
        path: ROUTES.SUPER_ADMIN.SUPPORT,
        permission: PERMISSIONS.SUPPORT_ACCESS,
      },
    ],
  },
]);

export default SUPER_ADMIN_NAV_GROUPS;
