import React from 'react'
import { Text } from 'react-native'
import { TextBlockProps } from './TextBlock.types'
import { useThemeValues } from '../../context/ThemeProvider'

export function TextBlock({ children, variant }: TextBlockProps) {
    const { textVariants, textColor } = useThemeValues()

    return <Text style={[{ color: textColor.primary }, textVariants[variant ?? 'body']]}>{children}</Text>
}
