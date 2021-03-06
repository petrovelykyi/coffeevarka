module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'jsx-a11y',
    'react-hooks'
  ],
  rules: {
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "no-underscore-dangle": "off",
    "react-hooks/rules-of-hooks": 'error',
    "react-hooks/exhaustive-deps": 'warn',
    "react/jsx-props-no-spreading": "off",
  },
  settings: {
    react: {
      pragma: 'React',
      version: 'detect'
    }
  }
};
