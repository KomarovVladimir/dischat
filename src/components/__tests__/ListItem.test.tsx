import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";

import { render } from "common/utils";

import { ListItem } from "../ListItem";

test("Renders ChatInput component", () => {
    render(<ListItem text="123" />);

    expect(screen.getByText("123")).toBeInTheDocument();
    expect(screen.getByText("2345")).toBeInTheDocument();
});
