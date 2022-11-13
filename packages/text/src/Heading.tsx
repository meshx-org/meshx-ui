import React from 'react'
import { variant, space, color, typography } from 'styled-system'
import { HeadingProps } from './Text.types'
import { headingVariants } from './variants'
import styled from 'styled-components'

const HeadingBase = styled.h1<HeadingProps>`
    ${color}
    ${space}
    ${typography}
    ${variant({ prop: 'variant', variants: headingVariants })}

    display: block;
    user-select: ${(props) => (props.selectable ? 'auto' : 'none')};
`

const asMapping = {
    display1: 'h1',
    display2: 'h1',
    heading1: 'h1',
    heading2: 'h2',
    heading3: 'h3',
    heading4: 'h4',
    heading5: 'h5',
    heading6: 'h6',
}

export function Heading(props: HeadingProps) {
    const { selectable = false, variant = "heading1", ...restProps } = props
    const as = asMapping[variant]

    return <HeadingBase ara as={as} selectable={selectable} variant={variant} {...restProps as any} />
}