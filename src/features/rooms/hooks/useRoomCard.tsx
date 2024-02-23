import { useNavigate } from "react-router";
import { Id } from "types";

export const useRoomCard = (id: Id) => {
    const navigate = useNavigate();

    const handleDelete = () => {};

    const handleNavigate = () => {
        navigate(`/authorized/rooms/${id}`);
    };

    return { handleDelete, handleNavigate };
};
