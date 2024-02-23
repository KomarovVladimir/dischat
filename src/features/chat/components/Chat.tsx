import { Typography } from "@mui/material";
import moment from "moment";

import {
    ChatBox,
    ChatPaper,
    Message,
    MessageContent,
    MessageHeader
} from "./styled";
import { ChatInput } from "./ChatInput";

import { useChat } from "../hooks/useChat";

//TODO: Add avatars
export const Chat = () => {
    const { messages, endRef } = useChat();

    return (
        <ChatPaper>
            <ChatBox dense disablePadding>
                {messages &&
                    messages?.map(({ id, username, created: date, text }) => (
                        <Message key={id} dense disablePadding>
                            {/* <Avatar
                                alt={username}
                                src={avatar}
                                sx={{
                                    marginRight: ".5rem",
                                    width: 38,
                                    height: 38,
                                }}
                            /> */}
                            <MessageContent>
                                <MessageHeader>
                                    <Typography
                                        color="primary"
                                        fontWeight="600"
                                        fontSize="small"
                                    >
                                        {username}
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
