/**
MIT License

Copyright (c) 2018 GitHub, Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

import type { SystemCssProperties, SystemStyleObject } from '@styled-system/css'
import css from '@styled-system/css'
import type { ThemeColorPaths } from './theme'
import type { ColorProps, BorderColorProps, ShadowProps } from 'styled-system'
import merge from 'deepmerge'

export type BetterCssProperties = {
    [K in keyof SystemCssProperties]: K extends keyof ColorProps
        ? ThemeColorPaths | SystemCssProperties[K]
        : K extends keyof BorderColorProps
        ? ThemeColorPaths | SystemCssProperties[K]
        : SystemCssProperties[K]
}

// Support CSS custom properties in the `sx` prop
export type CSSCustomProperties = {
    [key: `--${string}`]: string | number
}

type CSSSelectorObject = {
    [cssSelector: string]: SystemStyleObject | CSSCustomProperties
}

export type BetterSystemStyleObject = BetterCssProperties | SystemStyleObject | CSSCustomProperties | CSSSelectorObject

export interface SxProp {
    sx?: BetterSystemStyleObject
}

export const sx = (props: SxProp) => css(props.sx)

export { merge }
