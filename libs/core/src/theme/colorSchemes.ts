import { CSSVariable, ThemeColors, RGBA } from './types'

export const DEFAULT_LIGHT: ThemeColors<RGBA> = {
    accent: {
        default: [3, 150, 255, 1]
    },
    button: {
        accent: {
            default: [0, 126, 217, 1],
            secondary: [3, 150, 255, 1],
            tertiary: [3, 150, 255, 0.7]
        },
        outline: {
            default: [0, 0, 0, 0.03],
            secondary: [0, 0, 0, 0.05],
            tertiary: [0, 0, 0, 0.05]
        },
        warning: {
            default: [245, 166, 35, 1],
            secondary: [255, 0, 255, 1],
            tertiary: [255, 0, 255, 1]
        },
        danger: {
            default: [238, 0, 0, 1],
            secondary: [255, 0, 255, 1],
            tertiary: [255, 0, 255, 1]
        }
    },
    text: {
        primary: [10, 37, 64, 1],
        secondary: [10, 37, 64, 0.6],
        disabled: [10, 37, 64, 0.5]
    },
    stroke: {
        divider: [0, 0, 0, 0.08],
        card: [0, 0, 0, 0.09],
        well: [0, 0, 0, 0.06],
        surface: [0, 0, 0, 0.15],
        control: [0, 0, 0, 0.45]
    },
    accentText: {
        primary: [3, 150, 255, 1],
        secondary: [3, 150, 255, 1],
        disabled: [3, 150, 255, 1]
    },
    backgrounds: {
        control: {
            default: [255, 255, 255, 0.7],
            secondary: [249, 249, 249, 0.5],
            tertiary: [249, 249, 249, 0.3],
            disabled: [255, 255, 255, 0.04]
        },
        card: {
            default: [255, 255, 255, 0.7],
            secondary: [246, 246, 246, 0.5],
            tertiary: [255, 255, 255, 1]
        },
        smoke: {
            default: [0, 0, 0, 0.3]
        },
        layer: {
            default: [255, 255, 255, 0.5],
            alt: [255, 255, 255, 1]
        },
        solid: {
            default: [244, 247, 250, 1],
            secondary: [237, 241, 247, 1],
            tertiary: [249, 249, 249, 1]
        },
        acrylic: {
            default: [252, 252, 252, 0.85]
        },
        subtle: {
            default: [0, 0, 0, 0.0373],
            secondary: [0, 0, 0, 0.0241],
            disabled: [0, 0, 0, 0]
        }
    },
    fill: {
        accent: [3, 150, 255, 1],
        layerDefault: [255, 255, 255, 0.5],
        layerAlt: [255, 255, 255, 1],
        secondary: [0, 0, 0, 0.03]
    }
}

export const DEFAULT_DARK: ThemeColors<RGBA> = {
    accent: {
        default: [127, 212, 255, 1]
    },
    button: {
        accent: {
            default: [3, 150, 255, 0.4],
            secondary: [3, 150, 255, 0.5],
            tertiary: [3, 150, 255, 0.2]
        },
        outline: {
            default: [255, 255, 255, 0.061],
            secondary: [255, 255, 255, 0.084],
            tertiary: [255, 255, 255, 0.033]
        },
        warning: {
            default: [245, 166, 35, 0.4],
            secondary: [245, 166, 35, 0.5],
            tertiary: [245, 166, 35, 0.2]
        },
        danger: {
            default: [238, 0, 0, 0.4],
            secondary: [238, 0, 0, 0.5],
            tertiary: [238, 0, 0, 0.2]
        }
    },
    text: {
        primary: [255, 255, 255, 1],
        secondary: [255, 255, 255, 0.6],
        disabled: [255, 255, 255, 0.5]
    },
    accentText: {
        primary: [3, 150, 255, 1],
        secondary: [3, 150, 255, 1],
        disabled: [3, 150, 255, 1]
    },
    stroke: {
        divider: [255, 255, 255, 0.0837],
        card: [255, 255, 255, 0.14],
        well: [0, 0, 0, 0.1],
        surface: [255, 255, 255, 0.18],
        control: [255, 255, 255, 0.54]
    },
    backgrounds: {
        control: {
            default: [255, 255, 255, 0.061],
            secondary: [255, 255, 255, 0.084],
            tertiary: [255, 255, 255, 0.033],
            disabled: [255, 255, 255, 0.04]
        },
        card: {
            default: [255, 255, 255, 0.051],
            secondary: [255, 255, 255, 0.031],
            tertiary: [255, 255, 255, 0.0705]
        },
        smoke: {
            default: [0, 0, 0, 0.3]
        },
        layer: {
            default: [45, 50, 56, 0.3],
            alt: [255, 255, 255, 0.051]
        },
        solid: {
            default: [14, 15, 17, 1],
            secondary: [21, 23, 25, 1],
            tertiary: [37, 41, 45, 1]
        },
        acrylic: {
            default: [44, 44, 44, 0.7]
        },
        subtle: {
            default: [255, 255, 255, 0.0637],
            secondary: [255, 255, 255, 0.0326],
            disabled: [255, 255, 255, 0.04]
        }
    },
    fill: {
        accent: [3, 150, 255, 1],
        layerDefault: [58, 58, 58, 0.3],
        layerAlt: [255, 255, 255, 0.0538],
        secondary: [255, 255, 255, 0.06]
    }
}

// Backgrounds Colors

export const VARIABLE: ThemeColors<CSSVariable> = {
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
        primary: 'var(--theme-text-primary)',
        secondary: 'var(--theme-text-secondary)',
        disabled: 'var(--theme-text-disabled)'
    },
    // Accent Text Colors
    accentText: {
        primary: 'var(--theme-accent-text-primary)',
        secondary: 'var(--theme-accent-text-secondary)',
        disabled: 'var(--theme-accent-text-disabled'
    },
    // Stroke Colors
    stroke: {
        divider: 'var(--theme-stroke-divider)',
        card: 'var(--theme-stroke-card)',
        well: 'var(--theme-stroke-well)',
        surface: 'var(--theme-stroke-surface)',
        control: 'var(--theme-stroke-control)'
    },
    backgrounds: {
        control: {
            default: 'var(--theme-control-default)',
            secondary: 'var(--theme-control-secondary)',
            tertiary: 'var(--theme-control-tertiary)',
            disabled: 'var(--theme-control-disabled)'
        },
        card: {
            default: 'var(--theme-card-default)',
            secondary: 'var(--theme-card-secondary)',
            tertiary: 'var(--theme-card-tertiary)'
        },
        smoke: {
            default: 'var(--theme-smoke-default)'
        },
        layer: {
            default: 'var(--theme-layer-default)',
            alt: 'var(--theme-layer-alt)'
        },
        solid: {
            default: 'var(--theme-solid-default)',
            secondary: 'var(--theme-solid-secondary)',
            tertiary: 'var(--theme-solid-tertiary)'
        },
        acrylic: {
            default: 'var(--theme-acrylic-default)'
        },
        subtle: {
            default: 'var(--theme-subtle-default)',
            secondary: 'var(--theme-subtle-secondary)',
            disabled: 'var(--theme-subtle-disabled)'
        }
    },
    fill: {
        accent: 'var(--todo)',
        layerDefault: 'var(--todo)',
        layerAlt: 'var(--todo)',
        secondary: 'var(--todo)'
    }
}
