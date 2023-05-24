module.exports = {
  testEnvironment: 'jsdom',  
  transform: {
    "^.+\\.jsx?$": "babel-jest"  
  },
  testMatch: [
    "**/test/*.test.js"
  ],
  transform: {
    "^.+\\.jsx?$": "babel-jest"
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