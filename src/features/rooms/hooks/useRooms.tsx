import { useState } from "react";

import { roomsSelectors } from "../slice";
import { useSelector } from "react-redux";

export const useRooms = () => {
    const rooms = useSelector(roomsSelectors.selectEntities);

    const [creationOpen, setCreationOpen] = useState(false);

    const handleOpen = () => {
        setCreationOpen(true);
    };

    const handleClose = () => {
        setCreationOpen(false);
    };

    return {
        rooms,
        creationOpen,
        handleOpen,
        handleClose
    };
};
