module.exports = {
    transform: {
      '^.+\\.js$': 'babel-jest', 
    },
    transformIgnorePatterns: [
        // Allow node-fetch (and other ESM modules) to be transformed
      '/node_modules/(?!node-fetch)/', 
    ],
  };
  