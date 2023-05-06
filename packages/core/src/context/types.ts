export interface ThemeContextValue {
    name: string
    values: ThemeValues
    colors: ColorScheme<CSSVariable>
}

export type RGB = `rgb(${string})`
export type RGBA = `rgba(${string})`
export type HEX = `#${string}`
export type HSL = `hsl(${string})`
export type HSLA = `hsla(${string})`
export type Color = RGB | RGBA | HEX | HSL | HSLA
export type CSSVariable = `var(--${string})`

export interface ColorScheme<T> {
    accent: {
        default: T
    }
    accentText: Record<string, any>
    text: {
        primary: T
        secondary: T
        disabled: T
    }
    button: {
        // An accent button is used to indicate a positive action.
        accent: {
            default: T
            secondary: T
            tertiary: T
        }
        // A yellow button is used to indicate a dangerous action.
        warning: {
            default: T
            secondary: T
            tertiary: T
        }
        // A red button is used to indicate a destructive action.
        danger: {
            default: T
            secondary: T
            tertiary: T
        }
    }
    stroke: {
        divider: T
        card: T
        surface: T
        control: T
    }
    backgrounds: {
        // Used to create `cards` t
        card: {
            default: string
            secondary: string
            tertiary: string
        }

        control: {
            default: string
            secondary: string
            tertiary: string
            disabled: string
        }

        // Used over under dialogs to block them out as inaccessible.
        subtle: {
            default: string
            secondary: string
            disabled: string
        }

        // Used over under dialogs to block them out as inaccessible.
        smoke: {
            default: string
        }

        // Used on background colors of any material to create layering.
        layer: {
            default: string
            alt: string
        }

        // Solid background colors to place layers, cards, or controls on.
        solid: {
            default: string
            secondary: string
            tertiary: string
        }

        acrylic: {
            default: string
        }
    }

    fill: {
        accent: string

        // Used on background colors of any material to create layering.
        layerDefault: string
        layerAlt: string

        // TODO
        secondary: string
    }
}

export interface ThemeValues {
    fontSizes: number[]
    fonts: {
        default: string
        mono: string
    }
    space: number[] & { sm: number; md: number; base: number; lg: number; xl: number; '2xl': number; '3xl': number }
    lineHeights: Record<string, any>
}

declare module 'styled-components' {
    export interface DefaultTheme extends ThemeValues {
        name: string
        colors: ColorScheme<CSSVariable>
        darkScheme: ColorScheme<Color>
        lightScheme: ColorScheme<Color>
    }
}
