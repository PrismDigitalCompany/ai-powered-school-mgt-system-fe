import { isRouteErrorResponse } from "react-router-dom";

const DEFAULT_ERROR = {
  status: 500,
  title: "Something went wrong",
  desc: "An unexpected error occurred. Please try again.",
};

export function getErrorDetails(err) {
  if (!err) {
    return DEFAULT_ERROR;
  }

  if (isRouteErrorResponse(err)) {
    return {
      status: err.status,
      title: err.statusText || "Request failed",
      desc:
        err.data?.message ||
        err.data ||
        "The requested page could not be loaded.",
    };
  }

  if (err instanceof Error) {
    return {
      status: 500,
      title: err.name,
      desc: err.message,
    };
  }

  return DEFAULT_ERROR;
}
