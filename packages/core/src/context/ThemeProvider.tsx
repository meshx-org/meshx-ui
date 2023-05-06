import React, { createContext, useContext } from 'react'
import { ThemeProvider as StyledProvider } from 'styled-components'
import type { ThemeContextValue } from './types'
import { THEME_VALUES } from './themeValues'
import { DEFAULT_DARK, DEFAULT_LIGHT, VARIABLE } from './colorSchemes'
import { Platform } from '../platform'
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
    const currentScheme = theme === 'dark' ? DEFAULT_DARK : DEFAULT_LIGHT

    return (
        <ThemeContext.Provider value={{ name: theme, colors: VARIABLE, values: THEME_VALUES }}>
            <StyledProvider
                theme={{
                    darkScheme: DEFAULT_DARK,
                    lightScheme: DEFAULT_LIGHT,
                    colors: VARIABLE,
                    ...THEME_VALUES,
                    name: theme
                }}
            >
                {typeof window !== 'undefined' ? <GlobalStyle /> : null}
                {children}
            </StyledProvider>
        </ThemeContext.Provider>
    )
}
