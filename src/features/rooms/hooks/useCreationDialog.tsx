import { useState, ChangeEvent, FormEvent } from "react";

import { useCreateRoomMutation } from "../api";

const initialValues = {
    name: "",
    code: ""
};

export const useCreationDialog = (onClose: () => void) => {
    const [createRoom] = useCreateRoomMutation();
    const [inputValues, setInputValues] = useState(initialValues);

    const handleChange =
        (field: "name" | "code") => (event: ChangeEvent<HTMLInputElement>) => {
            setInputValues({
                ...inputValues,
                [field]: event.currentTarget.value
            });
        };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        createRoom({ name: inputValues.name });
        setInputValues(initialValues);
        onClose();
    };

    const handleClose = () => {
        setInputValues(initialValues);
        onClose();
    };

    return {
        inputValues,
        handleChange,
        handleSubmit,
        handleClose
    };
};
