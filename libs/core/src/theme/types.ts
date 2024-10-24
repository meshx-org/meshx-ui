export interface ThemeContextValue {
    name: string
    values: ThemeValues
    colors: ThemeColors<CSSVariable>
}

export type RGBA = [number, number, number, number]
export type CSSVariable = `var(--${string})`

export interface ThemeColors<T> {
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
        // A blue button is used to indicate a neutral action.
        outline: {
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
        well: T
        surface: T
        control: T
    }
    backgrounds: {
        // Used to create `cards` t
        card: {
            default: T
            secondary: T
            tertiary: T
        }

        control: {
            default: T
            secondary: T
            tertiary: T
            disabled: T
        }

        // Used over under dialogs to block them out as inaccessible.
        subtle: {
            default: T
            secondary: T
            disabled: T
        }

        // Used over under dialogs to block them out as inaccessible.
        smoke: {
            default: T
        }

        // Used on background colors of any material to create layering.
        layer: {
            default: T
            alt: T
        }

        // Solid background colors to place layers, cards, or controls on.
        solid: {
            default: T
            secondary: T
            tertiary: T
        }

        acrylic: {
            default: T
        }
    }

    fill: {
        accent: T

        // Used on background colors of any material to create layering.
        layerDefault: T
        layerAlt: T

        // TODO
        secondary: T
    }
}

// Produces a union of dot-delimited keypaths to the string values in a nested object:
export type KeyPaths<O> = {
    [K in keyof O]: K extends string
        ? O[K] extends Record<string, unknown>
            ? `${K}.${KeyPaths<O[K]>}`
            : `${K}`
        : never
}[keyof O]

export type ThemeColorPaths = KeyPaths<ThemeColors<RGBA>>

export interface ThemeValues {
    fontSizes: number[]
    fonts: {
        default: string[]
        mono: string[]
    }
    space: number[] & { sm: number; md: number; base: number; lg: number; xl: number; '2xl': number; '3xl': number }
    lineHeights: Record<string, any>
}

declare module 'styled-components' {
    export interface DefaultTheme extends ThemeValues {
        name: string
        colors: ThemeColors<CSSVariable>
        darkScheme: ThemeColors<RGBA>
        lightScheme: ThemeColors<RGBA>
    }
}
