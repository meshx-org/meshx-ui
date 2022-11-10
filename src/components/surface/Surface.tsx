import React from 'react'
import { View, ViewStyle } from 'react-native'
import { variant, space } from 'styled-system'
import { ControlState } from '../../common'
import { useThemeValues } from '../../context/ThemeProvider'
import { ControlStroke } from '../stroke/Stroke'
import { AcrilicFill } from '../fill/Fill'
import { SurfaceProps } from './Surface.types'
import { surfaceVariants as variants } from '../../common/constants'

const surfaceVariants = variant({ prop: 'variant', variants })

export function Surface(props: SurfaceProps) {
    const theme = useThemeValues()

    const propsWithTheme = { theme, ...props }
    const style: ViewStyle = { ...surfaceVariants(propsWithTheme), ...space(propsWithTheme) }

    const { padding, paddingBottom, paddingLeft, paddingTop, paddingRight, ...outerStyles } = style

    return (
        <View style={[outerStyles]}>
            <ControlStroke state={ControlState.Rest} focused={false}>
                <AcrilicFill>
                    <View
                        style={{
                            padding,
                            paddingBottom,
                            paddingLeft,
                            paddingTop,
                            paddingRight,
                            borderRadius: 4,
                            shadowColor: 'black',
                            shadowOpacity: 0.18,
                            shadowRadius: 64,
                            shadowOffset: { height: 32, width: 0 }
                        }}
                    >
                        {props.children}
                    </View>
                </AcrilicFill>
            </ControlStroke>
        </View>
    )
}
