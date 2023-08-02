module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  ignorePatterns: ['node_modules', '.eslintrc.js'],
  extends: [
    // Recommended config for ESLint
    'eslint:recommended',
    // Eslint config for React Native project
    '@react-native-community',
    // React specific linting rules
    'plugin:react/recommended',
    // React hooks specific rules
    'plugin:react-hooks/recommended',
    // Provides lint rules for TypeScript codebase
    'plugin:@typescript-eslint/recommended',
    // Configuration to fit with Prettier
    'plugin:prettier/recommended',
  ],
  plugins: ['unused-imports', 'jest'],
  rules: {
    // Unused imports
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'error',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
  },
};
