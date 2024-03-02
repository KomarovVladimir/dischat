import "@testing-library/jest-dom";
import { Routes, Route, MemoryRouter } from "react-router";

import { setupStore } from "app/store";
import { renderWithProviders } from "common/utils/test-utils";
import { roomAdded } from "features/rooms/slice/roomsSlice";
import { routes } from "routing/routes";

import { Chat } from "../components/Chat";
import { messageAdded } from "../slice/messagesSlice";

window.HTMLElement.prototype.scrollIntoView = function () {};

test("Renders Chat component", () => {
    const store = setupStore();
    const {
        payload: { id: roomId }
    } = store.dispatch(roomAdded("Room 1"));

    store.dispatch(messageAdded({ text: "Message 1", roomId }));
    store.dispatch(messageAdded({ text: "Message 2", roomId }));
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
    expect(getByText("Message 2")).toBeInTheDocument();
    expect(getByText("Message 3")).toBeInTheDocument();
});
