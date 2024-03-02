import { ThemeProvider } from "@mui/material";
import { RenderOptions, render } from "@testing-library/react";
import { Provider } from "react-redux";
import { ReactElement, PropsWithChildren } from "react";

import { setupStore, type AppStore, type RootState } from "app/store";
import { theme } from "app/App";

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
    preloadedState?: Partial<RootState>;
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
                <ThemeProvider {...{ theme }}>{children}</ThemeProvider>
            </Provider>
        );
    };

    return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

export * from "@testing-library/react";
