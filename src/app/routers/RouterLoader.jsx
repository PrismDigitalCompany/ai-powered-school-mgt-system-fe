import PageLoader from "../../components/loaders/PageLoader";
import { Suspense } from "react";

const RouterLoader = ({ component: Component, ...props }) => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Component {...props} />
    </Suspense>
  );
};

export default RouterLoader;
