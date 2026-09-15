import { STATUS } from "../../../constants/status";

export const PLAN_FEATURE_CATALOG = Object.freeze({
  parentPortal: "Parent Portal",
  advancedReports: "Advanced Reports",
  multipleCampuses: "Multiple Campuses",
  advancedAnalytics: "Advanced Analytics",
  customFeatures: "Custom Features",
});

export function getEnabledFeatureKeys(plan) {
  return Object.keys(PLAN_FEATURE_CATALOG).filter((key) => plan.features[key]);
}

export const MOCK_SUBSCRIPTION_PLANS = Object.freeze([
  Object.freeze({
    id: "basic",
    name: "Basic",
    description:
      "For a single school getting started with core enrollment, attendance, and results.",
    monthlyPrice: 15000,
    yearlyPrice: 150000,
    currency: "₦",
    studentLimit: 500,
    teacherLimit: 30,
    campusLimit: 1,
    features: Object.freeze({
      parentPortal: false,
      advancedReports: false,
      multipleCampuses: false,
      advancedAnalytics: false,
      customFeatures: false,
    }),
    status: STATUS.ACTIVE,
  }),
  Object.freeze({
    id: "professional",
    name: "Professional",
    description:
      "For growing schools that need parent engagement and deeper reporting.",
    monthlyPrice: 45000,
    yearlyPrice: 450000,
    currency: "₦",
    studentLimit: 2000,
    teacherLimit: 120,
    campusLimit: 3,
    features: Object.freeze({
      parentPortal: true,
      advancedReports: true,
      multipleCampuses: false,
      advancedAnalytics: false,
      customFeatures: false,
    }),
    status: STATUS.ACTIVE,
  }),
  Object.freeze({
    id: "enterprise",
    name: "Enterprise",
    description:
      "For multi-campus school groups that need full analytics and custom capabilities.",
    monthlyPrice: 120000,
    yearlyPrice: 1200000,
    currency: "₦",
    studentLimit: null,
    teacherLimit: null,
    campusLimit: null,
    features: Object.freeze({
      parentPortal: true,
      advancedReports: true,
      multipleCampuses: true,
      advancedAnalytics: true,
      customFeatures: true,
    }),
    status: STATUS.ACTIVE,
  }),
]);

export default MOCK_SUBSCRIPTION_PLANS;
