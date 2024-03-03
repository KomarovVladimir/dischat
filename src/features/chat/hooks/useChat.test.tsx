import { Provider } from "react-redux";

import { setupStore } from "app/store";
import { roomAdded } from "features/rooms/slice/roomsSlice";
import { renderHook } from "common/utils/test-utils";

import { useChat } from "./useChat";

import { messageAdded } from "../slice/messagesSlice";
import { MemoryRouter, Route, Routes } from "react-router";

test("useChat returns correct messages based on room", () => {
    const store = setupStore();

    const {
        payload: { id: roomId }
    } = store.dispatch(roomAdded("Room 1"));

    store.dispatch(messageAdded({ text: "Message 1", roomId }));
    store.dispatch(messageAdded({ text: "Message 2", roomId }));
    store.dispatch(messageAdded({ text: "Message 3", roomId }));

    jest.mock("react-router-dom", () => ({
        ...jest.requireActual("react-router-dom"),
        useParams: () => ({ roomId })
    }));

    const { result } = renderHook(() => useChat(), {
        wrapper: ({ children }) => (
            <Provider {...{ store }}>
                <MemoryRouter initialEntries={[`/rooms/${roomId}`]}>
                    <Routes>
                        <Route path="/rooms/:roomId" element={children} />
                    </Routes>
                </MemoryRouter>
            </Provider>
        ),
        initialProps: { store }
    });

    expect(result.current.messages).toHaveLength(3);
    expect(result.current.messages[0].text).toBe("Message 1");
    expect(result.current.messages[1].text).toBe("Message 2");
    expect(result.current.messages[2].text).toBe("Message 3");
});
