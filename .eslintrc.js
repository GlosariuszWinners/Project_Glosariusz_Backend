module.exports = {
    env: {
        es2021: true,
        node: true,
    },
    extends: ['airbnb-base', 'plugin:prettier/recommended'],
    parserOptions: {
        ecmaVersion: 13,
        sourceType: 'module',
    },
    ignorePatterns: ['dist/'],
    rules: {
        'no-unused-vars': 'warn',
        'no-useless-concat': 'warn',
        'import/extensions': 'warn',
        'import/prefer-default-export': 'warn',
        'no-underscore-dangle': 'off',
        radix: 'warn',
        camelcase: 'off',
        'no-console': 'off',
        'prettier/prettier': [
            'error',
            {
                trailingComma: 'es5',
                tabWidth: 4,
                singleQuote: true,
                endOfLine: 'auto',
                allowSingleLine: true,
            },
        ],
    },
};
