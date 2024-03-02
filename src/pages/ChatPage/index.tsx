import { useParams, Outlet, Navigate } from "react-router";
import { ChatLayout } from "components/layouts/ChatLayout";
import { Rooms } from "features/rooms/components/Rooms";

import { routes } from "routing/routes";
import { roomExists } from "features/rooms/slice/selectors";

export const ChatPage = () => {
    const { roomId } = useParams() as { roomId: string };
    const room = roomExists(roomId);

    return (
        <ChatLayout
            navigation={<Rooms />}
            chat={
                room ? <Outlet /> : <Navigate to={routes.baseRoute} replace />
            }
        />
    );
};
