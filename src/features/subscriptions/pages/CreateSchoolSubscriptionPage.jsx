import { useNavigate, useParams, Link } from "react-router-dom";

import PageHeader from "../../../components/common/PageHeader";
import { Card } from "../../../components/ui/cards/Card";
import Btn from "../../../components/ui/Btn";
import EmptyState from "../../../components/feedback/EmptyState";
import CreateSchoolSubscriptionForm from "../components/CreateSchoolSubscriptionForm";
import { useSchool } from "../../schools/hooks/useSchool";
import { useSchoolSubscription } from "../hooks/useSchoolSubscription";
import { ROUTES, buildPath } from "../../../constants/route";

const CreateSchoolSubscriptionPage = () => {
  const { schoolId } = useParams();
  const navigate = useNavigate();
  const { data: school } = useSchool(schoolId);
  const { data: existingSubscription } = useSchoolSubscription(schoolId);

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
              <Btn
                onClick={() =>
                  navigate(ROUTES.SUPER_ADMIN.SCHOOL_SUBSCRIPTIONS)
                }
              >
                Back to School Subscriptions
              </Btn>
            }
          />
        </Card>
      </div>
    );
  }

  const subscriptionDetailsPath = buildPath(
    ROUTES.SUPER_ADMIN.SCHOOL_SUBSCRIPTION_DETAILS,
    { schoolId: school.id },
  );

  if (existingSubscription) {
    return (
      <div>
        <PageHeader
          title={`Create Subscription for ${school.name}`}
          subtitle={school.code}
        />
        <Card className="p-8">
          <EmptyState
            title="This school already has a subscription"
            description={`${school.name} already has an active subscription record. Creating a second one here isn't supported — changing an existing subscription is a separate workflow that isn't built yet.`}
            action={
              <Btn asChild>
                <Link to={subscriptionDetailsPath}>View Subscription</Link>
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
        title={`Create Subscription for ${school.name}`}
        subtitle={school.code}
        actions={
          <Btn
            variant="secondary"
            onClick={() =>
              navigate(
                buildPath(ROUTES.SUPER_ADMIN.SCHOOL_DETAILS, { id: school.id }),
              )
            }
          >
            Back to School
          </Btn>
        }
      />

      <Card className="p-6">
        <CreateSchoolSubscriptionForm school={school} />
      </Card>
    </div>
  );
};

export default CreateSchoolSubscriptionPage;
