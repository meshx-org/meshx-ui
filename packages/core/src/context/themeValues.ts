import type { ThemeValues } from './types'

function fontStack(fonts: string[]) {
    return fonts.map((font) => (font.includes(' ') ? `"${font}"` : font)).join(', ')
}

// https://tailwindcss.com/docs/customizing-spacing#default-spacing-scale
const space: ThemeValues['space'] = [
    0, 1, 2, 4, 6, 8, 10, 12, 14, 16, 20, 24, 32, 36, 40, 48, 56, 64, 80, 96
] as ThemeValues['space']

space.sm = space[2]
space.md = space[3]
space.lg = space[5]
space.xl = space[9]
space['2xl'] = space[13]
space['3xl'] = space[17]

const lineHeights = {
    body: '150%',
    heading: '125%'
}

const fontSizes = [12, 14, 16, 18, 21, 24, 32, 48, 60]
const fonts = {
    default: fontStack([
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'Roboto',
        'Helvetica Neue',
        'Noto Sans',
        'Arial',
        'sans-serif',
        'Apple Color Emoji',
        'Segoe UI Emoji',
        'sans-serif'
    ]),
    mono: fontStack(['SFMono-Regular', 'Consolas', 'Liberation Mono', 'Menlo', 'Courier', 'monospace'])
}

export const DEFAULT_LIGHT: ThemeValues = {
    colors: {
        accent: {
            default: 'rgba(3, 150, 255, 1)'
        },
        text: {
            primary: 'rgba(10, 37, 64,1)',
            secondary: 'rgba(10, 37, 64,0.6)',
            disabled: 'rgba(10, 37, 64,0.5)'
        },
        stroke: {
            divider: 'rgba(0,0,0,0.0803)',
            card: 'rgba(0 0 0 / 6%)',
            surface: 'rgba(0 0 0 / 6%)'
        },
        accentText: {
            primary: 'rgb(3, 150, 255)',
            secondary: 'rgb(3, 150, 255)',
            disabled: 'rgb(3, 150, 255)'
        },
        backgrounds: {
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
            }
        },
        fill: {
            accent: 'rgb(3, 150, 255)',
            layerDefault: 'rgba(255, 255, 255, 0.5)',
            layerAlt: 'rgba(255, 255, 255, 1)',
            secondary: 'rgba(0, 0, 0, 0.03)',
            subtle: 'rgba(0, 0, 0, 0.024)'
        }
    },
    fonts,
    fontSizes,
    space,
    lineHeights
}

export const DEFAULT_DARK: ThemeValues = {
    colors: {
        accent: {
            default: 'rgba(3, 150, 255, 1)'
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
            surface: 'rgba(255 255 255 / 18%)'
        },
        backgrounds: {
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
            }
        },
        fill: {
            accent: 'rgb(3, 150, 255)',
            layerDefault: 'rgba(58, 58, 58, 0.3)',
            layerAlt: 'rgba(255, 255, 255, 0.0538)',
            secondary: 'rgba(255, 255, 255, 0.06)',
            subtle: 'rgba(255, 255, 255, 0.04)'
        }
    },
    fonts,
    fontSizes,
    space,
    lineHeights
}
