import { QueryStatus } from "@reduxjs/toolkit/query";
import { EntityId } from "@reduxjs/toolkit";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";

import { useAddRoomMutation } from "../api";
import { FieldNames } from "../types";
import { useNavigate } from "react-router";

const initialValues = {
    name: "",
    roomId: ""
} as {
    name: string;
    roomId: EntityId;
};

export const useRoomDialog = (onClose: () => void) => {
    const navigate = useNavigate();
    const [addRoom, { data: responseData, status: addStatus }] =
        useAddRoomMutation();
    const [{ name, roomId }, setInputValues] = useState(initialValues);

    const handleChange =
        (field: FieldNames) => (event: ChangeEvent<HTMLInputElement>) => {
            setInputValues({
                name,
                roomId,
                [field]: event.currentTarget.value
            });
        };

    useEffect(() => {
        switch (addStatus) {
            case QueryStatus.fulfilled:
                navigate(`/rooms/${responseData?.id}`);
                setInputValues(initialValues);
                onClose();
                break;
            default:
                break;
        }
    }, [addStatus]);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        addRoom({ name, roomId });
    };

    const handleClose = () => {
        setInputValues(initialValues);
        onClose();
    };

    return {
        name,
        roomId,
        handleChange,
        handleSubmit,
        handleClose
    };
};
