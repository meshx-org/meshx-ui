import React from 'react'
import { variant, compose, space, color, typography } from 'styled-system'
import { TextProps } from './Text.types'
import { textVariants as variants } from './variants'
import styled from 'styled-components'

const textVariants = variant({ prop: 'variant', variants })

const TextBase = styled.p<TextProps>`
    ${color}
    ${space}
    ${typography}
    ${textVariants}

    user-select: ${(props) => (props.selectable ? 'auto' : 'none')};
`

export function Text(props: TextProps) {
    const { selectable = false, ...restProps } = props

    return <TextBase selectable={selectable} {...restProps as any} />
}
