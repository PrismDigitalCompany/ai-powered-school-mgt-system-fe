import { lazy } from "react";
import { ROUTES } from "../../constants/route";
import { LAYOUTS } from "../../constants/layouts";
import { PERMISSIONS } from "../../constants/permission";
import {
  PlatformUsersPlaceholderPage,
  RolesPermissionsPlaceholderPage,
  AuditLogsPlaceholderPage,
  AnalyticsPlaceholderPage,
  SystemMonitoringPlaceholderPage,
  SettingsPlaceholderPage,
  SupportPlaceholderPage,
} from "./pages/placeholders";

const SuperAdminDashboardPage = lazy(
  () => import("./pages/SuperAdminDashboardPage"),
);

export const manifest = [
  {
    path: ROUTES.SUPER_ADMIN.DASHBOARD,
    component: SuperAdminDashboardPage,
    layout: LAYOUTS.SUPER_ADMIN,
    title: "Dashboard",
  },
  {
    path: ROUTES.SUPER_ADMIN.PLATFORM_USERS,
    component: PlatformUsersPlaceholderPage,
    layout: LAYOUTS.SUPER_ADMIN,
    title: "Platform Users",
    permission: PERMISSIONS.PLATFORM_USERS_MANAGE,
  },
  {
    path: ROUTES.SUPER_ADMIN.ROLES_PERMISSIONS,
    component: RolesPermissionsPlaceholderPage,
    layout: LAYOUTS.SUPER_ADMIN,
    title: "Roles & Permissions",
    permission: PERMISSIONS.ROLES_VIEW,
  },
  {
    path: ROUTES.SUPER_ADMIN.AUDIT_LOGS,
    component: AuditLogsPlaceholderPage,
    layout: LAYOUTS.SUPER_ADMIN,
    title: "Audit Logs",
    permission: PERMISSIONS.AUDIT_LOGS_VIEW,
  },
  {
    path: ROUTES.SUPER_ADMIN.ANALYTICS,
    component: AnalyticsPlaceholderPage,
    layout: LAYOUTS.SUPER_ADMIN,
    title: "Platform Analytics",
    permission: PERMISSIONS.PLATFORM_ANALYTICS_VIEW,
  },
  {
    path: ROUTES.SUPER_ADMIN.SYSTEM_MONITORING,
    component: SystemMonitoringPlaceholderPage,
    layout: LAYOUTS.SUPER_ADMIN,
    title: "System Monitoring",
    permission: PERMISSIONS.SYSTEM_MONITORING_VIEW,
  },
  {
    path: ROUTES.SUPER_ADMIN.SETTINGS,
    component: SettingsPlaceholderPage,
    layout: LAYOUTS.SUPER_ADMIN,
    title: "Global Settings",
    permission: PERMISSIONS.GLOBAL_SETTINGS_MANAGE,
  },
  {
    path: ROUTES.SUPER_ADMIN.SUPPORT,
    component: SupportPlaceholderPage,
    layout: LAYOUTS.SUPER_ADMIN,
    title: "Support / Troubleshooting",
    permission: PERMISSIONS.SUPPORT_ACCESS,
  },
];
