module.exports = {
  env: {
    node: true,
  },
  parser: '@typescript-eslint/parser',
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier', 'turbo'],
  plugins: ['@typescript-eslint', 'react-hooks', 'react-compiler'],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 'latest',
  },
  rules: {
    eqeqeq: 'error',
    'react-hooks/exhaustive-deps': 'error',
    'react-compiler/react-compiler': 'error',
  },
};
