import { Route, Routes } from "react-router";

import { ChatPage } from "pages";

import { routes } from "./routes";

const { baseRoute } = routes;

export const AppRoutes = () => (
    <Routes>
        <Route path={baseRoute}>
            <Route index element={<ChatPage />} />
        </Route>
    </Routes>
);
