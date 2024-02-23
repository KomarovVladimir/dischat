import { Stack } from "@mui/material";
import { Outlet } from "react-router";
import { ReactNode } from "react";

//TODO: Add specific components checking
type ChatLayoutProps = {
    rooms?: ReactNode;
    chat?: ReactNode;
};

export const ChatLayout = ({ rooms, chat }: ChatLayoutProps) => (
    <Stack direction="row" spacing={2} height="100%" useFlexGap padding={2}>
        {rooms}
        <Outlet />
    </Stack>
);
