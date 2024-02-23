import { QueryStatus } from "@reduxjs/toolkit/query";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";

import { useCreateRoomMutation } from "../api";

const initialValues = {
    name: "",
    code: ""
};

export const useCreationDialog = (onClose: () => void) => {
    const [createRoom, { status }] = useCreateRoomMutation();
    const [inputValues, setInputValues] = useState(initialValues);

    const handleChange =
        (field: "name" | "code") => (event: ChangeEvent<HTMLInputElement>) => {
            setInputValues({
                ...inputValues,
                [field]: event.currentTarget.value
            });
        };

    useEffect(() => {
        switch (status) {
            case QueryStatus.fulfilled:
                setInputValues(initialValues);
                onClose();
                break;
            default:
                break;
        }
    }, [status]);

    const handleSubmit =
        (type: "create" | "join") => (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            switch (type) {
                case "create":
                    createRoom({ name: inputValues.name });
                    break;
                case "join":
                    //TODO: Add
                    break;
                default:
                    break;
            }
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
