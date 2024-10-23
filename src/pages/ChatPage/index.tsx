import { useParams, Outlet, Navigate } from "react-router";
import { ChatLayout } from "components/layouts/ChatLayout";
import { Rooms } from "features/rooms/components/Rooms";

import { routes } from "routing/routes";
import { roomExists } from "features/rooms/slice/selectors";
import { Stack } from "@mui/material";
import { UserSettingsDialog } from "features/userSettings/components/UserSettings";

export const ChatPage = () => {
  const { roomId } = useParams() as { roomId: string };
  const room = roomExists(roomId);

  return (
    <ChatLayout
      leftPanel={
        <Stack justifyContent="space-between" alignItems="center">
          <Rooms />
          <UserSettingsDialog />
        </Stack>
      }
      chat={room ? <Outlet /> : <Navigate to={routes.baseRoute} replace />}
    />
  );
};
