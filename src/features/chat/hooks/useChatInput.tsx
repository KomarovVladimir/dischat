import { KeyboardEvent, ChangeEvent, useState } from "react";
import { useParams } from "react-router-dom";

import { useAppDispatch } from "app/store/store";

import { messageAdded } from "../slice/messagesSlice";
import { useLocalStorage } from "app/hooks/useLocalStorage";

//TODO: Add send checks
//TODO: Move the error message to a constant
//TODO: Add a name change watcher
export const useChatInput = () => {
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

            setText("");
        }
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
        text,
        handleSend,
        handleSendMessage,
        handleChange
    };
};
