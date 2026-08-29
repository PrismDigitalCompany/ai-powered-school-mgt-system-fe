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
];
