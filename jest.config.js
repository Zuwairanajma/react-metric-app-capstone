module.exports = {
  // Other Jest configuration options...
  moduleNameMapper: {
    '^axios$': require.resolve('axios'),
  },
  testEnvironment: 'node',
  setupFiles: ['<rootDir>/src/setupTests.js'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  transformIgnorePatterns: [],
  extensionsToTreatAsEsm: ['.jsx'],
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
};
