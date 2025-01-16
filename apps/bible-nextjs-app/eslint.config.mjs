import { FlatCompat } from '@eslint/eslintrc';
import pluginJs from '@eslint/js';

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
  recommendedConfig: pluginJs.configs.recommended,
});

const eslintConfig = [
  ...compat.config({
    extends: ['next', 'custom'],
  }),
];

export default eslintConfig;
