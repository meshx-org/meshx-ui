import React from 'react'
import { View } from 'react-native'
import { useTheme } from '@meshx-org/mxui-core'
import { ControlFillProps } from './Fill.types'

export function TextControlFill({ children, state }: ControlFillProps) {
    const theme = useTheme()

    return <View>{children}</View>
}

export function ControlFill({ children, state }: ControlFillProps) {
    const theme = useTheme()

    return <View>{children}</View>
}
