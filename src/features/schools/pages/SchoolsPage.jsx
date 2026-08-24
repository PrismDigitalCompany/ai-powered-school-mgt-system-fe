import { Link } from "react-router-dom";
import PageHeader from "../../../components/common/PageHeader";
import { Card } from "../../../components/ui/cards/Card";
import Btn from "../../../components/ui/Btn";
import Icon from "../../../components/icons/Icon.jsx";
import DataTable from "../../../components/tables/DataTable";
import Pagination from "../../../components/ui/Pagination";
import SchoolsFilters from "../components/SchoolsFilters";
import { schoolsTableColumns } from "../components/schoolsTableColumns";
import { useSchools } from "../hooks/useSchools";
import { ROUTES } from "../../../constants/route";

const SchoolsPage = () => {
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
    plan,
    onPlanChange,
    isLoading,
    isError,
  } = useSchools();

  return (
    <div>
      <PageHeader
        title="Schools"
        subtitle="Every school registered on the platform."
        actions={
          <Btn asChild>
            <Link to={ROUTES.SUPER_ADMIN.SCHOOLS_CREATE}>
              <Icon name="plus" className="h-4 w-4" />
              Register School
            </Link>
          </Btn>
        }
      />

      <Card className="space-y-4 p-4">
        <SchoolsFilters
          search={search}
          onSearchChange={onSearchChange}
          status={status}
          onStatusChange={onStatusChange}
          plan={plan}
          onPlanChange={onPlanChange}
        />

        <DataTable
          columns={schoolsTableColumns}
          data={data}
          isLoading={isLoading}
          isError={isError}
          errorMessage="Something went wrong while loading schools."
          emptyTitle="No schools found"
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

export default SchoolsPage;
