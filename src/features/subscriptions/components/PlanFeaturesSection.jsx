import { PLAN_FEATURE_CATALOG } from "../data/subscriptionPlans";

/**
 * Renders exactly the centralized feature flags from
 * data/subscriptionPlans.js's PLAN_FEATURE_CATALOG — Parent Portal,
 * Advanced Reports, Multiple Campuses, Advanced Analytics, Custom
 * Features — never a second hardcoded flag list, so a flag added there
 * later appears here automatically.
 */
const PlanFeaturesSection = ({ register }) => (
  <div className="space-y-5">
    <h2 className="text-base font-semibold text-text">Features</h2>
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {Object.entries(PLAN_FEATURE_CATALOG).map(([key, label]) => (
        <label
          key={key}
          className="flex items-center gap-2 rounded-lg border border-border px-3 py-2.5 text-sm text-text"
        >
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-border accent-brand-600"
            {...register(`features.${key}`)}
          />
          {label}
        </label>
      ))}
    </div>
  </div>
);

export default PlanFeaturesSection;
