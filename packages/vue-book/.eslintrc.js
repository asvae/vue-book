module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard',
    '@vue/typescript',
    'plugin:vue/strongly-recommended',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'development' ? 'off' : 'error',
    'no-debugger': process.env.NODE_ENV === 'development' ? 'off' : 'error',
    'comma-dangle': ['error', 'always-multiline'], // simplifies merge requests
    'curly': 'error', // for consistent if's
    'camelcase': 'off', // to support generated types
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },

  // required to lint *.vue files
  plugins: [
    'vue',
    '@typescript-eslint',
  ],
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
}
