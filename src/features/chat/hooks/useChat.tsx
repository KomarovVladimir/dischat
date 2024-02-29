import { useParams } from "react-router-dom";
import { createRef, useEffect } from "react";

import { getMessageIdsByRoomId } from "features/rooms/slice/roomsSlice";

import { getMessagesByIds } from "../slice/messagesSlice";

export const useChat = () => {
    const { roomId } = useParams() as { roomId: string };

    const messageIds = getMessageIdsByRoomId(roomId);

    const endRef = createRef<HTMLDivElement>();

    const messages = getMessagesByIds(messageIds);

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
