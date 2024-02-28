import { render, screen } from "@testing-library/react";

import { Chat } from "../components/Chat";

jest.mock("../hooks/useChatInput.tsx", () => ({
    useChatInput: () => ({
        messages: [
            { id: 1, text: "Message 1", timestamp: new Date().toISOString() },
            { id: 1, text: "Message 2", timestamp: new Date().toISOString() },
            { id: 1, text: "Message 3", timestamp: new Date().toISOString() }
        ]
    })
}));

test("Renders ChatInput component", () => {
    render(<Chat />);

    expect(screen.getByText("Message 1")).toBeInTheDocument();
    expect(screen.getByText("Message 2")).toBeInTheDocument();
    expect(screen.getByText("Message 3")).toBeInTheDocument();
});
