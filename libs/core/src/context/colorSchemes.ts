import { CSSVariable, ColorScheme, RGBA } from '../types'

export const DEFAULT_LIGHT: ColorScheme<RGBA> = {
    accent: {
        default: 'rgba(3, 150, 255, 1)'
    },
    button: {
        accent: {
            default: 'rgba(0, 126, 217, 1)',
            secondary: 'rgba(3, 150, 255, 1)',
            tertiary: 'rgba(3, 150, 255, 0.7)'
        },
        outline: {
            default: 'rgba(0, 0, 0, 0.03)',
            secondary: 'rgba(0, 0, 0, 0.05)',
            tertiary: 'rgba(0, 0, 0, 0)'
        },
        warning: {
            default: 'rgba(245, 166, 35, 1)', // #f5a623
            secondary: 'rgba(255, 0, 255, 1)',
            tertiary: 'rgba(255, 0, 255, 1)'
        },
        danger: {
            default: 'rgba(238, 0, 0, 1)', // #e00
            secondary: 'rgba(255, 0, 255, 1)',
            tertiary: 'rgba(255, 0, 255, 1)'
        }
    },
    text: {
        primary: 'rgba(10, 37, 64,1)',
        secondary: 'rgba(10, 37, 64,0.6)',
        disabled: 'rgba(10, 37, 64,0.5)'
    },
    stroke: {
        divider: 'rgba(0, 0, 0, 0.08)',
        card: 'rgba(0, 0, 0, 0.09)',
        surface: 'rgba(0, 0, 0, 0.15)',
        control: 'rgba(0, 0, 0, 0.45)'
    },
    accentText: {
        primary: 'rgb(3, 150, 255)',
        secondary: 'rgb(3, 150, 255)',
        disabled: 'rgb(3, 150, 255)'
    },
    backgrounds: {
        control: {
            default: 'hsla(210, 10%, 100%, 0.7)',
            secondary: 'rgba(249, 249, 249, 0.5)',
            tertiary: 'rgba(249, 249, 249, 0.3)',
            disabled: 'hsla(210, 10%, 100%, 0.04)'
        },
        card: {
            default: 'rgba(255,255,255,0.7)',
            secondary: 'rgba(246,246,246,0.5)',
            tertiary: 'rgba(255,255,255,1)'
        },
        smoke: {
            default: 'rgba(0,0,0,0.3)'
        },
        layer: {
            default: 'rgba(255,255,255,0.5)',
            alt: 'rgba(255,255,255,1)'
        },
        solid: {
            default: 'hsl(216, 38%, 97%)',
            secondary: 'hsl(216, 38%, 95%)',
            tertiary: '#F9F9F9FF'
        },
        acrylic: {
            default: 'rgba(252, 252, 252, 0.85)'
        },
        subtle: {
            default: 'rgb(0, 0, 0, 0.0373)',
            secondary: 'rgba(0, 0, 0, 0.0241)',
            disabled: 'rgb(0, 0, 0, 0)'
        }
    },
    fill: {
        accent: 'rgb(3, 150, 255)',
        layerDefault: 'rgba(255, 255, 255, 0.5)',
        layerAlt: 'rgba(255, 255, 255, 1)',
        secondary: 'rgba(0, 0, 0, 0.03)'
    }
}

