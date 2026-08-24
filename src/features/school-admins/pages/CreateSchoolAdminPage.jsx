import PageHeader from "../../../components/common/PageHeader";
import { Card } from "../../../components/ui/cards/Card";
import CreateSchoolAdminForm from "../components/CreateSchoolAdminForm";

const CreateSchoolAdminPage = () => (
  <div>
    <PageHeader
      title="Create School Admin"
      subtitle="Create a new School Admin account. School assignment happens in a separate step."
    />

    <Card className="p-6">
      <CreateSchoolAdminForm />
    </Card>
  </div>
);

export default CreateSchoolAdminPage;
