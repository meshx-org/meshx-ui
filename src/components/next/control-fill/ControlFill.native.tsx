import React from 'react'
import { View } from 'react-native'
import { useTheme } from '../../../provider/ThemeProvider'
import { ControlFillProps } from './ControlFill.types'

export function ControlFill({ children, state }: ControlFillProps) {
    const theme = useTheme()

    return <View>{children}</View>
}

