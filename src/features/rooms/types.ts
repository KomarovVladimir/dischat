import { EntityId } from "@reduxjs/toolkit";

export type AddRoomRequest = { name: string } | { roomId: EntityId };

export type RoomData = {
    id: EntityId;
    name: string;
};

export type FieldNames = "name" | "roomId";
