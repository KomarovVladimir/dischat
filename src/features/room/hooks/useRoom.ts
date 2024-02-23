import { SelectChangeEvent } from "@mui/material";
import { useEffect, useState } from "react";

import { useGetRoomDataQuery, useUpdateRoomMutation } from "../api/roomApi";
import { Status } from "../types";

export const useRoom = (roomId: string) => {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [status, setStatus] = useState<Status>("Pending");
    const [updateRoom] = useUpdateRoomMutation();
    const { data: room } = useGetRoomDataQuery(roomId);

    useEffect(() => {
        if (room) {
            setStatus(room?.status);
        }
    }, [status, room]);

    const handleStatusChange = (e: SelectChangeEvent) => {
        updateRoom({
            id: +roomId,
            name: room?.name as string,
            status: e.target.value as Status
        });
    };

    const handleCopy = (id: string) => () => {
        navigator.clipboard.writeText(id);
        setSnackbarOpen(true);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return {
        roomId: +roomId,
        status,
        name: room?.name,
        snackbarOpen,
        handleCopy,
        handleSnackbarClose,
        handleStatusChange
    };
};
