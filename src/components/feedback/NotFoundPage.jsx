import ErrorContent from "../../errors/ErrorContent";


const NotFoundPage = () => (
  <ErrorContent
    status={404}
    title="Page not found"
    description="The page you're looking for doesn't exist, or hasn't been built yet."
  />
);

export default NotFoundPage;
