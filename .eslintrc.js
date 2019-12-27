module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
    ecmaVersion: 2018,
  },
  env: {
    browser: true,
    jest: true,
    node: true,
  },
  extends: ['prettier', 'prettier/vue'],
  plugins: ['prettier', 'vue'],
};
