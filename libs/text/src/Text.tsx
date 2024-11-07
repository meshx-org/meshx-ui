import React from 'react'
import { TextProps } from './Text.types'
import { textVariants } from './variants'
import { sx } from '@meshx/mxui-core'

function Text<C extends React.ElementType = 'span'>(props: TextProps<C>) {
    const { selectable = true, as: Component = 'span', variant = 'body', sx: styles, ...restProps } = props

    return (
        <Component
            css={sx({
                sx: {
                    ...styles,
                    ...textVariants[variant],
                    userSelect: selectable ? 'auto' : 'none'
                }
            })}
            {...restProps}
        />
    )
}

const _Text = React.forwardRef(Text)
export { _Text as Text }
