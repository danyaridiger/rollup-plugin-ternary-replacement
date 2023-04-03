module.exports = {
  preset: "ts-jest/presets/js-with-babel",
  expand: true,
  displayName: {
    name: "rollup-plugin-ternary-replacement",
    color: "bgGreen",
  },
  sandboxInjectedGlobals: [],
  globals: {
    LOGICAL_ASSERTIONS: ["&&=", "||=", "??="],
  },
  injectGlobals: true,
  moduleDirectories: [
    "node_modules"
  ],
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js",
    "json",
    "jsx",
    "mjs",
    "node",
  ],
  resetModules: true,
  resetMocks: true,
  rootDir: "./",
  slowTestThreshold: 20,
  testEnvironment: "node",
  testLocationInResults: true,
  testMatch: [
    "**/tests/**/*.[jt]s?(x)",
    "**/?(*.)+(spec|test).[tj]s?(x)"
  ],
  testPathIgnorePatterns: [
    "tests/tools",
    "__snapshots__"
  ],
  transform: {
    ".*.[m]?js": "babel-jest",
  },
  transformIgnorePatterns: [
    "<rootDir>/node_modules/escodegen"
  ],
  fakeTimers: {
    legacyFakeTimers: true,
  },
}