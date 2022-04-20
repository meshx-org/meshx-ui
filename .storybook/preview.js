import './root.css'
import { ThemeProvider } from '../src/provider/ThemeProvider'
import { useDarkMode } from 'storybook-dark-mode'

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
    backgrounds: {
        default: 'light',
        values: [
            {
                name: 'light',
                value: '#F3F3F3'
            },
            {
                name: 'dark',
                value: '#202020'
            }
        ]
    },
    darkMode: {
        stylePreview: true
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/
        }
    }
}
