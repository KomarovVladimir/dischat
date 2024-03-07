import { ThemeProvider as MuiThemeProvider, createTheme } from "@mui/material";
import { PropsWithChildren } from "react";

export const theme = createTheme({
    palette: {
        mode: "dark"
    }
});

export const ThemeProvider = ({ children }: PropsWithChildren) => (
    <MuiThemeProvider {...{ theme }}>{children}</MuiThemeProvider>
);
