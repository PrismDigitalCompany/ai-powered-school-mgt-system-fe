import { Link } from "react-router-dom";
import PageHeader from "../../../components/common/PageHeader";
import { Card } from "../../../components/ui/cards/Card";
import Btn from "../../../components/ui/Btn";
import Icon from "../../../components/icons/Icon.jsx";
import EmptyState from "../../../components/feedback/EmptyState";
import ErrorState from "../../../components/feedback/ErrorState";
import LoadingState from "../../../components/feedback/LoadingState";
import SubscriptionPlansFilters from "../components/SubscriptionPlansFilters";
import SubscriptionPlanCard from "../components/SubscriptionPlanCard";
import { useSubscriptionPlans } from "../hooks/useSubscriptionPlans";
import { ROUTES } from "../../../constants/route";


const SubscriptionPlansPage = () => {
  const {
    data,
    totalItems,
    search,
    onSearchChange,
    status,
    onStatusChange,
    isLoading,
    isError,
  } = useSubscriptionPlans();

  const hasFilters = Boolean(search || status);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Subscription Plans"
        subtitle="The plans available to schools on the platform."
        actions={
          <Btn asChild>
            <Link to={ROUTES.SUPER_ADMIN.SUBSCRIPTION_PLANS_CREATE}>
              <Icon name="plus" className="h-4 w-4" />
              Create Plan
            </Link>
          </Btn>
        }
      />

      <Card className="space-y-4 p-4">
        <SubscriptionPlansFilters
          search={search}
          onSearchChange={onSearchChange}
          status={status}
          onStatusChange={onStatusChange}
        />
      </Card>

      {isLoading && <LoadingState />}

      {!isLoading && isError && (
        <ErrorState description="Something went wrong while loading subscription plans." />
      )}

      {!isLoading && !isError && totalItems === 0 && (
        <Card>
          <EmptyState
            title="No matching plans"
            description={
              hasFilters
                ? "Try adjusting or clearing the filters above."
                : "No subscription plans are configured yet."
            }
          />
        </Card>
      )}

      {!isLoading && !isError && totalItems > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((plan) => (
            <SubscriptionPlanCard key={plan.id} plan={plan} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SubscriptionPlansPage;
