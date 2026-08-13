import eslint from '@eslint/js';

export default [
  {
    ignores: ['coverage/**', 'node_modules/**'],
  },
  eslint.configs.recommended,
  {
    files: ['src/**/*.js', 'test/**/*.js', 'prisma/**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        Buffer: 'readonly',
        console: 'readonly',
        fetch: 'readonly',
        process: 'readonly',
        setTimeout: 'readonly',
      },
    },
    rules: {
      'no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' },
      ],
    },
  },
];
