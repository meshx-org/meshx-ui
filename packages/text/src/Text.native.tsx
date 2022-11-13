import React from 'react'
import { Text as RNText } from 'react-native'
import { variant, compose, space, color, typography } from 'styled-system'
import { TextProps } from './Text.types'
import { useThemeValues } from '@meshx-org/mxui-core'
import { textVariants as variants } from './variants'

const propStyles = compose(color, space, typography)

const textVariants = variant({ prop: 'variant', variants })

export function Text(props: TextProps) {
    const { children, selectable = false, ...restProps } = props
    const theme = useThemeValues()

    const propsWithTheme = { theme, color: 'text.primary', ...restProps }
    const style = { ...textVariants(propsWithTheme), ...propStyles(propsWithTheme) }

    return <RNText selectable={selectable} style={style}>{children}</RNText>
}
