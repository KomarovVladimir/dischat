import { EntityId } from "@reduxjs/toolkit";

import { type AppState } from "app/store/store";
import { useAppSelector } from "app/hooks/storeHooks";

import { roomsAdapter } from "./roomsSlice";

export const roomsSelectors = roomsAdapter.getSelectors<AppState>(
    (state) => state.rooms
);

//TODO: Use createSelector
export const getMessageIdsByRoomId = (id: EntityId) =>
    useAppSelector((state) => roomsSelectors.selectById(state, id)?.messageIds);

export const getAllRooms = () => useAppSelector(roomsSelectors.selectAll);

export const getRoomById = (id: EntityId) =>
    useAppSelector((state) => roomsSelectors.selectById(state, id));

export const roomExists = (id: EntityId) =>
    useAppSelector((state) => roomsSelectors.selectIds(state).includes(id));
