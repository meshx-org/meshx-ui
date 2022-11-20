export interface ThemeValues {
    colors: {
        text: Record<string, any>
        stroke: {
            divider: string
            card: string
            surface: string
        }
        backgrounds: {
            // Used to create `cards` t
            card: {
                default: string
                secondary: string
                tertiary: string
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
            subtle: string
        }
    }
    fontSizes: number[]
    fonts: {
        default: string
        mono: string
    }
    space: number[]
    lineHeights: Record<string, any>
    spacing: {
        [key: string]: number
    }
}

function fontStack(fonts: string[]) {
    return fonts.map((font) => (font.includes(' ') ? `"${font}"` : font)).join(', ')
}

const spacing = {
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32
}

const fonts = {
    default: fontStack([
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'Helvetica',
        'Arial',
        'sans-serif',
        'Apple Color Emoji',
        'Segoe UI Emoji'
    ]),
    mono: fontStack(['SFMono-Regular', 'Consolas', 'Liberation Mono', 'Menlo', 'Courier', 'monospace'])
}

export const DEFAULT_LIGHT: ThemeValues = {
    colors: {
        text: {
            primary: 'rgba(10, 37, 64,1)',
            secondary: 'rgba(10, 37, 64,0.6)',
            disabled: 'rgba(10, 37, 64,0.5)'
        },
        stroke: {
            divider: 'rgba(0,0,0,0.0803)',
            card: 'rgba(0 0 0 / 6%)',
            surface: 'rgba(0 0 0 / 6%)',
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
    fontSizes: [12, 14, 16, 18, 21, 24, 32, 48, 60],
    space: [0, 4, 8, 16, 32, 64, 128, 256],
    lineHeights: {
        body: '150%',
        heading: '125%'
    },
    spacing
}

export const DEFAULT_DARK: ThemeValues = {
    colors: {
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
            divider: 'rgba(255,255,255,0.0837)',
            card: 'rgba(0 0 0 / 10%)',
            surface: 'rgba(0 0 0 / 20%)',
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
                alt: '#FFFFFF0D'
            },
            solid: {
                default: 'hsl(210, 10%, 12%)',
                secondary: 'hsl(210, 10%, 9%)',
                tertiary: '#282828'
            },
            acrylic: {
                default: 'rgba(44, 44, 44, 0.9)'
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
    fontSizes: [12, 14, 16, 18, 21, 24, 32, 48, 60],
    space: [0, 4, 8, 16, 32, 64, 128, 256],
    lineHeights: {
        body: '150%',
        heading: '125%'
    },
    spacing
}
