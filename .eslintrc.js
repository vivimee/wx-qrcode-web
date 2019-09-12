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
  },
};
