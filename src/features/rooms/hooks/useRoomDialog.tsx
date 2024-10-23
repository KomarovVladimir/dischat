// import { QueryStatus } from "@reduxjs/toolkit/query";
import { useState, ChangeEvent, useEffect, useMemo } from "react";
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

  // useEffect(() => {
  //     console.log(state);
  // }, [state]);

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

  const handleSubmit = async () => {
    let result;
    switch (state) {
      case DialogStates.ADDING:
        setState(DialogStates.ANSWER);
        webRTCService.createConnection(roomId);

        webRTCService.createDataChannel({
          id: roomId,
          label: "chat"
        });

        result = await webRTCService.createAndSetOffer(roomId);

        //TODO: Remove
        console.log("OFFER");
        console.log(JSON.stringify(result));

        break;
      case DialogStates.ANSWER:
        await webRTCService.setRemoteDescription({
          id: roomId,
          sessionDescription: answer
        });

        dispatch(roomAdded({ id: roomId, name }));

        setInputValues(initialValues);
        onClose();

        navigate(`/rooms/${roomId}`);
        break;
      //TODO: Rework by DRY
      case DialogStates.JOINING:
        try {
          webRTCService.createConnection(roomId);

          //ADD ICE CANDIDATES

          await webRTCService.setRemoteDescription({
            id: roomId,
            sessionDescription: description
          });

          webRTCService.createDataChannel({
            id: roomId,
            label: "chat"
          });

          result = await webRTCService.createAndSetAnswer(roomId);

          console.log("ANSWER");
          console.log(JSON.stringify(result));

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
