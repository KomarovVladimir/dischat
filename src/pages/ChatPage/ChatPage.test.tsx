import { render } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router";

import { ChatPage } from "./index";

test("renders ChatPage with navigation when room exists", () => {
    render(
        <MemoryRouter>
            <Routes>
                <Route path="/" element={<ChatPage />} />
            </Routes>
        </MemoryRouter>
    );
});
