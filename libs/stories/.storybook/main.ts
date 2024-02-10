 const { mergeConfig } = require('vite')
import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
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
        options.presets?.push('@babel/preset-typescript')
        return options
    },
    core: {
        disableTelemetry: true,
        builder: '@storybook/builder-vite' // 👈 The builder enabled here.
    },
    async viteFinal(config) {
        // Merge custom configuration into the default config
        return mergeConfig(config, {
            plugins: [ ],
            resolve: {
                alias: {
                    'react-native': 'react-native-web'
                }
            },
            // Add dependencies to pre-optimization
            optimizeDeps: {
                esbuildOptions: {
                    plugins: [ ]
                },
                include: ['storybook-dark-mode']
            }
        })
    },
    typescript: {
        // check: false
    },
    docs: {
        autodocs: 'tag'
    },
    framework: {
        // The name of the framework you want to use goes here
        name: '@storybook/react-vite',
        options: {
            //        legacyRootApi: false,
            strictMode: true
        }
    },
    features: {
        storyStoreV7: true,
        buildStoriesJson: true
    }
}

export default config
