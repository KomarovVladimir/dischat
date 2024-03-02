import { EntityId } from "@reduxjs/toolkit";
import { useAppSelector } from "app/store";

import { messagesSelectors } from "./messagesSlice";

export const getMessagesByIds = (messageIds: EntityId[] = []) =>
    useAppSelector((state) =>
        messagesSelectors
            .selectAll(state)
            .filter(({ id }) => messageIds.includes(id))
    );
