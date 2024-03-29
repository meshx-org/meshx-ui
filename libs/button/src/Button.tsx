import React, { ForwardedRef } from 'react'
import { useTheme, useControlState } from '@meshx/mxui-core'
import { ControlFillX, ControlStrokeX } from '@meshx/mxui-primitives'
import { Text } from '@meshx/mxui-text'
import { useFocusable } from '@react-aria/focus'
import { useObjectRef } from '@react-aria/utils'
import { ButtonProps } from './Button.types'
import styled from 'styled-components'

const StyledButton = styled.button`
    position: relative;
    display: flex;
    align-items: center;

    border: none;
    background: transparent;

    cursor: pointer;
    width: 100%;
    height: 32px;

    &[data-state='disabled'] {
        pointer-events: none;
        cursor: not-allowed !important;
    }

    &[data-state='pressed'] .buttonContent {
        opacity: 0.5;
    }
`

const ButtonContent = styled.div`
    position: relative;
    z-index: 3;

    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0px 12px;
    column-gap: 6px;

    &[data-icon-only='true'] {
        padding: 0px !important;
        width: 32px;
    }

    *[data-theme='light'] &[data-variant='accent'],
    *[data-theme='light'] &[data-variant='danger'],
    *[data-theme='light'] &[data-variant='warning'] {
        --theme-text-primary: white !important;
    }

    span {
        display: flex;
        color: var(--theme-text-primary);
    }

    *[data-theme='dark'] &[data-variant='accent'] {
        --theme-text-primary: rgb(142, 208, 255) !important;
    }

    *[data-theme='dark'] &[data-variant='danger'] {
        --theme-text-primary: rgb(238, 159, 159) !important;
    }

    *[data-theme='dark'] &[data-variant='warning'] {
        --theme-text-primary: rgb(237, 202, 146) !important;
    }
`

function Button<C extends React.ElementType = 'button'>(props: ButtonProps<C>, ref: ForwardedRef<HTMLButtonElement>) {
    const {
        children,
        variant = 'default',
        disabled = false,
        fit = true,
        icon,
        iconRight,
        state: controlledState,
        onPress,
        as = 'button',
        ...otherProps
    } = props

    const refd = useObjectRef(ref)
    const { focusableProps } = useFocusable(props, refd)
    // const domRef = useFocusableRef(ref)

    const theme = useTheme()
    const { state, handlers } = useControlState<HTMLButtonElement>(disabled)

    const hasStroke = variant === 'accent' || variant === 'default' || variant === 'danger' || variant === 'warning'
    const hasChildren = children !== undefined

    return (
        <StyledButton
            style={{ maxWidth: fit ? 'fit-content' : undefined }}
            type="button"
            {...otherProps}
            {...handlers}
            {...focusableProps}
            data-theme={theme}
            data-state={controlledState ?? state}
            as={as}
            ref={refd}
        >
            <ButtonContent data-variant={variant} data-icon-only={!hasChildren}>
                {icon && <span>{icon}</span>}
                {children && (
                    <Text
                        as="span"
                        variant="body"
                        selectable={false}
                        color={disabled ? 'text.disabled' : 'text.primary'}
                        children={children}
                    />
                )}
                {iconRight && <span>{iconRight}</span>}
            </ButtonContent>
            {hasStroke && <ControlStrokeX borderRadius={5.5} data-state={controlledState ?? state} />}
            <ControlFillX data-state={controlledState ?? state} variant={variant} borderRadius={6} />
        </StyledButton>
    )
}

/**
 * ActionButtons allow users to perform an action.
 * They’re used for similar, task-based options within a workflow, and are ideal for interfaces where buttons aren’t meant to draw a lot of attention.
 */
const _Button = React.forwardRef(Button)
export { _Button as Button }
