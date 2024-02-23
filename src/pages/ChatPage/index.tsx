import { ChatLayout } from "components/layouts";

import { Chat } from "features";

export const ChatPage = () => {
    return (
        <ChatLayout
            // rooms={<rooms />}
            chat={<Chat />}
        />
    );
};
