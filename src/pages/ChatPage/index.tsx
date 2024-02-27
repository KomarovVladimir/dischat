import { useParams, Outlet, Navigate } from "react-router";

import { ChatLayout } from "components/layouts";
import { Rooms, roomExists } from "features";
import { routes } from "routing";

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
