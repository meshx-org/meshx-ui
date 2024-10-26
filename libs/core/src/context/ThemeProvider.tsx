import React, { createContext, useContext } from 'react'
import type { ThemeContextValue } from '../theme/types'
import { THEME_VALUES } from '../theme/themeValues'
import { DEFAULT_DARK, DEFAULT_LIGHT, VARIABLE } from '../theme/colorSchemes'
import { GlobalStyle } from '../theme/globalStyles'

import { ThemeProvider as SCProvider } from 'styled-components'
import { ThemeProvider as EmotionThemeProvider, Theme } from '@emotion/react'
import { fontStack } from '../theme'

const ThemeContext = createContext<ThemeContextValue>({ name: 'light', values: THEME_VALUES, colors: VARIABLE })

export const useTheme = () => useContext(ThemeContext).name
export const useThemeValues = () => useContext(ThemeContext).values
export const useThemeColors = () => useContext(ThemeContext).colors

interface ThemeProviderProps {
    theme: 'light' | 'dark'
    children: React.ReactNode
}

const breakpoints = ['544px', '768px', '1012px', '1280px']

const sizes = {
    small: '544px',
    medium: '768px',
    large: '1012px',
    xlarge: '1280px'
}

const fontWeights = {
    light: 300,
    normal: 400,
    semibold: 500,
    bold: 600
}

const lineHeights = {
    condensedUltra: 1,
    condensed: 1.25,
    default: 1.5
}

const fonts = {
    default: fontStack([
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'Noto Sans',
        'Helvetica',
        'Arial',
        'sans-serif',
        'Apple Color Emoji',
        'Segoe UI Emoji'
    ]),
    mono: `var(--fontStack-monospace, ${fontStack([
        'SFMono-Regular',
        'Consolas',
        'Liberation Mono',
        'Menlo',
        'Courier',
        'monospace'
    ])})`
}

const fontSizes = ['12px', '14px', '16px', '20px', '24px', '32px', '40px', '48px', '56px']

const emotionTheme: Theme = {
    // animation,
    //borderWidths,
    breakpoints,
    fonts,
    fontSizes,
    fontWeights,
    lineHeights,
    //radii,
    sizes,
    //  space,
    //  colorSchemes
    colors: VARIABLE
}

export function ThemeProvider({ theme, children }: ThemeProviderProps) {
    // TODO: detect native platform
    const isWeb = true

    return (
        <EmotionThemeProvider theme={emotionTheme}>
            <ThemeContext.Provider value={{ name: theme, colors: VARIABLE, values: THEME_VALUES }}>
                <SCProvider
                    theme={{
                        darkScheme: DEFAULT_DARK,
                        lightScheme: DEFAULT_LIGHT,
                        colors: VARIABLE,
                        ...THEME_VALUES,
                        name: theme
                    }}
                >
                    {isWeb ? <GlobalStyle /> : null}
                    {children}
                </SCProvider>
            </ThemeContext.Provider>
        </EmotionThemeProvider>
    )
}
