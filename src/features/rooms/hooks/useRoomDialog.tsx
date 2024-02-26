// import { QueryStatus } from "@reduxjs/toolkit/query";
import { EntityId, nanoid } from "@reduxjs/toolkit";
import { useState, ChangeEvent, FormEvent } from "react";

// import { useAddRoomMutation } from "../api";
import { FieldNames } from "../types";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { RoomEntity, roomAdded } from "../slice";

const initialValues = {
    name: "",
    roomId: ""
} as {
    name: string;
    roomId: EntityId;
};

export const useRoomDialog = (onClose: () => void) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [{ name, roomId }, setInputValues] = useState(initialValues);

    const handleChange =
        (field: FieldNames) => (event: ChangeEvent<HTMLInputElement>) => {
            setInputValues({
                name,
                roomId,
                [field]: event.currentTarget.value
            });
        };

    // useEffect(() => {
    //     switch (addStatus) {
    //         case QueryStatus.fulfilled:
    //             navigate(`/rooms/${responseData?.id}`);
    //             setInputValues(initialValues);
    //             onClose();
    //             break;
    //         default:
    //             break;
    //     }
    // }, [addStatus]);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const {
            payload: { id }
        } = dispatch(roomAdded({ id: nanoid(), name } as RoomEntity));

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
