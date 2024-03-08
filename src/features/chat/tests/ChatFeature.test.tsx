import { fireEvent } from "@testing-library/react";
import { Routes, Route, MemoryRouter } from "react-router";

import { setupStore } from "app/store/store";
import { renderWithProviders } from "common/utils/test-utils";
import { roomAdded } from "features/rooms/slice/roomsSlice";
import { routes } from "routing/routes";

import { Chat } from "../components/Chat";
import { messageAdded } from "../slice/messagesSlice";
import { nanoid } from "@reduxjs/toolkit";

window.HTMLElement.prototype.scrollIntoView = function () {};

describe("Chat Feature", () => {
    test("Renders a chat with three messages", () => {
        const store = setupStore();
        const {
            payload: { id: roomId }
        } = store.dispatch(roomAdded({ id: nanoid(), name: "Room 1" }));

        store.dispatch(messageAdded({ text: "Message 1", roomId }));
        store.dispatch(
            messageAdded({ userName: "UserName", text: "Message 2", roomId })
        );
        store.dispatch(messageAdded({ text: "Message 3", roomId }));

        const { getByText } = renderWithProviders(
            <MemoryRouter initialEntries={[`/rooms/${roomId}`]}>
                <Routes>
                    <Route path={routes.room} element={<Chat />} />
                </Routes>
            </MemoryRouter>,
            { store }
        );

        expect(getByText("Message 1")).toBeInTheDocument();
        expect(getByText("UserName")).toBeInTheDocument();
        expect(getByText("Message 2")).toBeInTheDocument();
        expect(getByText("Message 3")).toBeInTheDocument();
    });

    test("Adds a message to a chat", () => {
        const store = setupStore();
        const {
            payload: { id: roomId }
        } = store.dispatch(roomAdded({ id: nanoid(), name: "Room 1" }));

        const { getByText, getByPlaceholderText } = renderWithProviders(
            <MemoryRouter initialEntries={[`/rooms/${roomId}`]}>
                <Routes>
                    <Route path={routes.room} element={<Chat />} />
                </Routes>
            </MemoryRouter>,
            { store }
        );

        const inputElement = getByPlaceholderText("Write a message...");

        const messageText = "A message";

        fireEvent.change(inputElement, { target: { value: messageText } });

        fireEvent.keyUp(inputElement, {
            key: "Enter",
            code: "Enter",
            charCode: 13
        });

        expect(getByText(messageText)).toBeInTheDocument();
    });
});
