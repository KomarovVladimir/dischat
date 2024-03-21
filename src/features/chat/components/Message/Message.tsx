import { Typography } from "@mui/material";
import moment from "moment";

import { MessagePaper, MessageHeader } from "../styled";

type MessageProps = {
    text: string;
    userName?: string;
    date: string;
};

//TODO: Add avatars
export const Message = ({ text, userName, date }: MessageProps) => (
    <MessagePaper>
        <MessageHeader>
            <Typography color="primary" fontWeight="600" fontSize="small">
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
    </MessagePaper>
);
