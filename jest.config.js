module.exports = {
  setupFilesAfterEnv: ['./jest.setup.js'],
  testEnvironment: 'jsdom',
  testMatch: [
    "**/test/useLoading.test.js"
  ],
  transform: {
    "^.+\\.jsx?$": "babel-jest",
    '^.+\\.js$': 'babel-jest',
  },
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageReporters: [
    "json",
    "lcov",
    "text",
    "clover"
  ]
};