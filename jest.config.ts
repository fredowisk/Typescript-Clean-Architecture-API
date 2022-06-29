export default {
  roots: ['<rootDir>/test'],
  collectCoverageFrom: ['<rootDir>/test/**/*.ts'],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  preset: '@shelf/jest-mongodb',
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
}
