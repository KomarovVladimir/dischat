import { compilerOptions } from "./tsconfig.json";
import type { JestConfigWithTsJest } from "ts-jest";

console.log(compilerOptions.baseUrl, compilerOptions.paths);

const jestConfig: JestConfigWithTsJest = {
    preset: "ts-jest/presets/default-esm",
    extensionsToTreatAsEsm: [".ts"],
    transform: {},
    testEnvironment: "node",
    moduleFileExtensions: ["ts", "js", "html", "node"]
};

export default jestConfig;
