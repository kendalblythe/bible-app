import nextPlugin from '@next/eslint-plugin-next';
import custom from 'eslint-config-custom';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  ...custom,
  {
    ...nextPlugin.configs['core-web-vitals'],
    files: ['**/*.{js,mjs,cjs,jsx,ts,tsx}'],
  },
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
]);
