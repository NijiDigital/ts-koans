const { join, resolve } = require('path')

const baseDir = __dirname

module.exports = {
  collectCoverageFrom: ['src/**/*.ts'],
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['.test.ts'],
  coverageReporters: ['text', 'lcov', 'html'],
  globalSetup: join(baseDir, 'internal/jest/jest-global-setup.js'),
  globals: {
    'ts-jest': {
      tsconfig: resolve(baseDir, 'tsconfig.json'),
    },
  },
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  preset: 'ts-jest',
  reporters: ['<rootDir>/internal/jest/koans-reporter.js'],
  rootDir: baseDir,
  runner: '<rootDir>/internal/jest/koans-runner',
  setupFilesAfterEnv: [resolve(baseDir, 'src/test/jest-custom.ts')],
  testEnvironment: 'node',
  testMatch: [join(baseDir, 'src/**/*.test.ts')],
  testSequencer: join(baseDir, 'internal/jest/test-sequencer.js'),
}
