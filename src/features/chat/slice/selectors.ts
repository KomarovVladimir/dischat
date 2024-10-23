import { EntityId } from "@reduxjs/toolkit";
import { useAppSelector } from "app/hooks/storeHooks";
import { messagesSelectors } from "./messagesSlice";

export const getAllMessages = () => useAppSelector(messagesSelectors.selectAll);
export const getMessageById = (id: EntityId) =>
  useAppSelector((state) => messagesSelectors.selectById(state, id));
