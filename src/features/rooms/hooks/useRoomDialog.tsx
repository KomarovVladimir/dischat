// import { QueryStatus } from "@reduxjs/toolkit/query";
import { useState, ChangeEvent, FormEvent, useEffect, useMemo } from "react";
import { useNavigate } from "react-router";

import { useAppDispatch } from "app/hooks/storeHooks";
import { useWebRTC } from "app/hooks/useWebRTC";
// import { useAddRoomMutation } from "../api";
import { roomAdded } from "../slice/roomsSlice";
import { nanoid } from "@reduxjs/toolkit";

const initialValues = {
    name: "",
    answer: "",
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
    const roomId = useMemo(() => nanoid(), []);
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

        switch (state) {
            case DialogStates.ADDING:
                setState(DialogStates.ANSWER);
                try {
                    webRTCService.createConnection(roomId);

                    const result =
                        await webRTCService.createAndSetOffer(roomId);

                    //TODO: Remove
                    console.log(JSON.stringify(result));
                } catch (error) {
                    console.error(`Error: RTC initialization failed. ${error}`);
                }

                break;
            case DialogStates.ANSWER:
                try {
                    await webRTCService.setRemoteDescription({
                        id: roomId,
                        sessionDescription: answer
                    });

                    dispatch(roomAdded({ id: roomId, name }));

                    setInputValues(initialValues);
                    onClose();

                    navigate(`/rooms/${roomId}`);
                } catch (error) {
                    console.error(`Error: RTC initialization failed. ${error}`);
                }

                break;
            case DialogStates.JOINING:
                try {
                    webRTCService.createConnection(roomId);

                    await webRTCService.setRemoteDescription({
                        id: roomId,
                        sessionDescription: description
                    });

                    await webRTCService.createAndSetAnswer(roomId);

                    dispatch(roomAdded({ id: roomId, name }));

                    setInputValues(initialValues);
                    onClose();

                    navigate(`/rooms/${roomId}`);
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
