import { useState, ChangeEvent, FormEvent } from "react";

import { useAuth, AuthUser } from "features";

import { useCreateRoomMutation } from "../api";

export const useCreationDialog = (onClose: () => void) => {
    const {
        user: { id: userId }
    } = useAuth() as { user: AuthUser };
    const [createRoom] = useCreateRoomMutation();
    const [name, setName] = useState("");

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.currentTarget.value);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        createRoom({ name, userId, creationDate: new Date() });
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
