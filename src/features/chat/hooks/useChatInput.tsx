import { KeyboardEvent, ChangeEvent, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { useLocalStorage } from "app/hooks/useLocalStorage";
import { useAppDispatch } from "app/hooks/storeHooks";
import { useWebRTC } from "app/hooks/useWebRTC";
import { messageAdded } from "../slice/messagesSlice";

//TODO: Add send checks
//TODO: Move the error message to a constant
//TODO: Add a name change watcher
export const useChatInput = () => {
    const webRTCService = useWebRTC();
    const dispatch = useAppDispatch();
    const { roomId } = useParams() as { roomId: string };
    const { value: userName } = useLocalStorage("userName");
    const [text, setText] = useState("");

    const handleSendMessage = () => {
        if (text) {
            dispatch(
                messageAdded({
                    userName,
                    roomId,
                    text
                })
            );

            try {
                webRTCService.sendMessage({ id: roomId, message: text });
            } catch (error) {
                console.error(error);
            }

            setText("");
        }
    };

    //TODO: Keep the draft
    useEffect(() => {
        setText("");
    }, [roomId]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value as string);
    };

    const handleSend = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "Enter") {
            handleSendMessage();
        }
    };

    return {
        text,
        handleSend,
        handleSendMessage,
        handleChange
    };
};
