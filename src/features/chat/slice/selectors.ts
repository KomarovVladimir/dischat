import { useAppSelector } from "app/store/store";

import { messagesSelectors } from "./messagesSlice";

export const getAllMessages = () => useAppSelector(messagesSelectors.selectAll);
