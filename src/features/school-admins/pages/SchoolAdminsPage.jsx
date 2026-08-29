import { Link } from "react-router-dom";
import PageHeader from "../../../components/common/PageHeader";
import { Card } from "../../../components/ui/cards/Card";
import Btn from "../../../components/ui/Btn";
import Icon from "../../../components/icons/Icon.jsx";
import DataTable from "../../../components/tables/DataTable";
import Pagination from "../../../components/ui/Pagination";
import SchoolAdminsFilters from "../components/SchoolAdminsFilters";
import { schoolAdminsTableColumns } from "../components/schoolAdminsTableColumns";
import { useSchoolAdmins } from "../hooks/useSchoolAdmins";
import { ROUTES } from "../../../constants/route";


const SchoolAdminsPage = () => {
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
    schoolId,
    onSchoolIdChange,
    isLoading,
    isError,
  } = useSchoolAdmins();

  return (
    <div>
      <PageHeader
        title="School Administrators"
        subtitle="Everyone assigned to administer a school on the platform."
        actions={
          <Btn asChild>
            <Link to={ROUTES.SUPER_ADMIN.SCHOOL_ADMINS_CREATE}>
              <Icon name="plus" className="h-4 w-4" />
              Create School Admin
            </Link>
          </Btn>
        }
      />

      <Card className="space-y-4 p-4">
        <SchoolAdminsFilters
          search={search}
          onSearchChange={onSearchChange}
          status={status}
          onStatusChange={onStatusChange}
          schoolId={schoolId}
          onSchoolIdChange={onSchoolIdChange}
        />

        <DataTable
          columns={schoolAdminsTableColumns}
          data={data}
          isLoading={isLoading}
          isError={isError}
          errorMessage="Something went wrong while loading School Administrators."
          emptyTitle="No School Administrators found"
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

export default SchoolAdminsPage;
