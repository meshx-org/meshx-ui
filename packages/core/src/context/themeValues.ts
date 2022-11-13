export interface ThemeValues {
    colors: Record<string, any>
    fontSizes: number[]
    space: number[]
    lineHeights: Record<string, any>

    accentTextColor: {
        primary: string
        secondary: string
        disabled: string
    }
    textColor: {
        primary: string
        secondary: string
        disabled: string
    }
    stoke: {
        divider: string
        card: string
        surface: string
    }
    spacing: {
        [key: string]: number
    }
    fillColor: {
        accent: string
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

export const DEFAULT_LIGHT: ThemeValues = {
    colors: {
        text: {
            primary: 'rgba(10, 37, 64,1)',
            secondary: 'rgba(10, 37, 64,0.6)',
            disabled: 'rgba(10, 37, 64,0.5)'
        },
        link: {
            // primary: 'rgba(0,0,0,1)',
            // secondary: 'rgba(0,0,0,0.6)',
            // disabled: "rgba(0,0,0,0.5)"
        },
        storke: {
            divider: 'rgba(0,0,0,0.0803)',
            card: 'rgba(0,0,0,0.0578)',
            surface: '#C6C6C8'
        },
        accentText: {
            primary: 'rgb(3, 150, 255)',
            secondary: 'rgb(3, 150, 255)',
            disabled: 'rgb(3, 150, 255)'
        },
        fill: {
            accent: 'rgb(3, 150, 255)',
            solidBackgroundBase: '#F3F3F3',
            solidBackgroundSecondary: '#EEEEEE',
            layerDefault: 'rgba(255, 255, 255, 0.5)',
            layerAlt: 'rgba(255, 255, 255, 1)',
            secondary: 'rgba(0, 0, 0, 0.03)',
            subtle: 'rgba(0, 0, 0, 0.024)'
        }
    },
    fontSizes: [12, 14, 16, 18, 21, 24, 32, 48, 60],
    space: [0, 4, 8, 16, 32, 64, 128, 256],
    lineHeights: {
        body: '150%',
        heading: '125%'
    },

    spacing: {
        sm: 8,
        md: 16,
        lg: 24,
        xl: 32
    },

    stoke: {
        divider: 'rgba(0,0,0,0.0803)',
        card: 'rgba(0,0,0,0.0578)',
        surface: '#C6C6C8'
    },
    accentTextColor: {
        primary: 'rgb(3, 150, 255)',
        secondary: 'rgb(3, 150, 255)',
        disabled: 'rgb(3, 150, 255)'
    },
    textColor: {
        primary: 'rgba(0,0,0,1)',
        secondary: 'rgba(0,0,0,0.6)',
        disabled: 'rgba(0,0,0,0.36)'
    },
    fillColor: {
        accent: 'rgb(3, 150, 255)',
        solidBackgroundBase: '#F3F3F3',
        solidBackgroundSecondary: '#EEEEEE',
        layerDefault: 'rgba(255, 255, 255, 0.5)',
        layerAlt: 'rgba(255, 255, 255, 1)',
        secondary: 'rgba(0, 0, 0, 0.03)',
        subtle: 'rgba(0, 0, 0, 0.024)'
    }
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
            card: 'rgba(0,0,0,0.25)',
            surface: 'rgba(117,117,117,0.4)'
        },
        fill: {
            accent: 'rgb(3, 150, 255)',
            solidBackgroundBase: '#202020',
            solidBackgroundSecondary: '#1C1C1C',
            layerDefault: 'rgba(58, 58, 58, 0.3)',
            layerAlt: 'rgba(255, 255, 255, 0.0538)',
            secondary: 'rgba(255, 255, 255, 0.06)',
            subtle: 'rgba(255, 255, 255, 0.04)'
        }
    },
    fontSizes: [12, 14, 16, 24, 32, 48, 64, 96, 128],
    space: [0, 4, 8, 16, 32, 64, 128, 256],
    lineHeights: {
        body: '150%',
        heading: '125%'
    },

    spacing: {
        sm: 8,
        md: 16,
        lg: 24,
        xl: 32
    },

    stoke: {
        divider: 'rgba(255,255,255,0.0837)',
        card: 'rgba(0,0,0,0.25)',
        surface: 'rgba(117,117,117,0.4)'
    },
    accentTextColor: {
        primary: 'rgb(3, 150, 255)',
        secondary: 'rgb(3, 150, 255)',
        disabled: 'rgb(3, 150, 255)'
    },
    textColor: {
        primary: 'rgba(255,255,255,1)',
        secondary: 'rgba(255,255,255,0.78)',
        disabled: 'rgba(255,255,255,0.36)'
    },
    fillColor: {
        accent: 'rgb(3, 150, 255)',
        solidBackgroundBase: '#202020',
        solidBackgroundSecondary: '#1C1C1C',
        layerDefault: 'rgba(58, 58, 58, 0.3)',
        layerAlt: 'rgba(255, 255, 255, 0.0538)',
        secondary: 'rgba(255, 255, 255, 0.06)',
        subtle: 'rgba(255, 255, 255, 0.04)'
    }
}