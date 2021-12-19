module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: ['airbnb-base', 'plugin:prettier/recommended'],
    plugins: ['prettier'],
    parserOptions: {
        ecmaVersion: 13,
        sourceType: 'module',
    },
    rules: {
        'no-unused-vars': 'warn',
        'no-useless-concat': 'warn',
        'import/extensions': 'warn',
        'import/prefer-default-export': 'warn',
        'no-underscore-dangle': 'warn',
        radix: 'warn',
        camelcase: 'warn',
        'no-shadow': 'warn',
        'prettier/prettier': 'error',
    },
}
