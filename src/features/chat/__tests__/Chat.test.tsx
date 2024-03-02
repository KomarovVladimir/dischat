import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";

import { setupStore } from "app/store";
import { renderWithProviders } from "common/utils/test-utils";
import { roomAdded } from "features/rooms/slice/roomsSlice";

import { Chat } from "../components/Chat";
import { messageAdded } from "../slice/messagesSlice";

window.HTMLElement.prototype.scrollIntoView = function () {};

test("Renders Chat component", () => {
    const store = setupStore();
    const {
        payload: { id }
    } = store.dispatch(roomAdded("Room 1"));

    store.dispatch(messageAdded({ text: "Message 1", roomId: id }));
    store.dispatch(messageAdded({ text: "Message 2", roomId: id }));
    store.dispatch(messageAdded({ text: "Message 3", roomId: id }));

    const { getByText } = renderWithProviders(
        <MemoryRouter initialEntries={[`/rooms/${id}`]}>
            <Chat />
        </MemoryRouter>
    );

    expect(getByText("Message 1")).toBeInTheDocument();
    expect(getByText("Message 2")).toBeInTheDocument();
    expect(getByText("Message 3")).toBeInTheDocument();
});
