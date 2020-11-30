module.exports = {
    root: true,
    env: { jest: true, node: true, es6: true},
    extends: [
        'standard',
        'plugin:@typescript-eslint/recommended'
    ],
    plugins: ['vue-storefront', '@typescript-eslint'],
    // add your custom rules here
    rules: {
        semi: 'off',
        'handle-callback-err': 1,
        'prefer-promise-reject-errors': 0,
        'import/no-duplicates': ['warning'],
        'arrow-parens': 0,
        'prefer-arrow-callback': 1,
        'generator-star-spacing': 0,
        'no-restricted-imports': [2, { paths: ['lodash-es'] }],
        'vue-storefront/no-corecomponent-import': 'error',
        'vue-storefront/no-corecomponent': 'error',
        'vue-storefront/no-corepage-import': 'error',
        'vue-storefront/no-corepage': 'error',
        'no-console': 0,
        'no-unused-vars': 1,
        'no-throw-literal': 0
    },
    overrides: [
        {
            files: ['core/**/*.ts'],
            rules: {
                'no-undef': 1
            }
        }
    ]
};
