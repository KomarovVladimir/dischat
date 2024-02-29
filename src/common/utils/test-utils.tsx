import { ThemeProvider } from "@mui/material";
import { render, RenderOptions } from "@testing-library/react";
import { Provider } from "react-redux";
import React, { PropsWithChildren } from "react";

import { setupStore, type AppStore, type RootState } from "app/store";
import { theme } from "app/App";

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
    preloadedState?: Partial<RootState>;
    store?: AppStore;
}

export function renderWithProviders(
    ui: React.ReactElement,
    {
        preloadedState = {},
        store = setupStore(preloadedState),
        ...renderOptions
    }: ExtendedRenderOptions = {}
) {
    function Wrapper({ children }: PropsWithChildren): JSX.Element {
        return (
            <Provider store={store}>
                <ThemeProvider {...{ theme }}>{children}</ThemeProvider>
            </Provider>
        );
    }

    return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

export * from "@testing-library/react";
