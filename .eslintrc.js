// https://docs.expo.dev/guides/using-eslint/
module.exports = {
    extends: ['expo', 'prettier'],
    rules: {
        'prettier/prettier': ['error', { endOfLine: 'auto' }],
    },
    plugin: ['prettier'],
};
