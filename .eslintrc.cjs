module.exports = {
  root: true,
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2018,
  },
  env: {
    browser: true,
    jest: true,
    node: true,
  },
  // prettier should always be last, see: https://typescript-eslint.io/linting/troubleshooting/formatting/#suggested-usage---prettier
  extends: ['@nuxtjs/eslint-config-typescript', 'prettier'],
  plugins: ['prettier'],
  rules: {
    '@typescript-eslint/no-unused-vars': ['warn'],
    'prettier/prettier': ['error'],
  },
  overrides: [
    {
      files: ['*.vue'],
      rules: {
        'import/first': 'off',
      },
    },
  ],
};
