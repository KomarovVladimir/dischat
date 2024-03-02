import { EntityId } from "@reduxjs/toolkit";

export type AddRoomRequest = { name: string } | { roomId: EntityId };

export type FieldNames = "name" | "roomId";
