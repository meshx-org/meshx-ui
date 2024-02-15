import React from 'react'
import { View } from 'react-native'
import { useTheme } from '@meshx/mxui-core'
import { ControlFillProps } from './Fill.types'

export function TextControlFill({ children }: ControlFillProps) {
    const theme = useTheme()

    return <View>{children}</View>
}

export function ControlFill({ children }: ControlFillProps) {
    const theme = useTheme()

    return <View>{children}</View>
}
