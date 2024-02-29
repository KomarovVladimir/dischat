import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";

import { renderWithProviders } from "common/utils/test-utils";

import { ListItem } from "../ListItem";

test("Renders ChatInput component", () => {
    renderWithProviders(<ListItem text="123" />);

    expect(screen.getByText("123")).toBeInTheDocument();
});
