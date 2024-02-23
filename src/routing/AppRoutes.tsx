import { Route, Routes } from "react-router";

import { RegistrationForm, LoginForm } from "features";
import { ChatPage } from "pages";

import { routes } from "./routes";
import { PrivateRoutes } from "./PrivateRoutes";
import { PublicRoutes } from "./PublicRoutes";

const { auth, baseRoute, login, authorized, register } = routes;

//TODO: Add the auth version back
//TODO: Join the login and register pages
export const AppRoutes = () => (
    <Routes>
        <Route path={baseRoute}>
            <Route index element={<ChatPage />} />
        </Route>
        <Route path={auth} element={<PublicRoutes />}>
            <Route path={login} element={<LoginForm />} />
            <Route path={register} element={<RegistrationForm />} />
        </Route>
        <Route path={authorized} element={<PrivateRoutes />}>
            <Route index element={<ChatPage />} />
        </Route>
    </Routes>
);
