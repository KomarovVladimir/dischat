// import { QueryStatus } from "@reduxjs/toolkit/query";
import { EntityId } from "@reduxjs/toolkit";
import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router";

import { useAppDispatch } from "app/store";

// import { useAddRoomMutation } from "../api";
import { type FieldNames } from "../types";
import { roomAdded } from "../slice/roomsSlice";

const initialValues = {
    name: "",
    roomId: ""
} as {
    name: string;
    roomId: EntityId;
};

export const useRoomDialog = (onClose: () => void) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [{ name, roomId }, setInputValues] = useState(initialValues);

    const handleChange =
        (field: FieldNames) => (event: ChangeEvent<HTMLInputElement>) => {
            setInputValues({
                name,
                roomId,
                [field]: event.currentTarget.value
            });
        };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const {
            payload: { id }
        } = dispatch(roomAdded(name));

        setInputValues(initialValues);
        onClose();

        navigate(`/rooms/${id}`);
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
