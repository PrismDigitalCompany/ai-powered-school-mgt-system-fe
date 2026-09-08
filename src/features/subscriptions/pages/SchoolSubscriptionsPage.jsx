import PageHeader from "../../../components/common/PageHeader";
import { Card } from "../../../components/ui/cards/Card";
import DataTable from "../../../components/tables/DataTable";
import Pagination from "../../../components/ui/Pagination";
import SchoolSubscriptionsFilters from "../components/SchoolSubscriptionsFilters";
import { schoolSubscriptionsTableColumns } from "../components/schoolSubscriptionsTableColumns";
import { useSchoolSubscriptions } from "../hooks/useSchoolSubscriptions";

const SchoolSubscriptionsPage = () => {
  const {
    data,
    totalItems,
    page,
    pageSize,
    onPageChange,
    search,
    onSearchChange,
    status,
    onStatusChange,
    planId,
    onPlanIdChange,
    billingCycle,
    onBillingCycleChange,
    isLoading,
    isError,
  } = useSchoolSubscriptions();

  return (
    <div>
      <PageHeader
        title="School Subscriptions"
        subtitle="Actual subscription records for schools on the platform."
      />

      <Card className="space-y-4 p-4">
        <SchoolSubscriptionsFilters
          search={search}
          onSearchChange={onSearchChange}
          status={status}
          onStatusChange={onStatusChange}
          planId={planId}
          onPlanIdChange={onPlanIdChange}
          billingCycle={billingCycle}
          onBillingCycleChange={onBillingCycleChange}
        />

        <DataTable
          columns={schoolSubscriptionsTableColumns}
          data={data}
          isLoading={isLoading}
          isError={isError}
          errorMessage="Something went wrong while loading school subscriptions."
          emptyTitle="No school subscriptions found"
          emptyDescription="Try adjusting your search or filters."
        />

        {!isLoading && !isError && totalItems > 0 && (
          <Pagination
            page={page}
            pageSize={pageSize}
            totalItems={totalItems}
            onPageChange={onPageChange}
          />
        )}
      </Card>
    </div>
  );
};

export default SchoolSubscriptionsPage;
