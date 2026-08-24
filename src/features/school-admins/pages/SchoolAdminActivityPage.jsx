import { useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import PageHeader from "../../../components/common/PageHeader";
import { Card } from "../../../components/ui/cards/Card";
import Btn from "../../../components/ui/Btn";
import EmptyState from "../../../components/feedback/EmptyState";
import ErrorState from "../../../components/feedback/ErrorState";
import LoadingState from "../../../components/feedback/LoadingState";
import Pagination from "../../../components/ui/Pagination";
import SchoolAdminActivityFilters from "../components/SchoolAdminActivityFilters";
import SchoolAdminActivityTimeline from "../components/SchoolAdminActivityTimeline";
import { useSchoolAdmin } from "../hooks/useSchoolAdmin";
import { useSchoolAdminActivity } from "../hooks/useSchoolAdminActivity";
import { ROUTES, buildPath } from "../../../constants/route";

const PAGE_SIZE = 10;


const SchoolAdminActivityPage = () => {
  const { id: adminId } = useParams();
  const navigate = useNavigate();
  const { data: admin } = useSchoolAdmin(adminId);
  const {
    data: activity,
    isLoading,
    isError,
  } = useSchoolAdminActivity(adminId);

  const [eventType, setEventType] = useState("");
  const [result, setResult] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [page, setPage] = useState(1);

  const withPageReset = (setter) => (value) => {
    setter(value);
    setPage(1);
  };

  const filtered = useMemo(() => {
    return activity.filter((entry) => {
      const matchesType = !eventType || entry.type === eventType;
      const matchesResult = !result || entry.result === result;
      const entryDate = entry.timestamp.slice(0, 10);
      const matchesFrom = !dateFrom || entryDate >= dateFrom;
      const matchesTo = !dateTo || entryDate <= dateTo;
      return matchesType && matchesResult && matchesFrom && matchesTo;
    });
  }, [activity, eventType, result, dateFrom, dateTo]);

  const totalItems = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageEntries = filtered.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  );

  const hasFilters = Boolean(eventType || result || dateFrom || dateTo);
  const clearFilters = () => {
    setEventType("");
    setResult("");
    setDateFrom("");
    setDateTo("");
    setPage(1);
  };

  const detailsPath = admin
    ? buildPath(ROUTES.SUPER_ADMIN.SCHOOL_ADMIN_DETAILS, { id: admin.id })
    : null;

  if (!admin) {
    return (
      <div>
        <PageHeader
          title="School Administrator not found"
          subtitle="This School Administrator doesn't exist or may have been removed."
        />
        <Card className="p-8">
          <EmptyState
            title="No matching School Administrator"
            description={`No School Administrator was found for "${adminId}".`}
            action={
              <Btn onClick={() => navigate(ROUTES.SUPER_ADMIN.SCHOOL_ADMINS)}>
                Back to School Administrators
              </Btn>
            }
          />
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={`${admin.fullName}'s Activity`}
        subtitle="A read-only history of important events on this School Admin account."
        actions={
          <Btn variant="secondary" onClick={() => navigate(detailsPath)}>
            Back to Details
          </Btn>
        }
      />

      <Card className="space-y-4 p-4">
        <SchoolAdminActivityFilters
          eventType={eventType}
          onEventTypeChange={withPageReset(setEventType)}
          result={result}
          onResultChange={withPageReset(setResult)}
          dateFrom={dateFrom}
          onDateFromChange={withPageReset(setDateFrom)}
          dateTo={dateTo}
          onDateToChange={withPageReset(setDateTo)}
        />
      </Card>

      {isLoading && <LoadingState />}

      {!isLoading && isError && (
        <ErrorState description="Something went wrong while loading this School Admin's activity." />
      )}

      {!isLoading && !isError && totalItems === 0 && (
        <Card>
          <EmptyState
            title={hasFilters ? "No matching activity" : "No activity yet"}
            description={
              hasFilters
                ? "Try adjusting or clearing the filters above."
                : "Nothing has happened on this account yet."
            }
            action={
              hasFilters ? (
                <Btn variant="secondary" onClick={clearFilters}>
                  Clear filters
                </Btn>
              ) : undefined
            }
          />
        </Card>
      )}

      {!isLoading && !isError && totalItems > 0 && (
        <>
          <SchoolAdminActivityTimeline entries={pageEntries} />
          <Pagination
            page={safePage}
            pageSize={PAGE_SIZE}
            totalItems={totalItems}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  );
};

export default SchoolAdminActivityPage;
