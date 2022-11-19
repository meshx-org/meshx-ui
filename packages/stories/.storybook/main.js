const path = require('path')

module.exports = {
    stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
    addons: [
        { name: '@storybook/addon-essentials', options: { backgrounds: false } },
        '@storybook/addon-links',
        // '@storybook/addon-interactions',
        // '@storybook/addon-a11y',
        // '@whitespace/storybook-addon-html',
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
    core: {
        builder: "webpack5",
    },
    framework: '@storybook/react',
    reactOptions: {
        // fastRefresh: true,
        // strictMode: true
    },
    features: {
        storyStoreV7: true,
        buildStoriesJson: true
    },
    webpackFinal: async (config, { configType }) => {
        // Make whatever fine-grained changes you need
        // Return the altered config
        return config
    }
}
