import PageHeader from "../../../components/common/PageHeader";
import { Card } from "../../../components/ui/cards/Card";
import CreateSubscriptionPlanForm from "../components/CreateSubscriptionPlanForm";

const CreateSubscriptionPlanPage = () => (
  <div>
    <PageHeader
      title="Create Subscription Plan"
      subtitle="Define a new plan available to schools on the platform."
    />

    <Card className="p-6">
      <CreateSubscriptionPlanForm />
    </Card>
  </div>
);

export default CreateSubscriptionPlanPage;
