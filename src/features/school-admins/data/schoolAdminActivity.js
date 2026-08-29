import { ROLES } from "../../../constants/role";
import { STATUS } from "../../../constants/status";


export const ACTIVITY_EVENT_TYPE = Object.freeze({
  SCHOOL_ADMIN_CREATED: "school_admin_created",
  SCHOOL_ADMIN_ASSIGNED: "school_admin_assigned",
  SCHOOL_ADMIN_REMOVED: "school_admin_removed",
  PROFILE_UPDATED: "profile_updated",
  PASSWORD_RESET: "password_reset",
  ACCOUNT_ACTIVATED: "account_activated",
  ACCOUNT_DEACTIVATED: "account_deactivated",
  PERMISSIONS_CHANGED: "permissions_changed",
});

export const ACTIVITY_RESULT = Object.freeze({
  SUCCESS: "success",
  FAILED: "failed",
});

export const ACTIVITY_EVENT_CATALOG = Object.freeze({
  [ACTIVITY_EVENT_TYPE.SCHOOL_ADMIN_CREATED]: {
    label: "School Admin created",
    icon: "userPlus",
  },
  [ACTIVITY_EVENT_TYPE.SCHOOL_ADMIN_ASSIGNED]: {
    label: "Assigned to school",
    icon: "school",
  },
  [ACTIVITY_EVENT_TYPE.SCHOOL_ADMIN_REMOVED]: {
    label: "Removed from school",
    icon: "minus",
  },
  [ACTIVITY_EVENT_TYPE.PROFILE_UPDATED]: {
    label: "Profile updated",
    icon: "pencil",
  },
  [ACTIVITY_EVENT_TYPE.PASSWORD_RESET]: {
    label: "Password reset",
    icon: "eyeOff",
  },
  [ACTIVITY_EVENT_TYPE.ACCOUNT_ACTIVATED]: {
    label: "Account activated",
    icon: "userCheck",
  },
  [ACTIVITY_EVENT_TYPE.ACCOUNT_DEACTIVATED]: {
    label: "Account deactivated",
    icon: "close",
  },
  [ACTIVITY_EVENT_TYPE.PERMISSIONS_CHANGED]: {
    label: "Permissions changed",
    icon: "userCog",
  },
});

const DAY_MS = 24 * 60 * 60 * 1000;
const HOUR_MS = 60 * 60 * 1000;
const MINUTE_MS = 60 * 1000;

function offsetTimestamp(isoDate, { days = 0, hours = 9, minutes = 0 }) {
  const base = new Date(isoDate).getTime();
  return new Date(
    base + days * DAY_MS + hours * HOUR_MS + minutes * MINUTE_MS,
  ).toISOString();
}


export function buildDemoSchoolAdminActivity(admin) {
  if (!admin) {
    return [];
  }

  const events = [
    {
      type: ACTIVITY_EVENT_TYPE.SCHOOL_ADMIN_CREATED,
      offset: { days: 0, hours: 9, minutes: 12 },
      description: `${admin.fullName}'s School Admin account was created.`,
      result: ACTIVITY_RESULT.SUCCESS,
    },
    {
      type: ACTIVITY_EVENT_TYPE.SCHOOL_ADMIN_ASSIGNED,
      offset: { days: 0, hours: 9, minutes: 18 },
      description: `${admin.fullName} was assigned to ${admin.school.name}.`,
      result: ACTIVITY_RESULT.SUCCESS,
    },
    {
      type: ACTIVITY_EVENT_TYPE.PROFILE_UPDATED,
      offset: { days: 21, hours: 11, minutes: 4 },
      description: `${admin.fullName}'s profile and contact information were updated.`,
      result: ACTIVITY_RESULT.SUCCESS,
    },
    {
      type: ACTIVITY_EVENT_TYPE.PERMISSIONS_CHANGED,
      offset: { days: 35, hours: 15, minutes: 47 },
      description: `${admin.fullName}'s permissions were updated.`,
      result: ACTIVITY_RESULT.SUCCESS,
    },
    {
      type: ACTIVITY_EVENT_TYPE.PASSWORD_RESET,
      offset: { days: 42, hours: 10, minutes: 32 },
      description: `${admin.fullName}'s password was reset.`,
      result: ACTIVITY_RESULT.SUCCESS,
    },
  ];

  
  if (admin.status === STATUS.INACTIVE) {
    events.push({
      type: ACTIVITY_EVENT_TYPE.ACCOUNT_DEACTIVATED,
      offset: { days: 56, hours: 16, minutes: 5 },
      description: `${admin.fullName}'s account was deactivated.`,
      result: ACTIVITY_RESULT.SUCCESS,
    });
  }

  return events
    .map((event, index) => ({
      id: `${admin.id}-activity-${index}`,
      actor: "Super Admin",
      actorRole: ROLES.SUPER_ADMIN,
      school: admin.school,
      ...event,
      timestamp: offsetTimestamp(admin.createdAt, event.offset),
    }))
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
}
