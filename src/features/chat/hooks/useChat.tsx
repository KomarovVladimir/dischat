import { useParams } from "react-router-dom";
import { createRef, useEffect, useMemo } from "react";

import { getMessageIdsByRoomId } from "features/rooms/slice/selectors";

import { getAllMessages } from "../slice/selectors";

export const useChat = () => {
    const { roomId } = useParams() as { roomId: string };

    const messageIds = getMessageIdsByRoomId(roomId);

    const allMessages = getAllMessages();

    const messages = useMemo(
        () => allMessages.filter(({ id }) => messageIds.includes(id)),
        [messageIds]
    );

    const endRef = createRef<HTMLDivElement>();

    useEffect(() => {
        endRef.current?.scrollIntoView();
    }, [messages]);

    return {
        messages,
        endRef
    };
};
