import { RouterProvider } from "react-router-dom";
import router from "@/app/routers";
import AppProviders from "./providers/AppProviders";
import ErrorBoundary from "@/components/feedback/ErrorBoundary";

const App = () => {
  return (
    <ErrorBoundary>
      <AppProviders>
        <RouterProvider router={router} />
      </AppProviders>
    </ErrorBoundary>
  );
};

export default App;
