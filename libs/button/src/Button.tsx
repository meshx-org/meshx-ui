import React, { ForwardedRef } from 'react'
import { useTheme, useControlState } from '@meshx/mxui-core'
import { ControlFillX, ControlStrokeX } from '@meshx/mxui-primitives'
import { Text } from '@meshx/mxui-text'
import { useFocusable } from '@react-aria/focus'
import { useObjectRef } from '@react-aria/utils'
import { ButtonProps } from './Button.types'
import styles from './Button.module.scss'

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
        <button
            className={styles.Button}
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
            <div className={styles.ButtonContent} data-variant={variant} data-icon-only={!hasChildren}>
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
            </div>
            {hasStroke && <ControlStrokeX borderRadius={5.5} data-state={controlledState ?? state} />}
            <ControlFillX data-state={controlledState ?? state} variant={variant} borderRadius={6} />
        </button>
    )
}

/**
 * ActionButtons allow users to perform an action.
 * They’re used for similar, task-based options within a workflow, and are ideal for interfaces where buttons aren’t meant to draw a lot of attention.
 */
const _Button = React.forwardRef(Button)
export { _Button as Button }
