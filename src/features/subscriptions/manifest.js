import { lazy } from "react";
import { ROUTES } from "../../constants/route";
import { LAYOUTS } from "../../constants/layouts";
import { PERMISSIONS } from "../../constants/permission";

const SubscriptionPlansPage = lazy(
  () => import("./pages/SubscriptionPlansPage"),
);
const SubscriptionPlanDetailsPage = lazy(
  () => import("./pages/SubscriptionPlanDetailsPage"),
);
const CreateSubscriptionPlanPage = lazy(
  () => import("./pages/CreateSubscriptionPlanPage"),
);
const EditSubscriptionPlanPage = lazy(
  () => import("./pages/EditSubscriptionPlanPage"),
);
const SchoolSubscriptionsPage = lazy(
  () => import("./pages/SchoolSubscriptionsPage"),
);
const SchoolSubscriptionDetailsPage = lazy(
  () => import("./pages/SchoolSubscriptionDetailsPage"),
);
const CreateSchoolSubscriptionPage = lazy(
  () => import("./pages/CreateSchoolSubscriptionPage"),
);
const ChangeSchoolSubscriptionPage = lazy(
  () => import("./pages/ChangeSchoolSubscriptionPage"),
);

export const manifest = [
  {
    path: ROUTES.SUPER_ADMIN.SUBSCRIPTIONS,
    component: SubscriptionPlansPage,
    layout: LAYOUTS.SUPER_ADMIN,
    title: "Subscription Plans",
    permission: PERMISSIONS.SUBSCRIPTIONS_VIEW,
  },
  {
    path: ROUTES.SUPER_ADMIN.SUBSCRIPTION_PLANS_CREATE,
    component: CreateSubscriptionPlanPage,
    layout: LAYOUTS.SUPER_ADMIN,
    title: "Create Subscription Plan",
    permission: PERMISSIONS.SUBSCRIPTIONS_MANAGE,
  },
  {
    path: ROUTES.SUPER_ADMIN.SUBSCRIPTION_PLAN_DETAILS,
    component: SubscriptionPlanDetailsPage,
    layout: LAYOUTS.SUPER_ADMIN,
    title: "Subscription Plan Details",
    permission: PERMISSIONS.SUBSCRIPTIONS_VIEW,
  },
  {
    path: ROUTES.SUPER_ADMIN.SUBSCRIPTION_PLAN_EDIT,
    component: EditSubscriptionPlanPage,
    layout: LAYOUTS.SUPER_ADMIN,
    title: "Edit Subscription Plan",
    permission: PERMISSIONS.SUBSCRIPTIONS_MANAGE,
  },
  {
    // Sibling collection to the /plans/* routes above, under the same
    // /admin/subscriptions/* umbrella this manifest's own top comment
    // already anticipated. "/schools" (list) vs "/schools/:schoolId"
    // (details) is the same safe static-vs-dynamic shape already proven
    // by every other list/details pair in this app.
    path: ROUTES.SUPER_ADMIN.SCHOOL_SUBSCRIPTIONS,
    component: SchoolSubscriptionsPage,
    layout: LAYOUTS.SUPER_ADMIN,
    title: "School Subscriptions",
    permission: PERMISSIONS.SUBSCRIPTIONS_VIEW,
  },
  {
    path: ROUTES.SUPER_ADMIN.SCHOOL_SUBSCRIPTION_DETAILS,
    component: SchoolSubscriptionDetailsPage,
    layout: LAYOUTS.SUPER_ADMIN,
    title: "School Subscription Details",
    permission: PERMISSIONS.SUBSCRIPTIONS_VIEW,
  },
  {
    // One segment deeper than SCHOOL_SUBSCRIPTION_DETAILS
    // ("/:schoolId/create" vs "/:schoolId") — different segment count,
    // same safe shape SCHOOL_ADMIN_EDIT already relies on. Gated by
    // SUBSCRIPTIONS_MANAGE, not VIEW: creating a subscription record is
    // a write.
    path: ROUTES.SUPER_ADMIN.SCHOOL_SUBSCRIPTION_CREATE,
    component: CreateSchoolSubscriptionPage,
    layout: LAYOUTS.SUPER_ADMIN,
    title: "Create School Subscription",
    permission: PERMISSIONS.SUBSCRIPTIONS_MANAGE,
  },
  {
    // Same "/:schoolId/edit" shape SCHOOL_EDIT already uses alongside
    // SCHOOL_DETAILS — a distinct static trailing segment from both
    // SCHOOL_SUBSCRIPTION_DETAILS ("/:schoolId") and
    // SCHOOL_SUBSCRIPTION_CREATE ("/:schoolId/create"), so it can't
    // shadow either. Gated by SUBSCRIPTIONS_MANAGE, not VIEW: changing
    // a subscription record is a write.
    path: ROUTES.SUPER_ADMIN.SCHOOL_SUBSCRIPTION_EDIT,
    component: ChangeSchoolSubscriptionPage,
    layout: LAYOUTS.SUPER_ADMIN,
    title: "Change School Subscription",
    permission: PERMISSIONS.SUBSCRIPTIONS_MANAGE,
  },
];