export const DEFAULT_DARK: ColorScheme<RGBA> = {
    accent: {
        default: 'rgba(127, 212, 255, 1)'
    },
    button: {
        accent: {
            default: 'rgba(3, 150, 255, .4)',
            secondary: 'rgba(3, 150, 255, .5)',
            tertiary: 'rgba(3, 150, 255, .2)'
        },
        outline: {
            default: 'rgba(255, 255, 255, 0.061)',
            secondary: 'rgba(255, 255, 255, 0.084)',
            tertiary: 'rgba(255, 255, 255, 0.033)'
        },
        warning: {
            default: 'rgba(245, 166, 35, .4)',
            secondary: 'rgba(245, 166, 35, .5)',
            tertiary: 'rgba(245, 166, 35, .2)'
        },
        danger: {
            default: 'rgba(238, 0, 0, .4)',
            secondary: 'rgba(238, 0, 0, .5)',
            tertiary: 'rgba(238, 0, 0, .2)'
        }
    },
    text: {
        primary: 'rgba(255,255,255,1)',
        secondary: 'rgba(255,255,255,0.6)',
        disabled: 'rgba(255,255,255,0.5)'
    },
    accentText: {
        primary: 'rgb(3, 150, 255)',
        secondary: 'rgb(3, 150, 255)',
        disabled: 'rgb(3, 150, 255)'
    },
    stroke: {
        divider: 'rgba(255, 255, 255, 0.0837)',
        card: 'rgba(255 255 255 / 14%)',
        surface: 'rgba(255 255 255 / 18%)',
        control: 'rgba(255, 255, 255, 0.54)'
    },
    backgrounds: {
        control: {
            default: 'hsla(210, 10%, 100%, 0.061)',
            secondary: 'hsla(210, 10%, 100%, 0.084)',
            tertiary: 'hsla(210, 10%, 100%, 0.033)',
            disabled: 'rgba(255, 255, 255, 0.04)'
        },
        card: {
            default: '#FFFFFF0D',
            secondary: '#FFFFFF08',
            tertiary: '#FFFFFF12'
        },
        smoke: {
            default: 'rgba(0,0,0,0.3)'
        },
        layer: {
            default: 'hsla(210, 10%, 20%, 0.3)',
            alt: 'hsla(0, 0%, 100%, 0.050980392156862744)'
        },
        solid: {
            default: 'hsl(210, 10%, 6%)',
            secondary: 'hsl(210, 10%, 9%)',
            tertiary: 'hsl(210, 10%, 16%)'
        },
        acrylic: {
            default: 'hsla(210, 10%, 17%, 0.9)'
        },
        subtle: {
            default: 'rgba(255, 255, 255, 0.0637)',
            secondary: 'rgba(255, 255, 255, 0.0326)',
            disabled: 'rgba(255, 255, 255, 0.04)'
        }
    },
    fill: {
        accent: 'rgb(3, 150, 255)',
        layerDefault: 'rgba(58, 58, 58, 0.3)',
        layerAlt: 'rgba(255, 255, 255, 0.0538)',
        secondary: 'rgba(255, 255, 255, 0.06)'
    }
}

// Backgrounds Colors

export const VARIABLE: ColorScheme<CSSVariable> = {
    accent: {
        default: 'var(--theme-accent-default)'
    },
    // Button Accent (oveeride)
    button: {
        accent: {
            default: 'var(--theme-button-accent-default)',
            secondary: 'var(--theme-button-accent-secondary)',
            tertiary: 'var(--theme-button-accent-tertiary)'
        },
        outline: {
            default: 'var(--todo)',
            secondary: 'var(--todo)',
            tertiary: 'var(--todo)'
        },
        warning: {
            default: 'var(--theme-button-warning-default)',
            secondary: 'var(--theme-button-warning-secondary)',
            tertiary: 'var(--theme-button-warning-tertiary)'
        },
        danger: {
            default: 'var(--theme-button-danger-default)',
            secondary: 'var(--theme-button-danger-secondary)',
            tertiary: 'var(--theme-button-danger-tertiary)'
        }
    },
    // Text Colors
    text: {
        primary: 'var(--theme-color-text-primary)',
        secondary: 'var(--theme-color-text-secondary)',
        disabled: 'var(--theme-color-text-disabled)'
    },
    // Accent Text Colors
    accentText: {
        primary: '--theme-color-accent-text-primary',
        secondary: 'var(--theme-color-accent-text-secondary)',
        disabled: 'var(--theme-color-accent-text-disabled'
    },
    // Stroke Colors
    stroke: {
        divider: 'var(--theme-color-stroke-divider)',
        card: 'var(--theme-color-stroke-card)',
        surface: 'var(--theme-color-stroke-surface)',
        control: 'var(--theme-color-stroke-control)'
    },
    backgrounds: {
        control: {
            default: 'var(--theme-background-control-default)',
            secondary: 'var(--theme-background-control-secondary)',
            tertiary: 'var( --theme-background-control-tertiary)',
            disabled: 'var(--theme-background-control-disabled)'
        },
        card: {
            default: 'var(--theme-background-card-default)',
            secondary: 'var(--theme-background-card-secondary)',
            tertiary: 'var(--theme-background-card-tertiary)'
        },
        smoke: {
            default: 'var( --theme-background-smoke-default)'
        },
        layer: {
            default: 'var(--theme-background-layer-default)',
            alt: 'var(--theme-background-layer-alt)'
        },
        solid: {
            default: 'var(--theme-background-solid-default)',
            secondary: 'var(--theme-background-solid-secondary)',
            tertiary: 'var(--theme-background-solid-tertiary)'
        },
        acrylic: {
            default: 'var(--theme-background-acrylic-default)'
        },
        subtle: {
            default: 'var(--theme-background-subtle-default)',
            secondary: 'var(--theme-background-subtle-secondary)',
            disabled: 'var(--theme-background-subtle-disabled)'
        }
    },
    fill: {
        accent: 'var(--todo)',
        layerDefault: 'var(--todo)',
        layerAlt: 'var(--todo)',
        secondary: 'var(--todo)'
    }
}
