import React from 'react'
import { Text } from 'react-native'
import { TextBlockProps } from './TextBlock.types'
import { useThemeValues } from '../../../provider/ThemeProvider'

export function TextBlock({ children, variant }: TextBlockProps) {
    const { textVariants, primaryTextColor } = useThemeValues()

    return <Text style={[{ color: primaryTextColor }, textVariants[variant ?? 'body']]}>{children}</Text>
}
