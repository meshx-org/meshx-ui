import React from 'react'
import { View as RNView } from 'react-native'
import styled from 'styled-components/native'
import { compose, space, color, layout, flexbox, border, position, background } from 'styled-system'
import { useThemeValues } from '@meshx-org/mxui-core'
import { BoxProps } from './Box.types'

const StyledView = styled.View`
    background-color: papayawhip;
`

const propStyles = compose(space, color, layout, flexbox, border, position, background)

export function Box({ children, ...props }: BoxProps) {
    const theme = useThemeValues()

    const propsWithTheme = { theme, ...props }
    const style = propStyles(propsWithTheme)

    return <RNView style={{ ...style }}>{children}</RNView>
}
