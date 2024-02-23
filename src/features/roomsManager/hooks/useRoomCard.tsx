import { useNavigate } from "react-router";
import { Id } from "types";

import { useDeleteRoomMutation, useLeaveRoomMutation } from "../api";

export const useRoomCard = (id: Id) => {
    const navigate = useNavigate();
    const [deleteRoom] = useDeleteRoomMutation();
    const [leaveRoom] = useLeaveRoomMutation();

    const handleDelete = () => {
        deleteRoom(id);
    };

    const handleLeave = () => {
        leaveRoom(id);
    };

    const handleNavigate = () => {
        navigate(`/authorized/rooms/${id}`);
    };

    return { handleDelete, handleLeave, handleNavigate };
};
