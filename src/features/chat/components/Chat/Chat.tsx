import { ListItem } from "@mui/material";

import { ChatBox, ChatPaper } from "../styled";
import { ChatInput } from "../ChatInput/ChatInput";
import { useChat } from "../../hooks/useChat";
import { Message } from "../Message";

//TODO: Add avatars
//TODO: Create a message component
//TODO: Remove the offer text
export const Chat = () => {
    const { messages, endRef } = useChat();

    return (
        <ChatPaper>
            <ChatBox dense disablePadding>
                {messages?.map(({ id, userName, timestamp: date, text }) => (
                    <ListItem key={id} dense disablePadding>
                        <Message {...{ text, userName, date }} />
                    </ListItem>
                ))}
                <div ref={endRef} />
            </ChatBox>
            <ChatInput />
        </ChatPaper>
    );
};
