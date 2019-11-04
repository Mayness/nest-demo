const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('../tsconfig');
const { join } = require('path');

module.exports = {
  preset: 'ts-jest',
  rootDir: ".",
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: join(process.cwd(), compilerOptions.baseUrl, '/') } ),
  moduleFileExtensions: ["js", "json", "ts"],
  testEnvironment: "node",
  testRegex: ".test.ts$",
  transform: {
    "^.+\\.(t|j)s$": "ts-jest"
  }
};