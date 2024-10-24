import type { ThemeValues } from './types'

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
    default: [
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
    ],
    mono: ['SFMono-Regular', 'Consolas', 'Liberation Mono', 'Menlo', 'Courier', 'monospace']
}

export const THEME_VALUES: ThemeValues = {
    fonts,
    fontSizes,
    space,
    lineHeights
}
