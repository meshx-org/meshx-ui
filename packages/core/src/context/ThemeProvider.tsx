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
    export interface DefaultTheme extends ThemeValues {
        name: string
    }
}

const GlobalStyle = createGlobalStyle`
    :root {
        --theme-spacing-sm: ${(props) => props.theme.spacing.sm}px;
        --theme-spacing-md: ${(props) => props.theme.spacing.md}px;
        --theme-spacing-lg: ${(props) => props.theme.spacing.lg}px;
        --theme-spacing-xl: ${(props) => props.theme.spacing.xl}px;

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

                    '--theme-fill-layer-default': values.colors.fill.layerDefault,
                    '--theme-fill-layer-alt': values.colors.fill.layerAlt,
                    '--theme-fill-secondary': values.colors.fill.secondary,
                    '--theme-fill-subtle': values.colors.fill.subtle, 
                }}
            >
                {children}
            </div>
        ) : (
            children
        )

    return (
        <ThemeContext.Provider value={{ name: theme, values }}>
            <StyledProvider theme={{ ...values, name: theme }}>
                {Platform.OS === 'web' ? (<GlobalStyle />) : null}
                {content}
            </StyledProvider>
        </ThemeContext.Provider>
    )
}
