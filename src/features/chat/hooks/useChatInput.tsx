import { QueryStatus } from "@reduxjs/toolkit/query";
import { KeyboardEvent, ChangeEvent, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { useSendMessageMutation } from "../api";

//TODO: Add send checks
//TODO: Move the error message to a constant
export const useChatInput = () => {
    const { roomId } = useParams() as { roomId: string };
    const [sendMessage, { isError, isLoading, status }] =
        useSendMessageMutation();
    const [text, setText] = useState("");

    useEffect(() => {
        switch (status) {
            case QueryStatus.fulfilled:
                setText("");
                break;
            default:
                break;
        }
    }, [status]);

    const handleSendMessage = () => {
        sendMessage({ roomId, text, timestamp: new Date().toISOString() });
        setText("");
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value as string);
    };

    const handleSend = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "Enter") {
            handleSendMessage();
        }
    };

    return {
        isError,
        isLoading,
        text,
        handleSend,
        handleSendMessage,
        handleChange
    };
};
