import { useState, ChangeEvent, FormEvent } from "react";

import { useCreateRoomMutation } from "../api";

export const useCreationDialog = (onClose: () => void) => {
    const [createRoom] = useCreateRoomMutation();
    const [name, setName] = useState("");

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.currentTarget.value);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        createRoom({ name });
        setName("");
        onClose();
    };

    const handleClose = () => {
        setName("");
        onClose();
    };

    return {
        name,
        handleChange,
        handleSubmit,
        handleClose
    };
};
