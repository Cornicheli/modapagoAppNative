module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
        plugins: [
            [
                'module:react-native-dotenv',
                {
                    envName: 'APP_ENV',
                    moduleName: '@env',
                    path: '.env',
                },
            ],
            [
                'module-resolver',
                {
                    root: ['./src'],
                    alias: {
                        '@': './src',
                    },
                },
            ],
            'react-native-reanimated/plugin', // Este debe estar al final
        ],
    };
};
