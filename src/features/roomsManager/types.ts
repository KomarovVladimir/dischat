import { Id } from "types";

export type CreateRoomRequest = {
    name: string;
    userId: Id;
    creationDate: Date;
};
