const config = {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'jsdom',
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        useESM: true,
        tsconfig: './tsconfig.app.json',
      },
    ],
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
};

export default config;