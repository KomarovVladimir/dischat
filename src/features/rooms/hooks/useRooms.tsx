import { useState } from "react";

import { getAllRooms } from "../slice/selectors";

export const useRooms = () => {
    const rooms = getAllRooms();

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
