import { screen, render } from "@testing-library/react";
import { ChatInput } from "./ChatInput";

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
        render(<ChatInput />);

        expect(
            screen.getByPlaceholderText("Write a message...")
        ).toBeInTheDocument();
    });
});
