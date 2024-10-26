import React, { ForwardedRef } from 'react'
import { useTheme, useControlState } from '@meshx/mxui-core'
import { ControlStrokeX, ControlSurface } from '@meshx/mxui-primitives'
import { Text } from '@meshx/mxui-text'
import { useFocusable } from '@react-aria/focus'
import { useObjectRef } from '@react-aria/utils'
import { ButtonProps } from './Button.types'
import styles from './Button.module.scss'

function Button<C extends React.ElementType = 'button'>(props: ButtonProps<C>, ref: ForwardedRef<any>) {
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

    const { state, handlers } = useControlState<HTMLButtonElement>(disabled)

    const hasChildren = children !== undefined

    return (
        <ControlSurface
            className={styles.Button}
            role="button"
            type="button"
            sx={{ maxWidth: fit ? 'fit-content' : undefined, borderRadius: 6 }}
            {...otherProps}
            {...handlers}
            {...focusableProps}
            state={controlledState ?? state}
            variant={variant}
            ref={refd}
            as={as}
        >
            <div className={styles.ButtonContent} data-variant={variant} data-icon-only={!hasChildren}>
                {icon && <span>{icon}</span>}
                {children && (
                    <Text
                        className={styles.Text}
                        as="span"
                        variant="body"
                        selectable={false}
                        color={disabled ? 'text.disabled' : 'text.primary'}
                        children={children}
                    />
                )}
                {iconRight && <span>{iconRight}</span>}
            </div>
        </ControlSurface>
    )
}

/**
 * ActionButtons allow users to perform an action.
 * They’re used for similar, task-based options within a workflow, and are ideal for interfaces where buttons aren’t meant to draw a lot of attention.
 */
const _Button = React.forwardRef(Button)
export { _Button as Button }
