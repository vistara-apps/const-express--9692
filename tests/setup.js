// Jest setup file for ChronoClash Arena tests

// Set test timeout
jest.setTimeout(10000);

// Mock console.log to reduce noise during tests
global.console = {
  ...console,
  log: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: console.error // Keep error logs for debugging
};

// Global test utilities
global.testUtils = {
  generateRandomName: () => `TestPlayer${Math.floor(Math.random() * 1000)}`,
  generateLongName: (length = 51) => 'a'.repeat(length),
  generateInvalidName: () => 'Test@Player!#$'
};
