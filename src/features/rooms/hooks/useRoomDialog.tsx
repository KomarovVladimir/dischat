// import { QueryStatus } from "@reduxjs/toolkit/query";
import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router";

import { useAppDispatch } from "app/hooks/storeHooks";
import { useWebRTC } from "app/hooks/useWebRTC";
// import { useAddRoomMutation } from "../api";
import { roomAdded } from "../slice/roomsSlice";
import { nanoid } from "@reduxjs/toolkit";

const initialValues = {
    name: "",
    description: ""
} as {
    name: string;
    description: string;
};

type FieldNames = "name" | "description";

export const useRoomDialog = (onClose: () => void) => {
    const webRTCService = useWebRTC();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [{ name, description }, setInputValues] = useState(initialValues);

    const handleChange =
        (field: FieldNames) => (event: ChangeEvent<HTMLInputElement>) => {
            setInputValues({
                name,
                description,
                [field]: event.currentTarget.value
            });
        };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const id = nanoid();

        //TODO: Rework the WebRTC API
        try {
            if (name) {
                webRTCService.createConnection(id);
                await webRTCService.createAndSetOffer(id);
                dispatch(roomAdded({ id, name }));
                navigate(`/rooms/${id}`);
            } else if (description) {
                webRTCService.createConnection(id);
                await webRTCService.setRemoteDescription({
                    roomId: id,
                    sessionDescription: description
                });
                dispatch(roomAdded({ id, name }));
                navigate(`/rooms/${id}`);

                console.log(webRTCService.getAllConnections());
            }
        } catch (error) {
            console.error(`Error: RTC initialization failed. ${error}`);
        }

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
        description,
        handleChange,
        handleSubmit,
        handleClose
    };
};
