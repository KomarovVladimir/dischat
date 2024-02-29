import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { StrictMode } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
// import { startFakeServer } from "services/server.js";
// import { io } from "socket.io-client";

import { ErrorBoundary } from "components/ErrorBoundary";
import { AppRoutes } from "routing/AppRoutes";

import { store } from "./store";

// if (process.env.NODE_ENV === "development") {
//     startFakeServer();
// }

//TODO: Move sockets io
// const socket = io("http://localhost:5000", { withCredentials: true });

export const theme = createTheme({
    palette: {
        mode: "dark"
    }
});

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
