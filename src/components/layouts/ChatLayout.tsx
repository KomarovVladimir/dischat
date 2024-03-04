import { Stack } from "@mui/material";
import { ReactNode } from "react";

//TODO: Add specific components checking
type ChatLayoutProps = {
    leftPanel?: ReactNode;
    chat?: ReactNode;
};

export const ChatLayout = ({ leftPanel, chat }: ChatLayoutProps) => (
    <Stack direction="row" spacing={2} height="100%" useFlexGap padding={2}>
        {leftPanel}
        {chat}
    </Stack>
);
