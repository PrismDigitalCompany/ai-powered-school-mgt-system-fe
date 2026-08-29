import { useEffect } from "react";
import { useRouteError } from "react-router-dom";
import ErrorContent from "./ErrorContent";
import { getErrorDetails } from "./error.utils";

const ErrorPage = () => {
  const routeError = useRouteError();
  const error = getErrorDetails(routeError);

  useEffect(() => {
    if (routeError) {
      console.error(routeError);
      // Future integration: errorTrackingService.captureException(routeError);
    }
  }, [routeError]);

  return (
    <ErrorContent
      status={error.status}
      title={error.title}
      description={error.desc}
    />
  );
};

export default ErrorPage;
