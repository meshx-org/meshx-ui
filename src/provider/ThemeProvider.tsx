import React from 'react'
import { Platform } from 'react-native'

export interface ThemeValues {
    accent: string
    primaryTextColor: string
    stoke: {
        divider: string
        card: string
        surface: string
    }
    fillColor: {
        // Solid background colors to place layers, cards, or controls on.
        solidBackgroundBase: string
        solidBackgroundSecondary: string

        // Used on background colors of any material to create layering.
        layerDefault: string
        layerAlt: string

        // TODO
        secondary: string
        subtle: string
    }
}

export interface Theme {
    name: string
    values: ThemeValues
}

const DEFAULT_LIGHT: ThemeValues = {
    accent: 'rgb(3, 150, 255)',
    primaryTextColor: 'black',
    stoke: {
        divider: 'rgba(0,0,0,0.0803)',
        card: 'rgba(0,0,0,0.0578)',
        surface: '#C6C6C8'
    },
    fillColor: {
        solidBackgroundBase: '#F3F3F3',
        solidBackgroundSecondary: '#EEEEEE',
        layerDefault: 'rgba(255, 255, 255, 0.5)',
        layerAlt: 'rgba(255, 255, 255, 1)',
        secondary: 'rgba(0, 0, 0, 0.03)',
        subtle: 'rgba(0, 0, 0, 0.024)'
    }
}

const DEFAULT_DARK: ThemeValues = {
    accent: 'rgb(3, 150, 255)',
    primaryTextColor: 'white',
    stoke: {
        divider: 'rgba(255,255,255,0.0837)',
        card: 'rgba(0,0,0,0.25)',
        surface: 'rgba(117,117,117,0.4)'
    },
    fillColor: {
        solidBackgroundBase: '#202020',
        solidBackgroundSecondary: '#1C1C1C',
        layerDefault: 'rgba(58, 58, 58, 0.3)',
        layerAlt: 'rgba(255, 255, 255, 0.0538)',
        secondary: 'rgba(255, 255, 255, 0.06)',
        subtle: 'rgba(255, 255, 255, 0.04)'
    }
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

export const ThemeProvider = ({ theme, children }: ThemeProviderProps) => {
    const values = theme === 'dark' ? DEFAULT_DARK : DEFAULT_LIGHT
    const content =
        Platform.OS === 'web' ? (
            <div
                style={{
                    height: '100%',
                    display: 'flex',
                    '--theme-fill-solid-background-base': values.fillColor.solidBackgroundBase,
                    '--theme-fill-solid-background-secondary': values.fillColor.solidBackgroundSecondary,
                    '--theme-fill-layer-default': values.fillColor.layerDefault,
                    '--theme-fill-layer-alt': values.fillColor.layerAlt,
                    '--theme-fill-secondary': values.fillColor.secondary,
                    '--theme-fill-subtle': values.fillColor.subtle,

                    '--theme-accent': values.primaryTextColor,
                    '--theme-primary-text-color': values.primaryTextColor,

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

    return <ThemeContext.Provider value={{ name: theme, values }}>{content}</ThemeContext.Provider>
}
