export interface ThemeContextValue {
    name: string
    values: ThemeValues
    colors: ColorScheme
}

type RGB = `rgb(${string})`
type RGBA = `rgba(${string})`
type HEX = `#${string}`
type HSL = `hsl(${string})`
type HSLA = `hsla(${string})`

export interface ColorScheme {
    accent: {
        default: RGBA
    }
    text: {
        primary: RGBA
        secondary: RGBA
        disabled: RGBA
    }
    stroke: {
        divider: RGBA
        card: RGBA
        surface: RGBA
    }
    backgrounds: {
        // Used to create `cards` t
        card: {
            default: string
            secondary: string
            tertiary: string
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
    accentText: Record<string, any>
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
        colors: ColorScheme
        darkScheme: ColorScheme
        lightScheme: ColorScheme
    }
}
