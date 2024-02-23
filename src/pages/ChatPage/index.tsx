import { ChatLayout } from "components/layouts";

import { Rooms, Chat } from "features";

export const ChatPage = () => {
    return <ChatLayout rooms={<Rooms />} chat={<Chat />} />;
};
