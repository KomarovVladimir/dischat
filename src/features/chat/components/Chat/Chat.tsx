import { ChatBox, ChatPaper } from "../styled";
import { ChatInput } from "../ChatInput/ChatInput";
import { useChat } from "../../hooks/useChat";
import { Message } from "../Message";

export const Chat = () => {
    const { messages, endRef } = useChat();

    return (
        <ChatPaper>
            <ChatBox dense disablePadding>
                {messages?.map(({ id, userName, timestamp: date, text }) => (
                    <Message key={id} {...{ text, userName, date }} />
                ))}
                <div ref={endRef} />
            </ChatBox>
            <ChatInput />
        </ChatPaper>
    );
};
