import Modal from "../../../components/dialogs/Modal";
import Badge from "../../../components/ui/Badge";
import EmptyState from "../../../components/feedback/EmptyState";
import {
  useSubscriptionPlanSessionState,
  getEffectiveSubscriptionPlans,
} from "../../subscriptions/data/createdSubscriptionPlans";
import { formatCurrency } from "../../../utils/formatCurrency";
import { STATUS } from "../../../constants/status";

const AssignSubscriptionPlanDialog = ({
  open,
  onClose,
  onSelect,
  currentPlanId,
}) => {
  const sessionState = useSubscriptionPlanSessionState();
  const selectablePlans = getEffectiveSubscriptionPlans(sessionState).filter(
    (plan) => plan.status === STATUS.ACTIVE,
  );

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Select Subscription Plan"
      size="md"
    >
      {selectablePlans.length === 0 ? (
        <EmptyState
          title="No active plans available"
          description="Create or activate a subscription plan first."
        />
      ) : (
        <ul className="max-h-96 divide-y divide-slate-100 overflow-y-auto rounded-lg border border-border">
          {selectablePlans.map((plan) => {
            const isCurrent = plan.id === currentPlanId;
            return (
              <li key={plan.id}>
                <button
                  type="button"
                  onClick={() => onSelect(plan)}
                  disabled={isCurrent}
                  className="flex w-full flex-col gap-2 px-4 py-3 text-left hover:bg-surface-alt focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-inset disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-medium text-text">{plan.name}</p>
                    <div className="flex shrink-0 items-center gap-1.5">
                      {isCurrent && <Badge tone="brand">Current</Badge>}
                      <Badge>{plan.status}</Badge>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-xs text-text-subtle sm:grid-cols-4">
                    <span>
                      Monthly:{" "}
                      {formatCurrency(plan.monthlyPrice, plan.currency)}
                    </span>
                    <span>
                      Yearly: {formatCurrency(plan.yearlyPrice, plan.currency)}
                    </span>
                    <span>
                      Students:{" "}
                      {plan.studentLimit?.toLocaleString() ?? "Unlimited"}
                    </span>
                    <span>
                      Teachers:{" "}
                      {plan.teacherLimit?.toLocaleString() ?? "Unlimited"}
                    </span>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </Modal>
  );
};

export default AssignSubscriptionPlanDialog;
