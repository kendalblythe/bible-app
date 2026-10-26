import eslintReact from '@eslint-react/eslint-plugin';
import eslintJs from '@eslint/js';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import prettier from 'eslint-config-prettier';
import importX from 'eslint-plugin-import-x';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';

export default [
  eslintJs.configs.recommended,
  ...typescript.configs['flat/recommended'],
  eslintReact.configs['recommended-typescript'],
  reactHooks.configs.flat.recommended,
  eslintReact.configs['disable-conflict-eslint-plugin-react-hooks'],
  {
    files: ['**/*.{js,mjs,cjs,jsx,ts,tsx}'],
    plugins: {
      'import-x': importX,
    },
    rules: {
      'import-x/no-anonymous-default-export': 'warn',
    },
  },
  {
    files: ['**/*.{js,mjs,cjs,jsx,ts,tsx}'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
      globals: globals.node,
    },
  },
  prettier,
];
