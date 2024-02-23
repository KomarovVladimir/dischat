import { useState } from "react";

import { useGetRoomsQuery } from "../api";

export const useRoomsManager = () => {
    const { data: rooms = [] } = useGetRoomsQuery();
    const [creationOpen, setCreationOpen] = useState(false);
    const [joiningOpen, setJoiningOpen] = useState(false);

    const handleOpen = () => {
        setCreationOpen(true);
    };

    const handleClose = () => {
        setCreationOpen(false);
    };

    const handleJoiningOpen = () => {
        setJoiningOpen(true);
    };

    const handleJoiningClose = () => {
        setJoiningOpen(false);
    };

    return {
        rooms,
        creationOpen,
        joiningOpen,
        handleOpen,
        handleClose,
        handleJoiningOpen,
        handleJoiningClose
    };
};
