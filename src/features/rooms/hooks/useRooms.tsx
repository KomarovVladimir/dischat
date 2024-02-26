import { useSelector } from "react-redux";
import { useState } from "react";

import { roomsSelectors } from "../slice";

export const useRooms = () => {
    const rooms = useSelector(roomsSelectors.selectAll);

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
