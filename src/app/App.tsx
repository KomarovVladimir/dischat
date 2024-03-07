import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { StrictMode } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { ErrorBoundary } from "components/ErrorBoundary";
import { AppRoutes } from "routing/AppRoutes";

import { store } from "./store";
import { WebRTCProvider } from "./services/webRTC/webRTCProvider";

export const theme = createTheme({
    palette: {
        mode: "dark"
    }
});

//TODO: Think on adding a redux persist
export const App = () => (
    <StrictMode>
        <ErrorBoundary>
            <WebRTCProvider>
                <Provider store={store}>
                    <ThemeProvider {...{ theme }}>
                        <CssBaseline />
                        <BrowserRouter>
                            <AppRoutes />
                        </BrowserRouter>
                    </ThemeProvider>
                </Provider>
            </WebRTCProvider>
        </ErrorBoundary>
    </StrictMode>
);
