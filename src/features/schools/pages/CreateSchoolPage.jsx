import PageHeader from "../../../components/common/PageHeader";
import { Card } from "../../../components/ui/cards/Card";
import CreateSchoolForm from "../components/CreateSchoolForm";

const CreateSchoolPage = () => (
  <div>
    <PageHeader
      title="Register School"
      subtitle="Add a new school to the platform." className="bg"
    />

    <Card className="p-6">
      <CreateSchoolForm />
    </Card>
  </div>
);

export default CreateSchoolPage;
