import React from 'react'
import { LinkProps } from './Link.types'
import styled from 'styled-components'
import { TypographyProps, typography } from 'styled-system'

const LinkStyled = styled.span<TypographyProps>`
    ${typography}

    & {
        cursor: pointer;
        text-decoration: none;
    }

    &:hover {
        text-decoration: underline;
    }

    [data-theme='dark'] &[data-variant='primary'] {
        color: hsl(200, 100%, 75%);
    }

    [data-theme='light'] &[data-variant='primary'] {
        color: hsl(215, 90%, 40%);
    }
`

export function Link<C extends React.ElementType = 'a'>(props: LinkProps<C>) {
    const { children, as = 'a', variant = 'primary', onClick, ...restProps } = props

    return (
        <LinkStyled role="link" as={as} {...restProps} data-variant={variant}>
            {children}
        </LinkStyled>
    )
}

Link.displayName = 'Link'
