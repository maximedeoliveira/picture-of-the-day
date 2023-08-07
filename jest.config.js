/** @type {import('jest').Config} */

const config = {
  preset: 'jest-expo',
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  openHandlesTimeout: 0,
};

module.exports = config;
