import { EntityId } from "@reduxjs/toolkit";

export interface MessageData {
    id: string;
    username: string;
    text: string;
    created?: string;
    lastUpdated?: string;
}

export interface PostMessageRequest {
    roomId: EntityId;
    text: string;
    timestamp: string;
}
