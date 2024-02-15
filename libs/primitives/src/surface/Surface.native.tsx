import React from 'react'
import { View, ViewStyle } from 'react-native'
import { variant, space } from 'styled-system'
import { CardStroke } from '../stroke/Stroke'
import { AcrylicFill } from '../fill/Fill'
import { ControlState, useThemeValues } from '@meshx-org/mxui-core'
import { FlyoutSurfaceProps } from './Surface.types'
import { surfaceVariants as variants } from './variants'

const surfaceVariants = variant({ prop: 'variant', variants })

export function FlyoutSurface<C extends React.ElementType>(props: FlyoutSurfaceProps<C>) {
    const theme = useThemeValues()

    const propsWithTheme = { theme, ...props }
    const style: ViewStyle = { ...surfaceVariants(propsWithTheme), ...space(propsWithTheme) }

    const { padding, paddingBottom, paddingLeft, paddingTop, paddingRight, ...outerStyles } = style

    return (
        <View style={outerStyles}>
            <AcrylicFill />
            <CardStroke />
            <View
                    style={{
                        padding,
                        paddingBottom,
                        paddingLeft,
                        paddingTop,
                        paddingRight,
                        borderRadius: 4
                        // shadowColor: 'black',
                        // shadowOpacity: 0.18,
                        // shadowRadius: 64,
                        // shadowOffset: { height: 32, width: 0 }
                    }}
                >
                    {props.children}
                </View>
        </View>
    )
}
