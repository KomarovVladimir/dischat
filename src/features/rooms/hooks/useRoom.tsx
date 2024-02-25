import { useNavigate } from "react-router";
import { Id } from "types";

export const useRoom = (id: Id) => {
    const navigate = useNavigate();

    const handleDelete = () => {};

    const handleNavigate = () => {
        navigate(`/rooms/${id}`);
    };

    return { handleDelete, handleNavigate };
};