import { KeyboardEvent, ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { messageAdded } from "../slice";

//TODO: Add send checks
//TODO: Move the error message to a constant
export const useChatInput = () => {
    const dispatch = useDispatch();
    const { roomId } = useParams() as { roomId: string };
    const [text, setText] = useState("");

    const handleSendMessage = () => {
        if (text) {
            dispatch(
                messageAdded({
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
