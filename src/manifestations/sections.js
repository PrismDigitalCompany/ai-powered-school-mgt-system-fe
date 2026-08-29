import { GROUPS } from "../constants/group";

// display the breadcrumbs to users
export const SECTIONS = Object.freeze({
  [GROUPS.AUTH]: {
    label: "Authentication",
    order: 0,
  },

  [GROUPS.SUPER_ADMIN]: {
    label: "Super Admin",
    order: 1,
  },

  [GROUPS.SCHOOL_ADMIN]: {
    label: "School Setup",
    order: 2,
  },

  [GROUPS.ADMISSIONS]: {
    label: "Admissions",
    order: 3,
  },

  [GROUPS.STUDENTS]: {
    label: "Students",
    order: 4,
  },

  [GROUPS.ACADEMICS]: {
    label: "Results & Academics",
    order: 5,
  },

  [GROUPS.ATTENDANCE]: {
    label: "Attendance",
    order: 6,
  },

  [GROUPS.FINANCE]: {
    label: "Fees & Finance",
    order: 7,
  },

  [GROUPS.PARENTS]: {
    label: "Parent Portal",
    order: 8,
  },

  [GROUPS.TEACHERS]: {
    label: "Teacher Portal",
    order: 9,
  },

  [GROUPS.LIBRARY]: {
    label: "Library",
    order: 10,
  },

  [GROUPS.HOSTEL]: {
    label: "Hostel",
    order: 11,
  },

  [GROUPS.HR]: {
    label: "Payroll & HR",
    order: 12,
  },

  [GROUPS.CBT]: {
    label: "CBT",
    order: 13,
  },

  [GROUPS.COMMUNICATION]: {
    label: "Communication",
    order: 14,
  },

  [GROUPS.AI]: {
    label: "AI Features",
    order: 15,
  },

  [GROUPS.ANALYTICS]: {
    label: "Analytics",
    order: 16,
  },

  [GROUPS.SHARED]: {
    label: "General",
    order: 17,
  },
});
