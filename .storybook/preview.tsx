import { Preview } from "@storybook/react";
import { withThemeFromJSXProvider } from "@storybook/addon-themes";
import { CssBaseline, ThemeProvider } from "@mui/material";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "@fontsource/material-icons";
import { darkTheme } from "../src/themes/darkTheme";

const preview: Preview = {
    parameters: {
        actions: { argTypesRegex: "^on[A-Z].*" },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i
            }
        },
        backgrounds: {
            default: "twitter",
            values: [
                { name: "white", value: "#ffffff" },
                { name: "black", value: "#000000" },
                { name: "dark", value: "#19212d" }
            ]
        }
    },
    globalTypes: {
        theme: {
            description: "Global theme for components",
            defaultValue: "dark",
            toolbar: {
                title: "Theme",
                icon: "circlehollow",
                items: ["light", "dark"],
                dynamicTitle: true
            }
        }
    },
    decorators: [
        withThemeFromJSXProvider({
            themes: {
                dark: darkTheme
            },
            defaultTheme: "dark",
            Provider: ThemeProvider,
            GlobalStyles: CssBaseline
        })
    ]
};
export default preview;
