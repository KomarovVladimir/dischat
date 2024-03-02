import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { Chat } from "./Chat";

jest.mock("../../hooks/useChat.tsx", () => ({
    __esModule: true,
    useChat: jest.fn(() => ({
        messages: [
            {
                id: 1,
                username: "User1",
                timestamp: new Date().toISOString(),
                text: "Hello!"
            },
            {
                id: 2,
                username: "User2",
                timestamp: new Date().toISOString(),
                text: "Hi!"
            }
        ],
        endRef: jest.fn()
    }))
}));

jest.mock("../../hooks/useChatInput.tsx", () => ({
    __esModule: true,
    useChatInput: jest.fn(() => ({
        handleSend: jest.fn(),
        handleSendMessage: jest.fn(),
        handleChange: jest.fn()
    }))
}));

describe("Chat component", () => {
    test("Renders messages correctly", () => {
        const { getByText } = render(<Chat />);

        expect(getByText("User1")).toBeInTheDocument();
        expect(getByText("User2")).toBeInTheDocument();
        expect(getByText("Hello!")).toBeInTheDocument();
        expect(getByText("Hi!")).toBeInTheDocument();
    });
});
