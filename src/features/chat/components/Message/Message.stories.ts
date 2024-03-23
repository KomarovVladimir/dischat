import type { Meta, StoryObj } from "@storybook/react";

import { Message } from "./Message";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: "Example/Message",
    component: Message,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: "centered",
        backgrounds: {
            default: "dark"
        }
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ["autodocs"]
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
} satisfies Meta<typeof Message>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const WithUserName: Story = {
    args: {
        userName: "User Name",
        text: "A message",
        date: new Date().toISOString()
    }
};
