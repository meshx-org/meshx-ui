import React from 'react'
import { ColorValue, Platform } from 'react-native'

export interface ThemeValues {
    accent: string
    primaryTextColor: string
    stoke: {
        divider: string
        card: string
        surface: string
    }
    spacing: {
        [key: string]: number
    }
    textVariants: {
        [key: string]: {
            color?: ColorValue
            fontFamily?: string
            fontSize?: number
            fontStyle?: 'normal' | 'italic'
            fontWeight?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900'
            letterSpacing?: number
            lineHeight?: number | undefined
            textDecorationLine?: 'none' | 'underline' | 'line-through' | 'underline line-through' | undefined
            textDecorationStyle?: 'solid' | 'double' | 'dotted' | 'dashed' | undefined
            textDecorationColor?: ColorValue | undefined
            textShadowColor?: ColorValue | undefined
            textShadowOffset?: { width: number; height: number } | undefined
            textShadowRadius?: number | undefined
            textTransform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase' | undefined
        }
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

const textVariants: any = {
    display: {
        // fontFamily: 'SF Pro',
        fontWeight: 'bold',
        fontSize: 68,
        lineHeight: 92
    },
    title: {
        // fontFamily: 'SF Pro',
        fontWeight: 'bold',
        fontSize: 28,
        lineHeight: 36
    },
    subtitle: {
        // fontFamily: 'SF Pro',
        fontWeight: 'bold',
        fontSize: 20,
        lineHeight: 28
    },
    caption: {
        opacity: 0.8,
        fontWeight: '300',
        fontSize: 12,
        lineHeight: 16
    },
    body: {
        fontWeight: '400',
        fontSize: 14,
        lineHeight: 20
    },
    bodyStrong: {
        fontWeight: 'bold',
        fontSize: 14,
        lineHeight: 20
    },
    bodyLarge: {
        // fontFamily: 'SF Pro',
        fontSize: 18,
        lineHeight: 24
    }
}

const DEFAULT_LIGHT: ThemeValues = {
    accent: 'rgb(3, 150, 255)',
    primaryTextColor: 'black',
    spacing: {
        sm: 8,
        md: 16,
        lg: 24,
        xl: 32
    },
    textVariants,
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
    spacing: {
        sm: 8,
        md: 16,
        lg: 24,
        xl: 32
    },
    textVariants,
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
