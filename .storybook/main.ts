import type { StorybookConfig } from "@storybook/react-webpack5";
import path from "path";

const config: StorybookConfig = {
    stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
    addons: [
        "storybook-addon-react-router-v6",
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/addon-onboarding",
        "@storybook/addon-interactions"
    ],
    framework: {
        name: "@storybook/react-webpack5",
        options: {
            builder: {
                useSWC: true
            }
        }
    },
    docs: {
        autodocs: "tag"
    },
    async webpackFinal(config, { configType }) {
        if (config?.resolve?.alias) {
            config.resolve.alias = {
                ...config.resolve.alias,
                app: path.resolve(__dirname, "../src/app"),
                assets: path.resolve(__dirname, "../src/assets"),
                common: path.resolve(__dirname, "../src/common"),
                components: path.resolve(__dirname, "../src/components"),
                features: path.resolve(__dirname, "../src/features"),
                routing: path.resolve(__dirname, "../src/routing*")
            };
        }
        return config;
    }
};
export default config;
