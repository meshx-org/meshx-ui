import React from 'react'
import { Platform } from 'react-native'
import { ThemeProvider as StyledProvider, createGlobalStyle } from 'styled-components'
import { ThemeValues, DEFAULT_DARK, DEFAULT_LIGHT } from './themeValues'

export interface Theme {
    name: string
    values: ThemeValues
}

const ThemeContext = React.createContext<Theme>({ name: 'light', values: DEFAULT_LIGHT })

export const useTheme = () => React.useContext(ThemeContext).name
export const useThemeValues = () => React.useContext(ThemeContext).values

interface ThemeProviderProps {
    theme: 'light' | 'dark'
    children: React.ReactNode
}

declare module 'react' {
    interface CSSProperties {
        [key: `--${string}`]: string | number
    }
}

declare module 'styled-components' {
    export interface DefaultTheme {
        name: string,
        values: ThemeValues
    }
}

const GlobalStyle = createGlobalStyle`
    :root {
        --theme-spacing-sm: ${(props) => props.theme.values.spacing.sm}px;
        --theme-spacing-md: ${(props) => props.theme.values.spacing.md}px;
        --theme-spacing-lg: ${(props) => props.theme.values.spacing.lg}px;
        --theme-spacing-xl: ${(props) => props.theme.values.spacing.xl}px;
    }
`

export function ThemeProvider({ theme, children }: ThemeProviderProps) {
    const values = theme === 'dark' ? DEFAULT_DARK : DEFAULT_LIGHT

    const content =
        Platform.OS === 'web' ? (
            <div
                style={{
                    height: '100%',
                    display: 'flex',

                    '--theme-spacing-sm': `${values.spacing.sm}px`,
                    '--theme-spacing-md': `${values.spacing.md}px`,
                    '--theme-spacing-lg': `${values.spacing.lg}px`,
                    '--theme-spacing-xl': `${values.spacing.xl}px`,

                    '--theme-fill-solid-background-base': values.fillColor.solidBackgroundBase,
                    '--theme-fill-solid-background-secondary': values.fillColor.solidBackgroundSecondary,
                    '--theme-fill-layer-default': values.fillColor.layerDefault,
                    '--theme-fill-layer-alt': values.fillColor.layerAlt,
                    '--theme-fill-secondary': values.fillColor.secondary,
                    '--theme-fill-subtle': values.fillColor.subtle,

                    '--theme-text-color-primary': values.textColor.primary,
                    '--theme-text-color-secondary': values.textColor.secondary,
                    '--theme-text-color-disabled': values.textColor.disabled,

                    '--theme-accent-text-color-primary': values.accentTextColor.primary,
                    '--theme-accent-text-color-secondary': values.accentTextColor.secondary,
                    '--theme-accent-text-color-disabled': values.accentTextColor.disabled,

                    '--theme-stroke-card': values.stoke.card,
                    '--theme-stroke-divider': values.stoke.divider,
                    '--theme-stroke-surface': values.stoke.surface
                }}
            >
                {children}
            </div>
        ) : (
            children
        )

    return (
        <ThemeContext.Provider value={{ name: theme, values }}>
            <StyledProvider theme={{ name: theme, values }}>{content}</StyledProvider>
        </ThemeContext.Provider>
    )
}
