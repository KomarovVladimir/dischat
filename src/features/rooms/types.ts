import { EntityId } from "@reduxjs/toolkit";

export type CreateRoomRequest = {
    name: string;
};

export type RoomData = {
    id: EntityId;
    name: string;
};
