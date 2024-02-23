import { Container } from "@mui/material";
import { Navigate, Outlet } from "react-router";

import { useAuth } from "features";

export const PublicRoutes = () => {
    const { user } = useAuth();

    if (user) {
        return <Navigate to="authorized" />;
    }

    return (
        <Container
            maxWidth="xs"
            sx={{ display: "flex", alignItems: "center", height: "100%" }}
        >
            <Outlet />
        </Container>
    );
};
