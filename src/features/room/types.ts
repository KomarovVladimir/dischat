import { statuses } from "common/constants";
import { Id } from "types";

export type Status = (typeof statuses)[number];

//TODO: Refactor polls?
export type ItemData = {
    id: Id;
    name: string;
    votes: number;
    voted: boolean;
    roomId: Id;
};

export type RoomData = {
    id: Id;
    authorName?: string;
    isOwner: boolean;
    name: string;
    status: Status;
};

export type anonRoomData = Pick<RoomData, "id" | "name">;

//TODO: Add a status field
export type MemberData = {
    id: Id;
    username?: string;
    email?: string;
};

export type GetItemsRequest = { roomId: Id; userId: Id };

export type ExcludeMemberRequest = { roomId: Id; userId: Id };

export type VoteRequest = { roomId: Id; itemId: Id };
