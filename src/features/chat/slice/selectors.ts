import { useAppSelector } from "app/hooks/storeHooks";
import { messagesSelectors } from "./messagesSlice";

export const getAllMessages = () => useAppSelector(messagesSelectors.selectAll);
