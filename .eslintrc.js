module.exports = {
    root: true,
    extends: [
      '@react-native',
      'eslint:recommended',
      'plugin:prettier/recommended',
    ],
    plugins: ['react', 'react-native', 'prettier'],
    parserOptions: {ecmaVersion: 'latest'},
    env: {
      'react-native/react-native': true,
    },
    rules: {
      'no-unused-vars': 'error',
      'prettier/prettier': 0
    },
};
  