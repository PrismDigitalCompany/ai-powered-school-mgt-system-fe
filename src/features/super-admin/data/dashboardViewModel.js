export const platformOverview = Object.freeze([
  {
    id: "total-schools",
    title: "Total Schools",
    value: "128",
    icon: "school",
    tone: "brand",
  },
  {
    id: "active-schools",
    title: "Active Schools",
    value: "114",
    icon: "school",
    tone: "success",
    trend: { direction: "up", value: "+6", label: "this month" },
  },
  {
    id: "suspended-schools",
    title: "Suspended Schools",
    value: "5",
    icon: "triangleAlert",
    tone: "danger",
  },
  {
    id: "total-students",
    title: "Total Students",
    value: "48,210",
    icon: "graduationCap",
    tone: "brand",
    trend: { direction: "up", value: "+3.2%", label: "vs last month" },
  },
  {
    id: "total-teachers",
    title: "Total Teachers",
    value: "3,640",
    icon: "userCheck",
    tone: "brand",
  },
  {
    id: "total-parents",
    title: "Total Parents",
    value: "39,870",
    icon: "users",
    tone: "brand",
  },
]);

export const subscriptionOverview = Object.freeze({
  stats: [
    {
      id: "active-subs",
      title: "Active Subscriptions",
      value: "109",
      icon: "creditCard",
      tone: "success",
    },
    {
      id: "trial-schools",
      title: "Trial Schools",
      value: "14",
      icon: "calendar",
      tone: "info",
    },
    {
      id: "expired-subs",
      title: "Expired Subscriptions",
      value: "5",
      icon: "triangleAlert",
      tone: "danger",
    },
  ],

  planDistribution: [
    { plan: "Basic", schools: 61 },
    { plan: "Professional", schools: 44 },
    { plan: "Enterprise", schools: 9 },
  ],
});

export const revenueTrend = Object.freeze([
  { label: "Mar", value: 18200 },
  { label: "Apr", value: 19850 },
  { label: "May", value: 21100 },
  { label: "Jun", value: 20400 },
  { label: "Jul", value: 23600 },
  { label: "Aug", value: 25980 },
]);

export const schoolGrowth = Object.freeze([
  { label: "Mar", schools: 96 },
  { label: "Apr", schools: 103 },
  { label: "May", schools: 108 },
  { label: "Jun", schools: 115 },
  { label: "Jul", schools: 122 },
  { label: "Aug", schools: 128 },
]);

export const recentActivity = Object.freeze([
  {
    id: "1",
    type: "school_registered",
    label: "Greenfield Academy registered",
    timestamp: "2 hours ago",
    icon: "school",
  },
  {
    id: "2",
    type: "subscription_upgraded",
    label: "Riverside High upgraded to Professional",
    timestamp: "5 hours ago",
    icon: "creditCard",
  },
  {
    id: "3",
    type: "payment_received",
    label: "Payment received from Oakwood International",
    timestamp: "Yesterday",
    icon: "wallet",
  },
  {
    id: "4",
    type: "user_created",
    label: "New School Admin added for Lakeside School",
    timestamp: "Yesterday",
    icon: "userPlus",
  },
  {
    id: "5",
    type: "school_suspended",
    label: "Hilltop School suspended for non-payment",
    timestamp: "2 days ago",
    icon: "triangleAlert",
  },
  {
    id: "6",
    type: "role_changed",
    label: "Role updated for a platform user",
    timestamp: "3 days ago",
    icon: "userCog",
  },
]);

export const systemHealth = Object.freeze([
  { id: "api", label: "API", status: "active", icon: "server" },
  { id: "database", label: "Database", status: "active", icon: "database" },
  {
    id: "background-jobs",
    label: "Background Jobs",
    status: "active",
    icon: "clipboardCheck",
  },
  {
    id: "payment-gateway",
    label: "Payment Gateway",
    status: "active",
    icon: "creditCard",
  },
  {
    id: "notifications",
    label: "Notification Service",
    status: "pending",
    icon: "bell",
  },
  { id: "storage", label: "Storage", status: "active", icon: "folder" },
]);

export const quickActions = Object.freeze([
  { id: "register-school", label: "Register School", icon: "plus" },
  { id: "manage-schools", label: "Manage Schools", icon: "school" },
  {
    id: "manage-subscriptions",
    label: "Manage Subscriptions",
    icon: "creditCard",
  },
  { id: "view-audit-logs", label: "View Audit Logs", icon: "clipboardList" },
]);
