const { join, resolve } = require('path')

const baseDir = __dirname

module.exports = {
  bail: true,
  collectCoverageFrom: ['src/**/*.ts'],
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['.test.ts'],
  coverageReporters: ['text', 'lcov', 'html'],
  globalSetup: join(baseDir, 'jest-global-setup.js'),
  globals: {
    'ts-jest': {
      tsconfig: resolve(baseDir, 'tsconfig.json'),
    },
  },
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  preset: 'ts-jest',
  rootDir: baseDir,
  runner: 'groups',
  setupFilesAfterEnv: [resolve(baseDir, 'src/test/jest-custom.ts')],
  testEnvironment: 'node',
  testMatch: [join(baseDir, 'src/**/*.test.ts')],
  testSequencer: join(baseDir, 'test-sequencer.js'),
}
