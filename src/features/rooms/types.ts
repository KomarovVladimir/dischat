import { EntityId } from "@reduxjs/toolkit";

import { RoomEntity } from "./slice";

export type CreateRoomRequest = {
    name: string;
};

export type JoinResponse = { data: RoomEntity };

export type RoomData = {
    id: EntityId;
    name: string;
};

export type RequestType = "create" | "join";

export type FieldNames = "name" | "roomId";
