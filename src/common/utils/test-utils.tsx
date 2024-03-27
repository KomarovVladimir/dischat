import { ThemeProvider } from "@mui/material";
import { RenderOptions, render } from "@testing-library/react";
import { Provider } from "react-redux";
import { ReactElement, PropsWithChildren } from "react";

import { setupStore, type AppStore, type AppState } from "app/store/store";
import { darkTheme } from "themes/darkTheme";

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
    preloadedState?: Partial<AppState>;
    store?: AppStore;
}

export function renderWithProviders(
    ui: ReactElement,
    {
        preloadedState = {},
        store = setupStore(preloadedState),
        ...renderOptions
    }: ExtendedRenderOptions = {}
) {
    const Wrapper = ({ children }: PropsWithChildren): JSX.Element => {
        return (
            <Provider {...{ store }}>
                <ThemeProvider {...{ theme: darkTheme }}>
                    {children}
                </ThemeProvider>
            </Provider>
        );
    };

    return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

export * from "@testing-library/react";
