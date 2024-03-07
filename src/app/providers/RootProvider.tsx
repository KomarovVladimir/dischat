import { CssBaseline } from "@mui/material";
import { PropsWithChildren } from "react";
import { WebRTCProvider } from "./WebRTCProvider";
import { StoreProvider } from "./StoreProvider";
import { ThemeProvider } from "./ThemeProvider";

export const RootProvider = ({ children }: PropsWithChildren) => (
    <ThemeProvider>
        <WebRTCProvider>
            <StoreProvider>
                <CssBaseline />
                {children}
            </StoreProvider>
        </WebRTCProvider>
    </ThemeProvider>
);
