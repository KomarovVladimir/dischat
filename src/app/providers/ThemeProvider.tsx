import { ThemeProvider as MuiThemeProvider } from "@mui/material";
import { PropsWithChildren } from "react";
import { darkTheme } from "themes/darkTheme";

export const ThemeProvider = ({ children }: PropsWithChildren) => (
    <MuiThemeProvider {...{ theme: darkTheme }}>{children}</MuiThemeProvider>
);
