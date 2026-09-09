import { useNavigate, useParams, Link } from "react-router-dom";

import PageHeader from "../../../components/common/PageHeader";
import { Card } from "../../../components/ui/cards/Card";
import Btn from "../../../components/ui/Btn";
import EmptyState from "../../../components/feedback/EmptyState";
import ChangeSchoolSubscriptionForm from "../components/ChangeSchoolSubscriptionForm";
import { useSchool } from "../../schools/hooks/useSchool";
import { useSchoolSubscription } from "../hooks/useSchoolSubscription";
import { ROUTES, buildPath } from "../../../constants/route";

const ChangeSchoolSubscriptionPage = () => {
  const { schoolId } = useParams();
  const navigate = useNavigate();
  const { data: school } = useSchool(schoolId);
  const { data: subscription } = useSchoolSubscription(schoolId);

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

  if (!subscription) {
    return (
      <div>
        <PageHeader
          title={`Change Subscription for ${school.name}`}
          subtitle={school.code}
        />
        <Card className="p-8">
          <EmptyState
            title="No subscription record to change"
            description={`${school.name} does not have an actual subscription record yet. There's nothing to change until one exists.`}
            action={
              <Btn asChild>
                <Link to={subscriptionDetailsPath}>
                  Back to Subscription Details
                </Link>
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
        title={`Change Subscription for ${school.name}`}
        subtitle={school.code}
        actions={
          <Btn
            variant="secondary"
            onClick={() => navigate(subscriptionDetailsPath)}
          >
            Back to Details
          </Btn>
        }
      />

      <Card className="p-6">
        <ChangeSchoolSubscriptionForm
          school={school}
          subscription={subscription}
        />
      </Card>
    </div>
  );
};

export default ChangeSchoolSubscriptionPage;
