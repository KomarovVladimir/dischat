import { Preview } from "@storybook/react";
import { withThemeFromJSXProvider } from "@storybook/addon-themes";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { withRouter } from "storybook-addon-remix-react-router";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "@fontsource/material-icons";
import { darkTheme } from "../src/themes/darkTheme";
import { lightTheme } from "../src/themes/lightTheme";
import { store } from "../src/app/store/store";
import { Provider } from "react-redux";

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
    decorators: [
        withRouter,
        withThemeFromJSXProvider({
            themes: {
                light: lightTheme,
                dark: darkTheme
            },
            defaultTheme: "dark",
            Provider: ThemeProvider,
            GlobalStyles: CssBaseline
        }),
        (story) => <Provider {...{ store }}>{story()}</Provider>
    ]
};
export default preview;
