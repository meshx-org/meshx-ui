import createPlugin from 'tailwindcss/plugin'
import { ColorScheme, THEME_VALUES, VARIABLE } from '@meshx-org/mxui-core'

THEME_VALUES.fonts.default

export const plugin = createPlugin(function ({ matchUtilities, theme, addComponents }) {})

export const preset = {
    theme: {
        fontFamily: {
            sans: THEME_VALUES.fonts.default,
            mono: THEME_VALUES.fonts.mono
        },
        extend: {
            colors: {
                accent: {
                    DEFAULT: VARIABLE.accent.default
                },
                layer: {
                    DEFAULT: VARIABLE.backgrounds.layer.default,
                    alt: VARIABLE.backgrounds.layer.alt
                },
                solid: {
                    DEFAULT: VARIABLE.backgrounds.solid.default,
                    secondary: VARIABLE.backgrounds.solid.secondary
                }
            },
            zIndex: {
                60: '60',
                70: '70',
                80: '80',
                90: '90',
                100: '100'
            }
        }
    },
    plugins: []
}
