import React, { createContext, useContext } from 'react'
import { ThemeProvider as StyledProvider, createGlobalStyle } from 'styled-components'
import type { ThemeContextValue, ThemeValues } from './types'
import { DEFAULT_DARK, DEFAULT_LIGHT } from './themeValues'
import { Platform } from '../platform'

const ThemeContext = createContext<ThemeContextValue>({ name: 'light', values: DEFAULT_LIGHT })

export const useTheme = () => useContext(ThemeContext).name
export const useThemeValues = () => useContext(ThemeContext).values

interface ThemeProviderProps {
    theme: 'light' | 'dark'
    children: React.ReactNode
}

declare module 'styled-components' {
    export interface DefaultTheme extends ThemeValues {
        name: string
    }
}

const GlobalStyle = createGlobalStyle`
    :root {
        color-scheme: ${({ theme }) => theme.name};
        
        // Text Colors 
        --theme-color-text-primary: ${({ theme }) => theme.colors.text.primary};
        --theme-color-text-secondary: ${({ theme }) => theme.colors.text.secondary};
        --theme-color-text-disabled: ${({ theme }) => theme.colors.text.disabled};

        // Accent Text Colors 
        --theme-color-accent-text-primary: ${({ theme }) => theme.colors.accentText.primary};
        --theme-color-accent-text-secondary: ${({ theme }) => theme.colors.accentText.secondary};
        --theme-color-accent-text-disabled: ${({ theme }) => theme.colors.accentText.disabled};
        
        // Stroke Colors
        --theme-color-stroke-card: ${({ theme }) => theme.colors.stroke.card};
        --theme-color-stroke-divider: ${({ theme }) => theme.colors.stroke.divider};
        --theme-color-stroke-surface: ${({ theme }) => theme.colors.stroke.surface};

        // Backgrounds Colors
        --theme-background-card-default: ${({ theme }) => theme.colors.backgrounds.card.default};
        --theme-background-card-secondary: ${({ theme }) => theme.colors.backgrounds.card.secondary};
        --theme-background-card-tertiary: ${({ theme }) => theme.colors.backgrounds.card.tertiary};

        --theme-background-solid-default: ${({ theme }) => theme.colors.backgrounds.solid.default};
        --theme-background-solid-secondary: ${({ theme }) => theme.colors.backgrounds.solid.secondary};
        --theme-background-solid-tertiary: ${({ theme }) => theme.colors.backgrounds.solid.tertiary};

        --theme-background-layer-default: ${({ theme }) => theme.colors.backgrounds.layer.default};
        --theme-background-layer-alt: ${({ theme }) => theme.colors.backgrounds.layer.alt};

        --theme-background-smoke-default: ${({ theme }) => theme.colors.backgrounds.smoke.default};
        --theme-background-acrylic-default: ${({ theme }) => theme.colors.backgrounds.acrylic.default};

        // Fonts
        --theme-font-default: ${({ theme }) => theme.fonts.default};
        --theme-font-mono: ${({ theme }) => theme.fonts.mono};

        // Font sizes
        --theme-font-size-0: ${({ theme }) => theme.fontSizes[0]}px;
        --theme-font-size-1: ${({ theme }) => theme.fontSizes[1]}px;
        --theme-font-size-2: ${({ theme }) => theme.fontSizes[2]}px;
        --theme-font-size-3: ${({ theme }) => theme.fontSizes[3]}px;
        --theme-font-size-4: ${({ theme }) => theme.fontSizes[4]}px;
        --theme-font-size-5: ${({ theme }) => theme.fontSizes[5]}px;
        --theme-font-size-6: ${({ theme }) => theme.fontSizes[6]}px;
        --theme-font-size-7: ${({ theme }) => theme.fontSizes[7]}px;
        --theme-font-size-8: ${({ theme }) => theme.fontSizes[8]}px;

        // Space
        --theme-space-0: ${({ theme }) => theme.space[0]}px;
        --theme-space-1: ${({ theme }) => theme.space[1]}px;
        --theme-space-2: ${({ theme }) => theme.space[2]}px;
        --theme-space-3: ${({ theme }) => theme.space[3]}px;
        --theme-space-4: ${({ theme }) => theme.space[4]}px;
        --theme-space-5: ${({ theme }) => theme.space[5]}px;
        --theme-space-6: ${({ theme }) => theme.space[6]}px;
        --theme-space-7: ${({ theme }) => theme.space[7]}px;
        --theme-space-8: ${({ theme }) => theme.space[8]}px;
        --theme-space-9: ${({ theme }) => theme.space[9]}px;
        --theme-space-10: ${({ theme }) => theme.space[10]}px;
        --theme-space-11: ${({ theme }) => theme.space[11]}px;
        --theme-space-12: ${({ theme }) => theme.space[12]}px;
        --theme-space-13: ${({ theme }) => theme.space[13]}px;
        --theme-space-14: ${({ theme }) => theme.space[14]}px;

        // Space alias
        --theme-spacing-sm: ${(props) => props.theme.space.sm}px;
        --theme-spacing-md: ${(props) => props.theme.space.md}px;
        --theme-spacing-lg: ${(props) => props.theme.space.lg}px;
        --theme-spacing-xl: ${(props) => props.theme.space.xl}px;
        --theme-spacing-2xl: ${(props) => props.theme.space['2xl']}px;
        --theme-spacing-3xl: ${(props) => props.theme.space['3xl']}px;
    }
`

export function ThemeProvider({ theme, children }: ThemeProviderProps) {
    const values = theme === 'dark' ? DEFAULT_DARK : DEFAULT_LIGHT

    return (
        <ThemeContext.Provider value={{ name: theme, values }}>
            <StyledProvider theme={{ ...values, name: theme }}>
                {Platform.OS === 'web' ? <GlobalStyle /> : null}
                {children}
            </StyledProvider>
        </ThemeContext.Provider>
    )
}
