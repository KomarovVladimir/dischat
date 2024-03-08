// import { QueryStatus } from "@reduxjs/toolkit/query";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
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
    answer: string;
    description: string;
};

export type FieldNames = "name" | "description" | "answer";

export enum DialogStates {
    INITIAL,
    ADDING,
    ANSWER,
    JOINING
}

//TODO: Move the webrtc specific logic?
export const useRoomDialog = (onClose: () => void) => {
    const [state, setState] = useState<DialogStates>(DialogStates.INITIAL);
    const webRTCService = useWebRTC();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [{ name, description, answer }, setInputValues] =
        useState(initialValues);

    useEffect(() => {
        console.log(state);
    }, [state]);

    useEffect(() => {
        if (!name && !description && !answer) {
            setState(DialogStates.INITIAL);
        }
    }, [name, description, answer]);

    const handleChange =
        (field: FieldNames) => (event: ChangeEvent<HTMLInputElement>) => {
            switch (field) {
                case "name":
                    setState(DialogStates.ADDING);
                    break;
                case "description":
                    setState(DialogStates.JOINING);
                    break;
                default:
                    break;
            }

            setInputValues({
                name,
                answer,
                description,
                [field]: event.currentTarget.value
            });
        };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const id = nanoid();

        switch (state) {
            case DialogStates.ADDING:
                setState(DialogStates.ANSWER);
                break;
            case DialogStates.ANSWER:
                try {
                    webRTCService.createConnection(id);

                    const result = await webRTCService.createAndSetOffer(id);

                    //TODO: Remove
                    console.log(JSON.stringify(result));

                    dispatch(roomAdded({ id, name }));

                    navigate(`/rooms/${id}`);
                } catch (error) {
                    console.error(`Error: RTC initialization failed. ${error}`);
                }

                break;
            case DialogStates.JOINING:
                try {
                    webRTCService.createConnection(id);

                    await webRTCService.setRemoteDescription({
                        id,
                        sessionDescription: description
                    });

                    await webRTCService.createAndSetAnswer(id);

                    dispatch(roomAdded({ id, name }));

                    navigate(`/rooms/${id}`);

                    console.log(webRTCService.getAllConnections());
                    setInputValues(initialValues);

                    onClose();
                } catch (error) {
                    console.error(`Error: RTC initialization failed. ${error}`);
                }
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
        answer,
        state,
        name,
        description,
        handleChange,
        handleSubmit,
        handleClose
    };
};
