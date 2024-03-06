import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { StrictMode } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { ErrorBoundary } from "components/ErrorBoundary";
import { AppRoutes } from "routing/AppRoutes";

import { store } from "./store";

export const theme = createTheme({
    palette: {
        mode: "dark"
    }
});

//TODO: Think on adding a redux persist
export const App = () => {
    return (
        <StrictMode>
            <Provider store={store}>
                <ThemeProvider {...{ theme }}>
                    <CssBaseline />
                    <ErrorBoundary>
                        <BrowserRouter>
                            <AppRoutes />
                        </BrowserRouter>
                    </ErrorBoundary>
                </ThemeProvider>
            </Provider>
        </StrictMode>
    );
};
