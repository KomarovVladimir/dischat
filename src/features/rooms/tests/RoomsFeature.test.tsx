import { Routes, Route, MemoryRouter } from "react-router";

import { setupStore } from "app/store/store";
import { fireEvent, renderWithProviders } from "common/utils/test-utils";
import { roomAdded } from "features/rooms/slice/roomsSlice";
import { routes } from "routing/routes";
import { stringAvatar } from "lib";

import { Rooms } from "../components/Rooms";

window.HTMLElement.prototype.scrollIntoView = function () {};

describe("Rooms Feature", () => {
    test("Renders rooms", () => {
        const store = setupStore();
        const {
            payload: { name: name1 }
        } = store.dispatch(roomAdded("Room 1"));
        const {
            payload: { name: name2 }
        } = store.dispatch(roomAdded("Test 2"));

        const { getByText } = renderWithProviders(
            <MemoryRouter initialEntries={[routes.baseRoute]}>
                <Routes>
                    <Route path={routes.baseRoute} element={<Rooms />} />
                </Routes>
            </MemoryRouter>,
            { store }
        );

        expect(getByText(stringAvatar(name1).children)).toBeInTheDocument();
        expect(getByText(stringAvatar(name2).children)).toBeInTheDocument();
    });

    test("Opens a dialog", () => {
        const store = setupStore();

        const { getByText, getByPlaceholderText } = renderWithProviders(
            <MemoryRouter initialEntries={[routes.baseRoute]}>
                <Routes>
                    <Route path={routes.baseRoute} element={<Rooms />} />
                </Routes>
            </MemoryRouter>,
            { store }
        );

        const addButton = getByText("+");

        fireEvent.click(addButton);

        expect(
            getByPlaceholderText("Write a new room name")
        ).toBeInTheDocument();
    });
});
