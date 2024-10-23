import React from 'react'
import { ThemeProvider, DEFAULT_DARK, DEFAULT_LIGHT } from '@meshx/mxui'
import { useDarkMode } from 'storybook-dark-mode'
import { themes, ThemeVars } from '@storybook/theming'

import './root.css'

export const decorators = [
    (Story) => {
        const theme = useDarkMode() ? 'dark' : 'light'

        return (
            <div className={theme} data-theme={theme}>
                <ThemeProvider theme={theme}>
                    <Story />
                </ThemeProvider>
            </div>
        )
    }
]

function toRgba([r, g, b, a]: [number, number, number, number]) {
    return `rgba(${r}, ${g}, ${b}, ${a})`
}

const dark: ThemeVars = {
    ...themes.dark, // copy existing values
    brandTitle: 'MeshX UI',
    colorPrimary: toRgba(DEFAULT_DARK.accent.default),
    colorSecondary: toRgba(DEFAULT_DARK.accent.default),
    barSelectedColor: toRgba(DEFAULT_DARK.accent.default),

    textInverseColor: 'black',

    textColor: toRgba(DEFAULT_DARK.text.primary),
    textMutedColor: toRgba(DEFAULT_DARK.text.disabled),

    barTextColor: toRgba(DEFAULT_DARK.text.primary),
    appBorderColor: toRgba(DEFAULT_DARK.stroke.divider),
    inputBorder: toRgba(DEFAULT_DARK.stroke.divider),

    appBg: toRgba(DEFAULT_DARK.backgrounds.solid.secondary),
    appContentBg: toRgba(DEFAULT_DARK.backgrounds.solid.default), // main story view frame
    barBg: toRgba(DEFAULT_DARK.backgrounds.solid.default) // top toolbar
}

const light: ThemeVars = {
    ...themes.light, // copy existing values
    brandTitle: 'MeshX UI',
    colorPrimary: 'red',

    textColor: toRgba(DEFAULT_LIGHT.text.primary),
    textMutedColor: toRgba(DEFAULT_LIGHT.text.disabled),

    textInverseColor: 'white',

    appBorderColor: toRgba(DEFAULT_LIGHT.stroke.divider),
    inputBorder: toRgba(DEFAULT_LIGHT.stroke.divider),

    appBg: toRgba(DEFAULT_LIGHT.backgrounds.solid.secondary),
    appContentBg: toRgba(DEFAULT_LIGHT.backgrounds.solid.default), // main story view frame
    barBg: toRgba(DEFAULT_LIGHT.backgrounds.solid.default) // top toolbar
}

export const parameters = {
    darkMode: {
        classTarget: 'html',
        stylePreview: true,
        dark,
        light
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
