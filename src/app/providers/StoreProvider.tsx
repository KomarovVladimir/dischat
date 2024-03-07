import { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { store } from "app/store/store";

export const StoreProvider = ({ children }: PropsWithChildren) => (
    <Provider {...{ store }}>{children}</Provider>
);
