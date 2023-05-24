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
  }
};