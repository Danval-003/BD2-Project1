module.exports = {
  env: {
    node: true,
    commonjs: true,
    es2021: true,
  },
  extends: ['airbnb-base',
    'plugin:node/recommended'],
  overrides: [
    {
      files: ['**/*.js'],
      rules: {
        'prefer-arrow-callback': ['error', { allowNamedFunctions: true, allowUnboundThis: false }],
      },
    },
  ],
  plugins: ['prefer-arrow'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    semi: ['error', 'never'],
    'max-len': [
      'warn',
      {
        code: 120,
        tabWidth: 2,
      },
    ],
  },
}
