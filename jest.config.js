module.exports = {
  setupFiles: ["<rootDir>/jest.setup.js"],
  testTimeout: 1000 * 60 * 2,
  preset: 'ts-jest',
  testEnvironment: 'node',
  "roots": [
    "<rootDir>/src"
  ],
  "transform": {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  "testMatch": [
    "**/?(*.)+(spec|test).+(ts|tsx|js)"
  ],
};
