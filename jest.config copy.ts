import { pathsToModuleNameMapper } from "ts-jest";
import { compilerOptions } from "./tsconfig.json";
import type { JestConfigWithTsJest } from "ts-jest";

console.log(compilerOptions.baseUrl, compilerOptions.paths);

const jestConfig: JestConfigWithTsJest = {
    preset: "ts-jest",
    testEnvironment: "node",
    roots: ["<rootDir>"],
    modulePaths: [compilerOptions.baseUrl],
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths)
};

export default jestConfig;
