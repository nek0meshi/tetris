module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'deprecation'],
  rules: {
    'deprecation/deprecation': 2,
  },
  overrides: [
    {
      files: ['.eslintrc.js'],
      env: {
        node: true,
      },
    },
    {
      files: ['*.tsx'],
      rules: {
        'react/jsx-uses-react': 'off',
        'react/react-in-jsx-scope': 'off',
      },
    },
  ],
  root: true,
  settings: {
    react: {
      version: 'detect',
    },
  },
};
