import React from 'react'
import { variant, space, color, typography } from 'styled-system'
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
    const { selectable = false, as, ...restProps } = props

    return <TextBase as={as} selectable={selectable} color='text.primary' {...restProps as any} />
}
