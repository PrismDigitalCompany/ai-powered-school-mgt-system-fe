import { useParams, useNavigate, Link } from "react-router-dom";
import { format } from "date-fns";

import PageHeader from "../../../components/common/PageHeader";
import { Card } from "../../../components/ui/cards/Card";
import Btn from "../../../components/ui/Btn";
import Badge from "../../../components/ui/Badge";
import EmptyState from "../../../components/feedback/EmptyState";
import Can from "../../../components/authorization/Can";
import SchoolDetailField from "../../schools/components/SchoolDetailField";
import { useSchool } from "../../schools/hooks/useSchool";
import { useSchoolSubscription } from "../hooks/useSchoolSubscription";
import {
  SUBSCRIPTION_STATUS_BADGE,
  BILLING_CYCLE_LABEL,
} from "../data/schoolSubscriptions";
import { formatCurrency } from "../../../utils/formatCurrency";
import { PERMISSIONS } from "../../../constants/permission";
import { ROUTES, buildPath } from "../../../constants/route";

const SchoolSubscriptionDetailsPage = () => {
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

  const statusBadge = subscription
    ? SUBSCRIPTION_STATUS_BADGE[subscription.status]
    : null;

  return (
    <div className="space-y-6">
      <PageHeader
        title={`${school.name}'s Subscription`}
        subtitle={school.code}
        actions={
          <Btn
            variant="secondary"
            onClick={() => navigate(ROUTES.SUPER_ADMIN.SCHOOL_SUBSCRIPTIONS)}
          >
            Back to School Subscriptions
          </Btn>
        }
      />

      <Card className="p-6">
        <h2 className="mb-4 text-base font-semibold text-text">School</h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <SchoolDetailField label="School Name" value={school.name} />
          <SchoolDetailField label="School Code" value={school.code} />
        </div>
      </Card>

      {!subscription ? (
        <Card>
          <EmptyState
            title="No subscription record"
            description={`${school.name} has not been placed on an actual subscription yet. A selected plan (if any) is a separate, simpler relationship shown on the school's own Details page — it does not by itself mean this school has a paid subscription.`}
            action={
              <div className="flex flex-wrap justify-center gap-2">
                <Can permission={PERMISSIONS.SUBSCRIPTIONS_MANAGE}>
                  <Btn asChild>
                    <Link
                      to={buildPath(
                        ROUTES.SUPER_ADMIN.SCHOOL_SUBSCRIPTION_CREATE,
                        { schoolId: school.id },
                      )}
                    >
                      Create Subscription
                    </Link>
                  </Btn>
                </Can>
                <Btn asChild variant="secondary">
                  <Link
                    to={buildPath(ROUTES.SUPER_ADMIN.SCHOOL_DETAILS, {
                      id: school.id,
                    })}
                  >
                    View School Details
                  </Link>
                </Btn>
              </div>
            }
          />
        </Card>
      ) : (
        <>
          <Card className="p-6">
            <h2 className="mb-4 text-base font-semibold text-text">
              Subscription
            </h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <SchoolDetailField
                label="Plan"
                value={
                  subscription.plan ? (
                    subscription.plan.name
                  ) : (
                    <span className="text-text-subtle">
                      Plan unavailable — it may have been edited or removed from
                      the catalog since this subscription began.
                    </span>
                  )
                }
              />
              <SchoolDetailField
                label="Status"
                value={
                  <Badge tone={statusBadge?.tone}>
                    {statusBadge?.label ?? subscription.status}
                  </Badge>
                }
              />
              <SchoolDetailField
                label="Billing Cycle"
                value={
                  BILLING_CYCLE_LABEL[subscription.billingCycle] ??
                  subscription.billingCycle
                }
              />
              <SchoolDetailField
                label="Amount"
                value={formatCurrency(
                  subscription.amount,
                  subscription.currency,
                )}
              />
              <SchoolDetailField
                label="Currency"
                value={subscription.currency}
              />
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="mb-4 text-base font-semibold text-text">Dates</h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <SchoolDetailField
                label="Start Date"
                value={format(new Date(subscription.startDate), "d MMM yyyy")}
              />
              <SchoolDetailField
                label="Renewal Date"
                value={
                  subscription.renewalDate
                    ? format(new Date(subscription.renewalDate), "d MMM yyyy")
                    : undefined
                }
              />
              <SchoolDetailField
                label="End Date"
                value={
                  subscription.endDate
                    ? format(new Date(subscription.endDate), "d MMM yyyy")
                    : undefined
                }
              />
              {(subscription.trialStartDate || subscription.trialEndDate) && (
                <>
                  <SchoolDetailField
                    label="Trial Start Date"
                    value={
                      subscription.trialStartDate
                        ? format(
                            new Date(subscription.trialStartDate),
                            "d MMM yyyy",
                          )
                        : undefined
                    }
                  />
                  <SchoolDetailField
                    label="Trial End Date"
                    value={
                      subscription.trialEndDate
                        ? format(
                            new Date(subscription.trialEndDate),
                            "d MMM yyyy",
                          )
                        : undefined
                    }
                  />
                </>
              )}
            </div>
          </Card>
        </>
      )}
    </div>
  );
};

export default SchoolSubscriptionDetailsPage;
