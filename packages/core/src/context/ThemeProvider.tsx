import React, { createContext, useContext } from 'react'
import { ThemeProvider as SCProvider } from 'styled-components'
import type { ThemeContextValue } from '../types'
import { THEME_VALUES } from './themeValues'
import { DEFAULT_DARK, DEFAULT_LIGHT, VARIABLE } from './colorSchemes'
import { GlobalStyle } from './globalStyles'

const ThemeContext = createContext<ThemeContextValue>({ name: 'light', values: THEME_VALUES, colors: VARIABLE })

export const useTheme = () => useContext(ThemeContext).name
export const useThemeValues = () => useContext(ThemeContext).values
export const useThemeColors = () => useContext(ThemeContext).colors

interface ThemeProviderProps {
    theme: 'light' | 'dark'
    children: React.ReactNode
}

export function ThemeProvider({ theme, children }: ThemeProviderProps) {
    // TODO: detect native platform
    const isWeb = true

    return (
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
    )
}
