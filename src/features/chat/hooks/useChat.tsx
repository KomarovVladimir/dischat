import { useParams } from "react-router-dom";
import { createRef, useEffect, useMemo, useState } from "react";

import { getMessageIdsByRoomId } from "features/rooms/slice/selectors";

import { getAllMessages } from "../slice/selectors";
import { useWebRTC } from "app/hooks/useWebRTC";
import { EntityId } from "@reduxjs/toolkit";

export const useChat = () => {
    const { roomId } = useParams() as { roomId: EntityId };
    const webRTC = useWebRTC();
    const [offer, setOffer] = useState<string | undefined>();

    useEffect(() => {
        setOffer(
            JSON.stringify(webRTC.getConnection(roomId)?.localDescription)
        );
    }, []);

    const messageIds = getMessageIdsByRoomId(roomId);

    const allMessages = getAllMessages();

    const messages = useMemo(() => {
        return allMessages?.filter(({ id }) => messageIds?.includes(id));
    }, [messageIds]);

    const endRef = createRef<HTMLDivElement>();

    useEffect(() => {
        endRef.current?.scrollIntoView();
    }, [messages]);

    return { offer, messages, endRef };
};
