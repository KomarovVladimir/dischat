import { useEffect, useState } from "react";

import { Status } from "../types";
import { useLazyGetMembersQuery, useGetRoomDataQuery } from "../api";

export const useMembers = (roomId: string) => {
    const [membersDialogOpen, setMembersDialogOpen] = useState(false);
    const [status, setStatus] = useState<Status>("Pending");
    const { data: room } = useGetRoomDataQuery(roomId);
    const [getMembers, { data: members }] = useLazyGetMembersQuery();

    useEffect(() => {
        getMembers(roomId);
    }, [getMembers, roomId]);

    useEffect(() => {
        if (room) {
            setStatus(room?.status);
        }
    }, [status, room]);

    const handleMembersOpen = () => {
        setMembersDialogOpen(true);
    };

    const handleMembersClose = () => {
        setMembersDialogOpen(false);
    };

    return {
        members,
        membersDialogOpen,
        handleMembersOpen,
        handleMembersClose
    };
};
