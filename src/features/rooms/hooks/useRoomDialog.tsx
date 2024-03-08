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
    answer: string;
    description: string;
};

type FieldNames = "name" | "description" | "answer";

enum DialogState {
    INITIAL,
    ADDING,
    ANSWER,
    JOINING
}

//TODO: Move the webrtc specific logic?
export const useRoomDialog = (onClose: () => void) => {
    const [state, setState] = useState<DialogState>(DialogState.INITIAL);
    const webRTCService = useWebRTC();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [{ name, description, answer }, setInputValues] =
        useState(initialValues);

    const handleChange =
        (field: FieldNames) => (event: ChangeEvent<HTMLInputElement>) => {
            switch (field) {
                case "name":
                    setState(DialogState.ADDING);
                    break;
                case "description":
                    setState(DialogState.JOINING);
                    break;
                default:
                    if (!name && !description && !answer) {
                        setState(DialogState.INITIAL);
                    }
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
            case DialogState.ADDING:
                break;
            case DialogState.ANSWER:
                break;
            case DialogState.JOINING:
                break;
            default:
                break;
        }

        //TODO: Rework the WebRTC API
        try {
            if (name) {
                webRTCService.createConnection(id);

                const result = await webRTCService.createAndSetOffer(id);

                console.log(JSON.stringify(result));

                dispatch(roomAdded({ id, name }));

                navigate(`/rooms/${id}`);
            } else if (description) {
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
            }
        } catch (error) {
            console.error(`Error: RTC initialization failed. ${error}`);
        }

        navigate(`/rooms/${id}`);
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
