import './root.css'
import { ThemeProvider } from '@meshx-org/mxui-core'
import { useDarkMode } from 'storybook-dark-mode'
import { themes } from '@storybook/theming'
import { DEFAULT_DARK, DEFAULT_LIGHT } from '@meshx-org/mxui-core/src/context/themeValues'

export const decorators = [
    (Story) => {
        const theme = useDarkMode() ? 'dark' : 'light'
        return (
            <ThemeProvider theme={theme}>
                <Story />
            </ThemeProvider>
        )
    }
]

export const parameters = {
    darkMode: {
        stylePreview: true,
        dark: {
            ...themes.dark, // copy existing values
            brandTitle: 'MeshX UI',
            colorPrimary: "red", 
            textColor: DEFAULT_DARK.colors.text.primary,
            barTextColor: DEFAULT_DARK.colors.text.primary,
            // textInverseColor: "purple",
            // textMutedColor: "blue",
            appBorderColor:  DEFAULT_DARK.colors.stroke.divider,
            inputBorder: DEFAULT_DARK.colors.stroke.divider,

            appBg: DEFAULT_DARK.colors.backgrounds.solid.secondary,
            appContentBg: DEFAULT_DARK.colors.backgrounds.solid.default, // main story view frame
            barBg: DEFAULT_DARK.colors.backgrounds.solid.default, // top toolbar
        },
        light: {
            ...themes.light, // copy existing values
            brandTitle: 'MeshX UI',

            appBorderColor: DEFAULT_LIGHT.colors.stroke.divider,
            inputBorder: DEFAULT_LIGHT.colors.stroke.divider,

            appBg: DEFAULT_LIGHT.colors.backgrounds.solid.secondary,
            appContentBg: DEFAULT_LIGHT.colors.backgrounds.solid.default, // main story view frame
            barBg: DEFAULT_LIGHT.colors.backgrounds.solid.default, // top toolbar
        }
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
        expanded: true,
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/
        }
    },
    html: {
        prettier: {
            tabWidth: 4,
            useTabs: false,
            htmlWhitespaceSensitivity: 'strict'
        }
    }
}
