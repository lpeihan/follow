module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true
  },
  extends: 'airbnb-base',
  globals: {
    __static: true
  },
  plugins: [
    'html'
  ],
  'rules': {
    'global-require': 0,
    'import/no-unresolved': 0,
    'no-param-reassign': 0,
    'no-shadow': 0,
    'import/extensions': 0,
    'import/newline-after-import': 0,
    'no-multi-assign': 0,
    'comma-dangle': 0,
    'no-console': 0,
    'no-unused-expressions': 0,
    'no-underscore-dangle': 0,
    'no-empty': 0,
    'import/no-extraneous-dependencies': 0,
    'import/prefer-default-export': 0,
    'object-curly-newline': 0,
    'no-mixed-operators': 0,
    'no-bitwise': 0,
    'no-plusplus': 0,
    'no-nested-ternary': 0,
    'prefer-spread': 0,
    'prefer-rest-params': 0,
    'func-names': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
