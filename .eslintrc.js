module.exports = {
  root: true,
  parser: 'babel-eslint',
  plugins: [
    'flowtype',
    'jest',
  ],
  extends: ['airbnb-base', 'plugin:flowtype/recommended'],
  env: {
    browser: false,
    node: true,
  },
  rules: {
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'class-methods-use-this': 'off',
    'no-restricted-globals': 'warn',
    'no-underscore-dangle': 'off',
    'max-len': ['warn', { ignoreComments: true }],
    'lines-between-class-members': ['warn', 'always', { exceptAfterSingleLine: true }],
    'space-infix-ops': 'error',
    'no-multi-spaces': 'error',
    'space-unary-ops': ['error', { words: true, nonwords: false }],
  },
  overrides: [
    {
      files: ['*.test.js', '*.spec.js'],
      env: {
        jest: true,
      },
      rules: {
        'no-console': 'off',
        'global-require': 'off',
      },
    },
    {
      files: ['bin/**/*', 'scripts/**/*'],
      rules: {
        'no-console': 'off',
        'import/no-extraneous-dependencies': 'off',
      },
    },
  ],
};
