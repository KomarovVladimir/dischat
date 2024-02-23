import { useState, ChangeEvent, FormEvent } from "react";

import { useJoinRoomMutation } from "../api";

export const useJoiningDialog = (onClose: () => void) => {
    const [joinRoom] = useJoinRoomMutation();
    const [roomId, setRoomId] = useState<number | null>(null);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setRoomId(+event.currentTarget.value);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (roomId) {
            joinRoom(roomId);
        }
        setRoomId(null);
        onClose();
    };

    const handleClose = () => {
        setRoomId(null);
        onClose();
    };

    return {
        roomId,
        handleChange,
        handleSubmit,
        handleClose
    };
};
