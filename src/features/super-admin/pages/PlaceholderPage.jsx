import EmptyState from "../../../components/feedback/EmptyState";

const PlaceholderPage = ({ moduleName }) => (
  <div>
    <h1 className="text-2xl font-semibold text-text">{moduleName}</h1>
    <div className="mt-8">
      <EmptyState
        title={`${moduleName} isn't built yet`}
        description="This is a placeholder for route verification. The real module lands in a later task."
      />
    </div>
  </div>
);

export default PlaceholderPage;
