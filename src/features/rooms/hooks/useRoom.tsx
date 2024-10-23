import { EntityId } from "@reduxjs/toolkit";
import { useNavigate } from "react-router";

export const useRoom = (id: EntityId) => {
  const navigate = useNavigate();

  const handleDelete = () => {};

  const handleNavigate = () => {
    navigate(`/rooms/${id}`);
  };

  return { handleDelete, handleNavigate };
};
