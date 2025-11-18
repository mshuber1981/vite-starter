export default {
  // Test environment
  testEnvironment: 'node',
  
  // Enable Jest globals (describe, test, expect, etc.)
  injectGlobals: true,
  
  // Test file patterns - scripts directory only
  testMatch: [
    '**/scripts/**/__tests__/**/*.js',
    '**/scripts/**/?(*.)+(spec|test).js'
  ],
  
  // Transform configuration
  transform: {},
  
  // Coverage settings - focus on scripts directory
  collectCoverageFrom: [
    'scripts/**/*.js',
    '!scripts/**/*.test.js',
    '!scripts/configure-inquirer.js', // CLI script with TTY requirements
    '!scripts/utils/test-utils.js',
    '!**/node_modules/**',
    '!**/coverage/**'
  ],
  
  // Coverage thresholds - focused on testable utilities
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90
    },
    'scripts/configure-utils.js': {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  },
  
  // Setup files - none needed, tests handle mocking directly
  
  // Verbose output for scripts testing
  verbose: true
};