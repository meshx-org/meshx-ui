import React from 'react'
import { LinkProps } from './Link.types'
import styled from 'styled-components'
import { TypographyProps, typography } from 'styled-system'

const LinkStyled = styled.p<TypographyProps>`
    ${typography}

    & a {
        text-decoration: none;
    }

    & a:hover,
    & span:hover {
        text-decoration: underline;
    }

    & span {
        cursor: pointer;
    }

    [data-theme='dark'] &[data-variant='primary'] {
        color: hsl(200, 100%, 75%);
    }

    [data-theme='light'] &[data-variant='primary'] {
        color: hsl(215, 90%, 40%);
    }
`

export function Link(props: LinkProps) {
    const { children, variant = 'primary', onClick } = props

    return (
        <LinkStyled fontSize={1} onClick={onClick} data-variant={variant}>
            {typeof children == 'string' ? (
                <span tabIndex={0} role="link">
                    {children}
                </span>
            ) : (
                children
            )}
        </LinkStyled>
    )
}

Link.displayName = 'Link'
