import { StrictMode } from "react";
import { HashRouter } from "react-router-dom";

import { ErrorBoundary } from "components/ErrorBoundary";
import { AppRoutes } from "routing/AppRoutes";

import { RootProvider } from "./providers/RootProvider";

//TODO: Think on adding a redux persist
export const App = () => (
  <StrictMode>
    <ErrorBoundary>
      <RootProvider>
        <HashRouter>
          <AppRoutes />
        </HashRouter>
      </RootProvider>
    </ErrorBoundary>
  </StrictMode>
);
