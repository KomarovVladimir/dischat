// import { QueryStatus } from "@reduxjs/toolkit/query";
import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router";

import { useAppDispatch } from "app/hooks/storeHooks";
import { useWebRTC } from "app/hooks/useWebRTC";
// import { useAddRoomMutation } from "../api";
import { roomAdded } from "../slice/roomsSlice";

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

        //TODO: Create room only on success. Create the room ID here to use further
        const {
            payload: { id }
        } = dispatch(roomAdded(name));

        //TODO: Rework the WebRTC API
        try {
            if (name) {
                webRTCService.createConnection(id);
                await webRTCService.createAndSetOffer(id);
            } else if (description) {
                webRTCService.createConnection(id);
                await webRTCService.setRemoteDescription({
                    roomId: id,
                    sessionDescription: description
                });
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
