import React from 'react'
import { Text } from 'react-native'
import { variant, compose, space, color, typography } from 'styled-system'
import { TextBlockProps } from './TextBlock.types'
import { useThemeValues } from '../../context/ThemeProvider'
import { textVariants as variants } from '../../common/constants'

const propStyles = compose(color, space, typography)

const textVariants = variant({ prop: 'variant', variants })

export function TextBlock({ children, ...props }: TextBlockProps) {
    const theme = useThemeValues()

    const propsWithTheme = { theme, color: 'text.primary', ...props }
    const style = { ...textVariants(propsWithTheme), ...propStyles(propsWithTheme) }

    return <Text style={style}>{children}</Text>
}
