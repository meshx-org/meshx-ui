import React from 'react'
import { View } from 'react-native'
import { compose, space, color,shadow, layout, border, position, background } from 'styled-system'
import { useThemeValues } from '@meshx-org/mxui-core'
import { BoxProps } from './Box.types'

const propStyles = compose(space, color, layout, border, position, background, shadow)

export function Box({ children, ...props }: BoxProps) {
    const theme = useThemeValues()

    const propsWithTheme = { theme, ...props }
    const style = propStyles(propsWithTheme)

    return <View style={{...style}}>{children}</View>
}
