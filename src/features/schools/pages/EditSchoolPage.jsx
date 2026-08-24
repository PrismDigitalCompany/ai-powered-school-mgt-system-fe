import { useParams, useNavigate } from "react-router-dom";
import { format } from "date-fns";

import PageHeader from "../../../components/common/PageHeader";
import { Card } from "../../../components/ui/cards/Card";
import Btn from "../../../components/ui/Btn";
import Badge from "../../../components/ui/Badge";
import EmptyState from "../../../components/feedback/EmptyState";
import SchoolDetailField from "../components/SchoolDetailField";
import EditSchoolForm from "../components/EditSchoolForm";
import { useSchool } from "../hooks/useSchool";
import { ROUTES, buildPath } from "../../../constants/route";

const EditSchoolPage = () => {
  const { id: schoolId } = useParams();
  const navigate = useNavigate();
  const { data: school } = useSchool(schoolId);

  if (!school) {
    return (
      <div>
        <PageHeader
          title="School not found"
          subtitle="This school doesn't exist or may have been removed."
        />
        <Card className="p-8">
          <EmptyState
            title="No matching school"
            description={`No school was found for "${schoolId}".`}
            action={
              <Btn onClick={() => navigate(ROUTES.SUPER_ADMIN.SCHOOLS)}>
                Back to Schools
              </Btn>
            }
          />
        </Card>
      </div>
    );
  }

  const detailsPath = buildPath(ROUTES.SUPER_ADMIN.SCHOOL_DETAILS, {
    id: school.id,
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Edit ${school.name}`}
        subtitle="Update the school's profile information."
        actions={
          <Btn variant="secondary" onClick={() => navigate(detailsPath)}>
            Back to Details
          </Btn>
        }
      />

      <Card className="p-6">
        <h2 className="mb-1 text-base font-semibold text-text">
          Not editable here
        </h2>
        <p className="mb-4 text-sm text-text-muted">
          Status, subscription, usage, and School Admin details are managed
          through separate workflows.
        </p>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <SchoolDetailField
            label="Status"
            value={<Badge>{school.status}</Badge>}
          />
          <SchoolDetailField
            label="Subscription Plan"
            value={school.subscriptionPlan}
          />
          <SchoolDetailField
            label="Subscription Status"
            value={<Badge>{school.subscriptionStatus}</Badge>}
          />
          <SchoolDetailField
            label="Students"
            value={school.studentsCount.toLocaleString()}
          />
          <SchoolDetailField
            label="Teachers"
            value={school.teachersCount.toLocaleString()}
          />
          <SchoolDetailField
            label="Date Registered"
            value={format(new Date(school.createdAt), "d MMM yyyy")}
          />
          <SchoolDetailField
            label="School Admin"
            value={school.schoolAdmin?.fullName ?? "Not assigned"}
          />
        </div>
      </Card>

      <Card className="p-6">
        <EditSchoolForm school={school} />
      </Card>
    </div>
  );
};

export default EditSchoolPage;
