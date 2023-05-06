module.exports = {
    stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
    addons: [
        {
            name: '@storybook/addon-essentials',
            options: {
                backgrounds: true
            }
        },
        '@storybook/addon-links',
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
    babel: async (options) => {
        // Update your babel configuration here
        options.presets.push('@babel/preset-typescript')
        return options
    },
    webpackFinal: async (config, { configType }) => {
        // Make whatever fine-grained changes you need
        // Return the altered config
        return config
    },
    core: {
        disableTelemetry: true
    },
    typescript: {
        // check: false
    },
    docs: {
        autodocs: 'tag'
    },
    framework: {
        // The name of the framework you want to use goes here
        name: '@storybook/react-webpack5',
        options: {
            legacyRootApi: false,
            strictMode: true
        }
    },
    features: {
        storyStoreV7: true,
        buildStoriesJson: true
    }
}
