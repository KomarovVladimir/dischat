import { QueryStatus } from "@reduxjs/toolkit/query";
import { EntityId } from "@reduxjs/toolkit";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";

import { useCreateRoomMutation, useJoinRoomMutation } from "../api";
import { FieldNames, RequestType } from "../types";

const initialValues = {
    name: "",
    roomId: ""
} as {
    name: string;
    roomId: EntityId;
};

export const useRoomDialog = (onClose: () => void) => {
    const [createRoom, { status: createStatus }] = useCreateRoomMutation();
    const [joinRoom, { status: joinStatus }] = useJoinRoomMutation();
    const [inputValues, setInputValues] = useState(initialValues);

    const handleChange =
        (field: FieldNames) => (event: ChangeEvent<HTMLInputElement>) => {
            setInputValues({
                ...inputValues,
                [field]: event.currentTarget.value
            });
        };

    useEffect(() => {
        switch (createStatus) {
            case QueryStatus.fulfilled:
                setInputValues(initialValues);
                onClose();
                break;
            default:
                break;
        }
        switch (joinStatus) {
            case QueryStatus.fulfilled:
                setInputValues(initialValues);
                onClose();
                break;
            default:
                break;
        }
    }, [createStatus, joinStatus]);

    const handleSubmit =
        (type: RequestType) => (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            switch (type) {
                case "create":
                    createRoom({ name: inputValues.name });
                    break;
                case "join":
                    joinRoom(inputValues.roomId);
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
        name: inputValues.name,
        roomId: inputValues.roomId,
        handleChange,
        handleSubmit,
        handleClose
    };
};
