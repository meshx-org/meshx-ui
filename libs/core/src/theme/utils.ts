import { RGBA } from './types'

export function tailwindRgb([r, g, b, a]: RGBA) {
    return `${r}, ${g}, ${b}`
}

export function rgba([r, g, b, a]: RGBA) {
    return `rgba(${r}, ${g}, ${b}, ${a})`
}

export function fontStack(fonts: string[]) {
    return fonts.map((font) => (font.includes(' ') ? `"${font}"` : font)).join(', ')
}
