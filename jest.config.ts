import type { Config } from 'jest';

const config: Config = {
  testEnvironment: 'node',
  roots: ['<rootDir>/test'],
  testMatch: ['**/*.test.ts'],
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  verbose: true,
  collectCoverageFrom: [
    'src/**/*.{js,ts}',
    'lib/**/*.{js,ts}',
    '!src/**/*/*.d.ts',
    '!src/**/*/types.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
  reporters: ['default', 'jest-junit'],
};

export default config;
