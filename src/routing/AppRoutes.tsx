import { Navigate, Route, Routes } from "react-router";

import { ChatPage } from "pages";
import { Chat } from "features/chat/components/Chat";

import { routes } from "./routes";

const { baseRoute, room } = routes;

//Rework the routes
export const AppRoutes = () => (
  <Routes>
    <Route path={baseRoute} element={<ChatPage />}>
      <Route path={room} element={<Chat />} />
    </Route>
    <Route path="*" element={<Navigate to={baseRoute} replace />} />
  </Routes>
);
