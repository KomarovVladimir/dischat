import { EntityId } from "@reduxjs/toolkit";

export interface MessageData {
  id: string;
  userName: string;
  text: string;
  created?: string;
  lastUpdated?: string;
}

export interface PostMessageRequest {
  roomId: EntityId;
  text: string;
  timestamp: string;
}
