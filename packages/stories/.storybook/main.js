const path = require('path')

module.exports = {
    stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        'storybook-css-modules-preset',
        'storybook-dark-mode',
        {
            name: '@storybook/addon-react-native-web',
            options: {
                modulesToTranspile: [],
                babelPlugins: []
            }
        }
    ],
    framework: '@storybook/react',
    webpackFinal: async (config) => {
        /*config.module.rules.push({
            test: /\.(ts|tsx)$/,
            loader: require.resolve('babel-loader'),
            // include: [path.resolve(appDirectory, 'node_modules/react-native-svg')],
            options: {
                presets: ['module:metro-react-native-babel-preset', '@babel/preset-typescript'],
                // Re-write paths to import only the modules needed by the app
                plugins: ['react-native-web']
            },
            resolve: {
                alias: {
                    'react-native': 'react-native-web',
                    'react-native-svg': 'react-native-svg-web'
                }
            }
        })*/

        config.resolve.extensions.push('.ts', '.web.tsx', '.web.ts', '.tsx', '.stories.tsx')
        return config
    }
}
