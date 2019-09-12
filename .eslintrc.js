module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
  },
  extends: 'airbnb',
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'global-require': 0,
    'no-console': 0,
    'react/prefer-stateless-function': 0,
    'react/prop-types': 0,
  },
};
