import { Typography } from "@mui/material";
import moment from "moment";

import {
    ChatBox,
    ChatPaper,
    Message,
    MessageContent,
    MessageHeader
} from "../styled";
import { ChatInput } from "../ChatInput/ChatInput";

import { useChat } from "../../hooks/useChat";

//TODO: Add avatars
//TODO: Create a message component
//TODO: Remove the offer text
export const Chat = () => {
    const { offer, messages, endRef } = useChat();

    return (
        <ChatPaper>
            <ChatBox dense disablePadding>
                <Message dense disablePadding>
                    <MessageContent>
                        <Typography
                            color="primary"
                            fontWeight="600"
                            fontSize="small"
                        >
                            Offer
                        </Typography>
                        {offer}
                    </MessageContent>
                </Message>
                {messages?.map(({ id, userName, timestamp: date, text }) => (
                    <Message key={id} dense disablePadding>
                        <MessageContent>
                            <MessageHeader>
                                <Typography
                                    color="primary"
                                    fontWeight="600"
                                    fontSize="small"
                                >
                                    {userName}
                                </Typography>
                                <Typography
                                    color="primary"
                                    fontSize=".75rem"
                                    position={"absolute"}
                                    right=".75rem"
                                    bottom=".25rem"
                                >
                                    {moment(date).format("h:mm a")}
                                </Typography>
                            </MessageHeader>
                            <Typography>{text}</Typography>
                        </MessageContent>
                    </Message>
                ))}
                <div ref={endRef} />
            </ChatBox>
            <ChatInput />
        </ChatPaper>
    );
};
