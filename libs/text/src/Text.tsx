import React from 'react'
import { TextProps } from './Text.types'
import { textVariants } from './variants'
import { sx } from '@meshx/mxui-core'

export function Text<C extends React.ElementType = 'span'>(props: TextProps<C>) {
    const { selectable = true, as: Component = 'span', variant = 'body', ...restProps } = props

    const st = {
        ...props.sx,
        ...textVariants[variant],
        userSelect: selectable ? 'auto' : 'none'
    }
    console.log(st)

    return (
        <Component
            css={sx({
                sx: st
            })}
            {...restProps}
        />
    )
}
