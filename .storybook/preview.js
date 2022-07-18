import './root.css'
import { ThemeProvider } from '../src/provider/ThemeProvider'
import { useDarkMode } from 'storybook-dark-mode'
import { themes } from '@storybook/theming'

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
            ...themes.dark, // copy existing valuesbrandTitle: 'MeshX UI',
            brandTitle: 'MeshX UI',

            appBg: '#202020',
            appContentBg: '#272727', // main story view frame
            barBg: '#272727' // top toolbar
        },
        light: {
            ...themes.light, // copy existing values
            brandTitle: 'MeshX UI',

            appBg: '#F3F3F3',
            appContentBg: '#F9F9F9', // main story view frame
            barBg: '#F9F9F9' // top toolbar
        }
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/
        }
    }
}
