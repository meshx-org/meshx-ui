import React from 'react'
import { LinkButtonProps } from './Button.types'
import { useControlState } from '@meshx-org/mxui-core'
import { Text } from '@meshx-org/mxui-text'
import { SubtleFillX } from '@meshx-org/mxui-primitives'
import styled from 'styled-components'

const StyledButton = styled.a`
    margin: 0;
    padding: 0;
    border: none;
    background: transparent;
    display: flex;
    align-items: flex-start;
    position: relative;
    cursor: pointer;

    &[data-state='disabled'] {
        cursor: not-allowed;
        pointer-events: none;
    }
`

const ButtonContent = styled.div`
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px 12px;
    font-size: 14px;
    line-height: 20px;
`

function LinkButton({ children, href, disabled = false, as, ...otherProps }: LinkButtonProps) {
    const { state, handlers } = useControlState<HTMLAnchorElement>(disabled)

    let content = null
    if (typeof children === 'string') {
        content = (
            <Text
                variant="body"
                selectable={false}
                data-t={disabled ? 'text.disabled' : 'text.primary'}
                fontWeight={600}
                color={disabled ? 'text.disabled' : 'text.primary'}
                children={children}
            />
        )
    } else {
        content = children
    }

    return (
        <StyledButton href={href} type="button" {...otherProps} data-state={state} {...handlers}>
            <SubtleFillX data-state={state} borderRadius={5} />
            <ButtonContent as={as}>{content}</ButtonContent>
        </StyledButton>
    )
}

export { LinkButton }
