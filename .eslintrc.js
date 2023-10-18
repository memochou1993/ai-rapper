module.exports = {
  extends: [
    'next/core-web-vitals',
    'airbnb',
  ],
  globals: {
    React: 'readonly',
  },
  rules: {
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
  },
};
