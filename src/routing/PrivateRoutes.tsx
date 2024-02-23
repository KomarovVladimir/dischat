import { Navigate, Outlet } from "react-router";

import { useAuth } from "features";

export const PrivateRoutes = () => {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/" />;
    }

    return <Outlet />;
};
