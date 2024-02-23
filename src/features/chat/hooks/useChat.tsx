import { useParams } from "react-router-dom";
import { createRef, useEffect } from "react";

import { useGetMessagesQuery } from "../api/chatApi";

export const useChat = () => {
    const { roomId } = useParams() as { roomId: string };
    const { data: messages } = useGetMessagesQuery(roomId);
    const endRef = createRef<HTMLDivElement>();

    useEffect(() => {
        if (messages) {
            endRef.current?.scrollIntoView();
        }
    }, [messages]);

    return {
        messages,
        endRef
    };
};
