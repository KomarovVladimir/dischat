import { useState } from "react";

export const useRooms = () => {
    const [creationOpen, setCreationOpen] = useState(false);

    const handleOpen = () => {
        setCreationOpen(true);
    };

    const handleClose = () => {
        setCreationOpen(false);
    };

    return {
        // rooms,
        creationOpen,
        handleOpen,
        handleClose
    };
};
