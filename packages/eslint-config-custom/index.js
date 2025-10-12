module.exports = {
  env: {
    node: true,
  },
  ignorePatterns: ['.next/', 'next-env.d.ts'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 'latest',
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  plugins: [],
  rules: {
    'react/react-in-jsx-scope': 'off', // suppress errors for missing 'import React' in files
  },
  settings: {
    react: { version: 'detect' },
  },
};
