module.exports = {
  extends: [
    'next/core-web-vitals',
    'airbnb',
  ],
  globals: {
    React: 'readonly',
  },
  rules: {
    camelcase: 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'no-async-promise-executor': 'off',
    'no-console': 'off',
    'no-shadow': 'off',
    'no-unused-expressions': 'off',
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'react-hooks/exhaustive-deps': 'off',
    'react/no-array-index-key': 'off',
    'import/extensions': ['error', 'ignorePackages', {
      js: 'never', jsx: 'never', ts: 'never', tsx: 'never',
    }],
    'import/prefer-default-export': 'off',
  },
};
