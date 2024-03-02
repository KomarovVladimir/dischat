import { EntityId } from "@reduxjs/toolkit";

import { type RootState, useAppSelector } from "app/store";

import { roomsAdapter } from "./roomsSlice";

export const roomsSelectors = roomsAdapter.getSelectors<RootState>(
    (state) => state.rooms
);

export const getMessageIdsByRoomId = (id: EntityId) =>
    useAppSelector((state) => roomsSelectors.selectById(state, id)?.messageIds);

export const getAllRooms = () => useAppSelector(roomsSelectors.selectAll);

export const getRoomById = (id: EntityId) =>
    useAppSelector((state) => roomsSelectors.selectById(state, id));

export const roomExists = (id: EntityId) =>
    useAppSelector((state) => roomsSelectors.selectIds(state).includes(id));
