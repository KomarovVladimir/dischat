import { Id } from "types";

export type CreateRoomRequest = {
    name: string;
};

export type RoomData = {
    id: Id;
    name: string;
};
