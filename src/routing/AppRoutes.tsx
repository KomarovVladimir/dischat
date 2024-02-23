import { Route, Routes } from "react-router";

import { Chat } from "features";
import { ChatPage } from "pages";

import { routes } from "./routes";

const { baseRoute, room } = routes;

export const AppRoutes = () => (
    <Routes>
        <Route path={baseRoute} element={<ChatPage />}>
            <Route path={room} element={<Chat />} />
        </Route>
    </Routes>
);
