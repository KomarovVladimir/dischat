import { useAppSelector } from "app/store";

import { messagesSelectors } from "./messagesSlice";

export const getAllMessages = () => useAppSelector(messagesSelectors.selectAll);
